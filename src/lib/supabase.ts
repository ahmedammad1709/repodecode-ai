import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions
export type User = {
  id: string
  auth_id: string
  email: string
  name: string
  avatar_url: string
  github_username: string
  github_id: number
  plan: 'free' | 'pro' | 'team'
  subscription_status: 'active' | 'cancelled' | 'pending'
  created_at: string
  updated_at: string
  last_login: string
}

export type Repository = {
  id: string
  user_id: string
  github_repo_id: number
  name: string
  description: string
  url: string
  language: string
  stars: number
  is_private: boolean
  topics: string[]
  last_synced: string
  created_at: string
  updated_at: string
}

export type README = {
  id: string
  repo_id: string
  user_id: string
  template_id: string
  content: string
  health_score: number
  version: number
  is_pushed_to_github: boolean
  github_pushed_at: string
  created_at: string
  updated_at: string
}

export type Template = {
  id: string
  name: string
  description: string
  style_type: 'minimal' | 'detailed' | 'startup' | 'open_source'
  structure_json: Record<string, unknown>
  preview_content: string
  is_global: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export type Subscription = {
  id: string
  user_id: string
  plan_type: 'free' | 'pro' | 'team'
  status: 'active' | 'cancelled' | 'past_due' | 'paused'
  stripe_subscription_id: string
  stripe_customer_id: string
  current_period_start: string
  current_period_end: string
  canceled_at: string
  created_at: string
  updated_at: string
}

// Auth functions
export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  })
  return { data, error }
}

export async function requestSignupOtp(email: string) {
  // Sends OTP email. Requires SMTP + email OTP enabled in Supabase Auth.
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  })

  return { data, error }
}

export async function verifySignupOtpAndCreateProfile(
  email: string,
  token: string,
  password: string,
  name: string,
) {
  const { data: otpData, error: otpError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })

  if (otpError) {
    return { error: otpError }
  }

  const user = otpData.user
  if (!user) {
    return { error: new Error('OTP verified but user session is missing') }
  }

  const { error: updateUserError } = await supabase.auth.updateUser({
    password,
    data: {
      display_name: name,
    },
  })

  if (updateUserError) {
    return { error: updateUserError }
  }

  const { error: profileError } = await supabase
    .from('users')
    .upsert(
      {
        auth_id: user.id,
        email,
        name,
        avatar_url: user.user_metadata?.avatar_url || null,
        github_username: null,
        github_id: null,
        plan: 'free',
        subscription_status: 'active',
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'auth_id' },
    )

  if (profileError) {
    return { error: profileError }
  }

  return { data: { user: otpData.user, session: otpData.session } }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function createGitHubUserProfile(user: any) {
  // Extract GitHub user data from auth user metadata
  const githubUsername = user.user_metadata?.user_name || user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]
  const githubId = user.user_metadata?.provider_id || 0
  const avatarUrl = user.user_metadata?.avatar_url || ''
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || githubUsername || 'GitHub User'

  // Create or update user profile
  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        auth_id: user.id,
        email: user.email,
        name: fullName,
        avatar_url: avatarUrl,
        github_username: githubUsername,
        github_id: githubId,
        plan: 'free',
        subscription_status: 'active',
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'auth_id' },
    )
    .select()
    .single()

  if (error) {
    return { error }
  }

  return { data }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', userId)
    .single()
  return { data, error }
}

// Repository functions
export async function getUserRepositories(userId: string) {
  const { data, error } = await supabase
    .from('repos')
    .select('*')
    .eq('user_id', userId)
    .order('stars', { ascending: false })
  return { data, error }
}

export async function getReadmesForRepo(repoId: string) {
  const { data, error } = await supabase
    .from('readmes')
    .select('*')
    .eq('repo_id', repoId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// README functions
export async function createReadme(readmeData: Partial<README>) {
  const { data, error } = await supabase
    .from('readmes')
    .insert([readmeData])
    .select()
    .single()
  return { data, error }
}

export async function updateReadme(readmeId: string, updates: Partial<README>) {
  const { data, error } = await supabase
    .from('readmes')
    .update(updates)
    .eq('id', readmeId)
    .select()
    .single()
  return { data, error }
}

// Statistics functions
export async function getUserStats(userId: string) {
  const { data: repos, error: reposError } = await supabase
    .from('repos')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)

  const { data: readmes, error: readmesError } = await supabase
    .from('readmes')
    .select('health_score', { count: 'exact' })
    .eq('user_id', userId)

  if (reposError || readmesError) {
    return { error: reposError || readmesError }
  }

  const avgHealthScore = readmes && readmes.length > 0
    ? Math.round(readmes.reduce((acc, r) => acc + (r.health_score || 0), 0) / readmes.length)
    : 0

  return {
    data: {
      totalRepos: repos?.length || 0,
      totalReadmes: readmes?.length || 0,
      avgHealthScore,
    },
  }
}

// Admin functions
export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getSubscriptionStats() {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('status', 'active')

  if (error) return { error }

  const stats = {
    activeSubscriptions: data?.length || 0,
    mrr: data?.filter(s => s.plan_type !== 'free').length ? (data.filter(s => s.plan_type === 'pro').length * 9 + data.filter(s => s.plan_type === 'team').length * 29) : 0,
    arr: 0,
  }

  stats.arr = stats.mrr * 12

  return { data: stats }
}

export async function getAdminLogs() {
  const { data, error } = await supabase
    .from('admin_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  return { data, error }
}
