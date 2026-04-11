# GitHub OAuth Authentication Testing Guide

## ✅ Pre-Testing Checklist

### Required Setup
1. **Supabase Project**
   - [x] Create a Supabase project (free tier works)
   - [ ] Get VITE_SUPABASE_URL from Settings → API
   - [ ] Get VITE_SUPABASE_KEY (anon key) from Settings → API

2. **GitHub OAuth App**
   - [ ] Create an OAuth app at https://github.com/settings/developers
   - [ ] Get Client ID and Client Secret
   - [ ] Set Authorization callback URL: `http://localhost:8080/auth/callback` (or your dev URL)

3. **Supabase GitHub Provider Configuration**
   - [ ] Go to Supabase Dashboard → Authentication → Providers
   - [ ] Enable GitHub provider
   - [ ] Add Client ID and Client Secret from GitHub OAuth app
   - [ ] Update Redirect URL: `http://localhost:8080/dashboard`

4. **Database Migrations**
   - [ ] Run migration 001_init_schema.sql
   - [ ] Run migration 002_rls_policies.sql
   - [ ] Run migration 003_add_user_insert_policy.sql
   - [ ] Run migration 004_fix_recursive_admin_policies.sql

5. **Environment Variables**
   ```bash
   # .env.local or .env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
   ```

---

## 🧪 Test Scenarios

### Test 1: GitHub Sign Up (New User)

**Steps:**
1. Open http://localhost:8080 (or your dev server URL)
2. Click "Sign Up" in the header or go to `/signup`
3. Click "Continue with GitHub" button
4. Click "Authorize" on GitHub
5. Wait for redirect to dashboard

**Expected Results:**
- ✅ Redirected to `/dashboard`
- ✅ User name displayed in header (from GitHub profile)
- ✅ User email displayed in header
- ✅ Overview tab shows "Welcome, [Name]!"
- ✅ Can see all dashboard tabs (Repos, Editor, Health, etc.)

**Database Verification:**
```sql
-- Check users table
SELECT * FROM public.users WHERE email = 'your-github-email@example.com';

-- Should show:
-- auth_id: [UUID from auth]
-- email: [GitHub email]
-- name: [GitHub name]
-- avatar_url: [GitHub avatar]
-- github_username: [GitHub username]
-- github_id: [GitHub numeric ID]
-- plan: 'free'
-- subscription_status: 'active'
```

---

### Test 2: GitHub Sign In (Existing User)

**Prerequisite:** Completed Test 1

**Steps:**
1. Sign out from dashboard (click profile menu → Sign out)
2. Go to `/login`
3. Click "Continue with GitHub"
4. Authorize on GitHub
5. Wait for redirect

**Expected Results:**
- ✅ Redirected to `/dashboard`
- ✅ Same user name and email shown
- ✅ All previous data preserved

---

### Test 3: Email/Password Sign Up

**Steps:**
1. Go to http://localhost:8080/signup
2. Fill form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "SecurePass123"
   - Confirm: "SecurePass123"
   - Check Terms checkbox
3. Click Sign Up
4. Check email for OTP (check spam folder)
5. Enter 8-digit OTP on page
6. Wait for redirect

**Expected Results:**
- ✅ OTP sent to email
- ✅ OTP input field appears
- ✅ After OTP verification, redirected to dashboard
- ✅ User name and email shown in header

**Database Verification:**
```sql
-- Check users table
SELECT * FROM public.users WHERE email = 'test@example.com';

-- Should show:
-- github_username: null
-- github_id: null (or 0)
```

---

### Test 4: Email/Password Sign In

**Prerequisite:** Completed Test 3

**Steps:**
1. Sign out from dashboard
2. Go to `/login`
3. Enter email: "test@example.com"
4. Enter password: "SecurePass123"
5. Click "Sign In"

**Expected Results:**
- ✅ Success message appears
- ✅ Redirected to dashboard
- ✅ User info displayed

---

### Test 5: Dashboard Protection (Redirect to Login)

**Steps:**
1. Open new incognito/private window
2. Go to http://localhost:8080/dashboard

**Expected Results:**
- ✅ Immediately redirected to `/login`
- ✅ Cannot access dashboard without authentication

---

### Test 6: Sign Out and Re-authenticate

**Steps:**
1. From dashboard, click profile menu → "Sign out"
2. Confirm sign out

**Expected Results:**
- ✅ Redirected to login page
- ✅ All sensitive data cleared

---

## 🐛 Troubleshooting

### Issue: GitHub login redirects back to login page
**Cause:** Supabase GitHub provider not configured
**Fix:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable GitHub provider
3. Add credentials and callback URL

### Issue: "Missing Supabase environment variables" error
**Cause:** Environment variables not set
**Fix:**
1. Create `.env.local` in project root
2. Add VITE_SUPABASE_URL and VITE_SUPABASE_KEY
3. Restart dev server

### Issue: User profile not created after GitHub signup
**Cause:** RLS policies or permissions issue
**Fix:**
1. Check that migration 003_add_user_insert_policy.sql is applied
2. Verify RLS policies in Supabase dashboard
3. Check browser console for error messages
4. Check Supabase logs for database errors

### Issue: OTP not received in email
**Cause:** Email not configured in Supabase
**Fix:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Email" provider
3. Configure email settings (there's a test email provider for development)
4. For production, configure your own SMTP or email service

### Issue: User redirects to login after dashboard loads
**Cause:** Session expired or auth not properly initialized
**Fix:**
1. Check browser console for errors
2. Verify VITE_SUPABASE_KEY is an anon key (not service role)
3. Check that Supabase URL is correct

---

## 🔍 Browser Developer Tools Checks

**Console Checks:**
```javascript
// In browser console, check:
// 1. Auth session
supabase.auth.getSession()

// 2. Current user
supabase.auth.getUser()

// 3. User profile
supabase.from('users').select('*').eq('auth_id', userId).single()
```

**Network Tab Checks:**
- [ ] OAuth redirect to GitHub succeeds
- [ ] Redirect back from GitHub has `code` parameter
- [ ] `getUser()` request returns user data
- [ ] `users` table query returns profile

---

## ✨ Success Indicators

All tests pass when:
- ✅ GitHub signup creates user and profile
- ✅ GitHub signin retrieves existing profile
- ✅ Email/password signup works with OTP
- ✅ Email/password signin works
- ✅ Dashboard shows correct user info
- ✅ Sign out clears session
- ✅ Unauthenticated access redirects to login
- ✅ All dashboard tabs accessible

