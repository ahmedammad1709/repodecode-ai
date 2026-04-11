# GitHub Webhook Setup Guide

## 🔐 Getting Your Webhook Secret

When you add the webhook URL in GitHub OAuth App settings, GitHub will ask you to create a secret. Follow these steps:

### Step 1: Generate Webhook Secret
In your GitHub OAuth App settings:
1. Go to **Webhooks** section (if available)
2. Click **Add webhook**
3. Paste your webhook URL: `https://repodecode-ai.vercel.app/api/webhooks/github`
4. Under **Secret**, GitHub will generate a random secret
5. Copy this secret value

### Step 2: Add to Environment Variables

#### For Local Development:
1. Open `.env.local` in your project root
2. Find this line:
   ```
   GITHUB_WEBHOOK_SECRET=your-webhook-secret-here
   ```
3. Replace `your-webhook-secret-here` with the secret from GitHub
4. Save the file

#### For Production (Vercel):
1. Go to your **Vercel Dashboard**
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add new variable:
   - **Name**: `GITHUB_WEBHOOK_SECRET`
   - **Value**: (paste the GitHub secret)
   - **Environments**: Select "Production"
5. Click "Add"

## 🔑 Getting Supabase Service Role Key

The webhook handler needs a service role key to update the database. Here's how to get it:

### Step 1: Get Service Role Key
1. Go to your **Supabase Dashboard**
2. Navigate to **Settings → API**
3. Find **Service Role Key** (starts with `eyJ...`)
4. Click to reveal and copy it

### Step 2: Add to Environment Variables

#### For Local Development:
1. Open `.env.local`
2. Find:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
3. Paste your service role key
4. Save

#### For Production (Vercel):
1. Go to **Vercel Dashboard → Settings → Environment Variables**
2. Add new variable:
   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: (paste the service role key)
   - **Environments**: Select "Production"
3. Click "Add"

## ⚠️ Security Notes

1. **Never commit secrets to Git!**
   - `.env.local` is in `.gitignore` ✅
   - Keep it safe locally

2. **Service Role Key is powerful!**
   - It can read/write all data
   - Only use in secure backend/serverless functions
   - Never expose to frontend

3. **Webhook Secret verification**
   - The handler verifies GitHub's signature
   - Prevents unauthorized webhook calls

## 🧪 Testing Your Webhook

### Manual Test (Local):
1. Skip signature verification in development (already done in code)
2. Send a POST request to `http://localhost:8080/api/webhooks/github`
3. You should see logged output

### Automatic Test (Production):
1. Push code to any of your connected GitHub repos
2. GitHub will automatically send a webhook
3. Check your Vercel logs to verify it was processed

## 📊 What the Webhook Does

### Push Event
- ✅ Syncs repository metadata (name, stars, language)
- ✅ Keeps repo list up-to-date
- ✅ Records last sync time

### Repository Event
- ✅ **Created**: Adds new repos to your database
- ✅ **Updated**: Syncs repo changes
- ✅ **Deleted**: Removes repo from database

### Ping Event
- ✅ Tests webhook connectivity
- ✅ GitHub sends this when you create the webhook

## 🔍 Verifying in Vercel Logs

After deploying, you can see webhook logs:
1. Go to **Vercel Dashboard**
2. Select your project
3. Go to **Deployments → Functions**
4. Find `api/webhooks/github`
5. View logs in real-time

## 📝 Environment Variables Checklist

- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- ✅ `GITHUB_WEBHOOK_SECRET` (get from GitHub)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (get from Supabase)

## ❌ Troubleshooting

### Webhook Not Triggering?
- Check webhook is enabled in GitHub OAuth App settings
- Verify webhook URL is correct: `https://repodecode-ai.vercel.app/api/webhooks/github`
- Check Vercel logs for errors

### "Unauthorized" Error?
- Webhook signature verification failed
- Make sure `GITHUB_WEBHOOK_SECRET` matches GitHub setting
- In development, signature check is skipped for easier testing

### Repos Not Updating?
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct
- Verify GitHub username matches database records
- Check Vercel logs for specific error messages

## 📚 Resources

- [GitHub Webhooks Documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [GitHub API Events](https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase API Keys](https://supabase.com/docs/guides/api#api-keys)
