import { createHmac } from 'crypto'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase configuration')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Verify GitHub webhook signature
function verifySignature(request: VercelRequest): boolean {
  const signature = request.headers['x-hub-signature-256'] as string
  const body = JSON.stringify(request.body)
  const secret = process.env.GITHUB_WEBHOOK_SECRET || 'dev-secret'

  const hash = createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  const expectedSignature = `sha256=${hash}`

  return signature === expectedSignature
}

// Handle push events (repo updates)
async function handlePush(payload: any) {
  const { repository, pusher } = payload
  
  try {
    // Find the user by GitHub username
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('github_username', pusher.name)
      .single()

    if (!user) {
      console.log(`User ${pusher.name} not found`)
      return { status: 'user_not_found' }
    }

    // Update or insert repository
    const { error: repoError } = await supabase
      .from('repos')
      .upsert({
        user_id: user.id,
        github_repo_id: repository.id,
        name: repository.name,
        description: repository.description,
        url: repository.html_url,
        language: repository.language,
        stars: repository.stargazers_count,
        is_private: repository.private,
        topics: repository.topics || [],
        last_synced: new Date().toISOString(),
      }, {
        onConflict: 'github_repo_id'
      })

    if (repoError) {
      console.error('Error updating repo:', repoError)
      return { status: 'error', error: repoError.message }
    }

    console.log(`✅ Updated repo: ${repository.name}`)
    return { status: 'success', action: 'push_processed' }
  } catch (error) {
    console.error('Error in handlePush:', error)
    return { status: 'error', error: String(error) }
  }
}

// Handle repository events (created, deleted, etc.)
async function handleRepository(payload: any) {
  const { action, repository, sender } = payload

  try {
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('github_username', sender.login)
      .single()

    if (!user) {
      console.log(`User ${sender.login} not found`)
      return { status: 'user_not_found' }
    }

    if (action === 'created' || action === 'edited') {
      // Insert or update repository
      const { error } = await supabase
        .from('repos')
        .upsert({
          user_id: user.id,
          github_repo_id: repository.id,
          name: repository.name,
          description: repository.description,
          url: repository.html_url,
          language: repository.language,
          stars: repository.stargazers_count,
          is_private: repository.private,
          topics: repository.topics || [],
          last_synced: new Date().toISOString(),
        }, {
          onConflict: 'github_repo_id'
        })

      if (error) {
        return { status: 'error', error: error.message }
      }

      console.log(`✅ Repository ${action}: ${repository.name}`)
      return { status: 'success', action: `repository_${action}` }
    }

    if (action === 'deleted') {
      // Delete repository
      const { error } = await supabase
        .from('repos')
        .delete()
        .eq('github_repo_id', repository.id)

      if (error) {
        return { status: 'error', error: error.message }
      }

      console.log(`✅ Repository deleted: ${repository.name}`)
      return { status: 'success', action: 'repository_deleted' }
    }

    return { status: 'skipped', action }
  } catch (error) {
    console.error('Error in handleRepository:', error)
    return { status: 'error', error: String(error) }
  }
}

// Main webhook handler
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Only accept POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  // Verify signature (skip in development)
  if (process.env.NODE_ENV === 'production') {
    if (!verifySignature(request)) {
      console.warn('❌ Invalid webhook signature')
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }

  const event = request.headers['x-github-event'] as string
  const payload = request.body

  console.log(`📨 GitHub Event: ${event}`)

  let result: any

  try {
    switch (event) {
      case 'push':
        result = await handlePush(payload)
        break

      case 'repository':
        result = await handleRepository(payload)
        break

      case 'ping':
        console.log('✅ Webhook ping received')
        result = { status: 'pong' }
        break

      default:
        console.log(`⏭️ Skipping event: ${event}`)
        result = { status: 'skipped', event }
    }

    return response.status(200).json(result)
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return response.status(500).json({ 
      error: 'Webhook processing failed',
      details: String(error) 
    })
  }
}
