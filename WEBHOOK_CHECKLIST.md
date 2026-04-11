# GitHub Webhook Integration Checklist

Complete this checklist to finish GitHub OAuth webhook setup.

## Phase 1: Local Configuration

- [ ] **Get Webhook Secret from GitHub**
  - Go to GitHub OAuth App settings → Webhooks section
  - If webhook exists, view details and copy the secret
  - If no webhook yet, click "Add webhook" and GitHub will generate a secret
  - Secret format: random alphanumeric string

- [ ] **Get Service Role Key from Supabase**
  - Go to [Supabase Dashboard](https://app.supabase.com)
  - Select your project
  - Settings → API → "Service Role Key"
  - Copy the entire key (starts with `eyJ...`)

- [ ] **Update Local Environment File**
  - Open `.env.local`
  - Replace `GITHUB_WEBHOOK_SECRET=your-webhook-secret-here` with actual secret
  - Replace `SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here` with actual key
  - Save file

- [ ] **Verify Environment Variables**
  ```bash
  bun run verify:env
  # or
  npm run verify:env
  ```
  - Should see ✅ for all required variables
  - Masked values are shown for security

## Phase 2: Vercel Production Deployment

- [ ] **Add Environment Variables to Vercel**
  - Go to [Vercel Dashboard](https://vercel.com)
  - Select your project: `repodecode-ai`
  - Settings → Environment Variables
  - Add `GITHUB_WEBHOOK_SECRET`:
    - Name: `GITHUB_WEBHOOK_SECRET`
    - Value: (paste from GitHub)
    - Environments: Production + Preview
    - Click "Add"
  - Add `SUPABASE_SERVICE_ROLE_KEY`:
    - Name: `SUPABASE_SERVICE_ROLE_KEY`
    - Value: (paste from Supabase)
    - Environments: Production + Preview
    - Click "Add"

- [ ] **Verify Variables Added**
  - Should see both in the environment variables list
  - Values are masked in UI (✓ for security)

- [ ] **Trigger New Deployment**
  - Go to Deployments tab
  - Click "Redeploy" on the latest deployment
  - OR push a new commit to main branch
  - Wait for deployment to complete

- [ ] **Check Deployment Status**
  - Should show "READY" with a checkmark
  - Logs should show no errors

## Phase 3: Webhook Configuration

- [ ] **Verify Webhook URL in GitHub**
  - Go to GitHub OAuth App settings
  - Webhooks section
  - Verify webhook URL is: `https://repodecode-ai.vercel.app/api/webhooks/github`
  - Status should show "✓" (active)

- [ ] **Enable Webhook Events**
  - Check the following events are selected:
    - ✓ Repository events (for repo creation/deletion)
    - ✓ Push events (for code updates)
  - Note: Ping events are always enabled for testing

## Phase 4: Testing

### Test 1: Check Vercel Function
- [ ] Visit: `https://repodecode-ai.vercel.app/api/webhooks/github`
  - Should return JSON error (expected - POST required)
  - Confirms function is deployed

### Test 2: Manual Webhook Test (via GitHub)
- [ ] Go to GitHub OAuth App → Webhooks
- [ ] Click on your webhook
- [ ] Scroll to "Recent Deliveries"
- [ ] Click "Redeliver" on a past delivery
  - Watch Vercel logs in real-time
  - Should see processing and success response

### Test 3: Live Webhook Test (via Code Push)
- [ ] Push a commit to one of your connected GitHub repos
  ```bash
  git add .
  git commit -m "Test webhook trigger"
  git push
  ```
- [ ] GitHub automatically sends webhook to Vercel
- [ ] Check Vercel logs:
  - Go to Vercel Dashboard → Deployments → Functions
  - Select `api/webhooks/github`
  - View logs should show:
    - ✅ "Webhook received"
    - ✅ "Processing push event"
    - ✅ "Successfully updated repository"

### Test 4: Verify Data in Supabase
- [ ] Go to Supabase Dashboard
- [ ] In SQL Editor, run:
  ```sql
  SELECT name, last_synced_at FROM repositories 
  ORDER BY last_synced_at DESC LIMIT 5;
  ```
- [ ] Should see your repo with recent timestamp
- [ ] Confirms webhook successfully updated database

## Phase 5: Integration Verification

- [ ] **Check Dashboard Component Integration**
  - Open ReposTab component
  - Verify it queries repositories from Supabase
  - Should display synced repos with correct metadata

- [ ] **Monitor First Week**
  - Every push to connected repos should trigger webhook
  - Check Vercel logs periodically
  - Monitor Supabase usage in Settings

## Success Indicators ✅

You'll know everything is working when:

1. **Local Development**
   - ✅ `npm run verify:env` shows all variables set
   - ✅ No warnings about missing secrets

2. **Vercel Deployment**
   - ✅ Both environment variables appear in dashboard
   - ✅ Deployment completes successfully
   - ✅ No build errors in logs

3. **GitHub Integration**
   - ✅ Webhook shows "✓" status in GitHub
   - ✅ Recent deliveries show green checkmarks
   - ✅ Response includes "success": true

4. **Supabase Database**
   - ✅ Repositories table has recent entries
   - ✅ `last_synced_at` column updates on pushes
   - ✅ New repos appear after webhook triggers

5. **Application**
   - ✅ ReposTab displays repos from webhooks
   - ✅ No errors in browser console
   - ✅ No 403/401 errors in Vercel logs

## Troubleshooting

### Problem: Webhook shows failed status in GitHub
**Solution:**
1. Check Vercel logs for error message
2. Verify `GITHUB_WEBHOOK_SECRET` matches GitHub setting
3. Check webhook URL is exactly: `https://repodecode-ai.vercel.app/api/webhooks/github`

### Problem: Environment variables not found in Vercel logs
**Solution:**
1. Redeploy after adding variables (not immediate)
2. Wait 2-3 minutes for variables to propagate
3. Navigate to Deployments → Functions to see fresh deployment

### Problem: Signature verification error in logs
**Solution:**
1. Go to GitHub OAuth App → Webhooks → Your webhook
2. Copy the "Secret" value exactly
3. Update Vercel environment variable `GITHUB_WEBHOOK_SECRET`
4. Trigger a new deployment

### Problem: Database not updating despite successful webhook
**Solution:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
2. Check database RLS policies aren't blocking updates
3. Ensure webhook payload includes required fields
4. Check Supabase logs for database connection errors

## Next Steps After Webhook Works ✨

Once webhook is verified working:

1. **Claude AI Integration**
   - Setup OpenAI API connection
   - Create README generation logic
   - Stream responses to frontend

2. **Real Dashboard Data**
   - Connect Overview stats to database queries
   - Display user's synced repositories
   - Show generation history

3. **Payment Processing**
   - Setup Stripe integration
   - Configure subscription plans
   - Implement billing dashboard

4. **Email Notifications**
   - Send README generation alerts
   - Subscription confirmation emails
   - Usage limit warnings

## Quick Reference

| Component | Status | Last Check |
|-----------|--------|------------|
| GitHub OAuth | ✅ Configured | User completed |
| Webhook Handler | ✅ Deployed | `/api/webhooks/github` live |
| Environment Variables | ⏳ Pending | Need GITHUB_WEBHOOK_SECRET + SUPABASE_SERVICE_ROLE_KEY |
| Vercel Deployment | ⏳ Pending | Redeploy after env vars added |
| Webhook Registration | ⏳ Pending | Verify in GitHub after deployment |
| Database Sync | ⏳ Testing | After webhook fires |

## Time Estimate

- Local configuration: **5 minutes**
- Vercel setup: **5 minutes**
- Testing: **10 minutes**
- **Total: ~20 minutes** to fully operational webhook

## Support Files

- 📖 [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) - Detailed setup instructions
- ✅ [verify-env.ts](./verify-env.ts) - Environment variable checker
- 🔌 [api/webhooks/github.ts](./api/webhooks/github.ts) - Webhook handler code
- 📚 [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Overall project setup
