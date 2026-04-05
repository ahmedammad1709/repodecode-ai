# Supabase Setup Guide

## Environment Variables

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://gnkksschnshgcwnkynri.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_Ht2TQ3A9W_I5dZsuWYZ15Q_mPLxQ3bl
```

## Database Setup

### Step 1: Create Tables

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Create a new query and run the SQL from `migrations/001_init_schema.sql`

This will create the following tables:
- `users` - User accounts with GitHub OAuth data
- `repos` - GitHub repositories
- `readmes` - Generated README documents
- `templates` - README templates
- `subscriptions` - Subscription plans
- `feedback` - User feedback and ratings
- `admin_logs` - Admin action tracking
- `usage_tracking` - API usage per user per month

### Step 2: Enable Row Level Security

1. In SQL Editor, run the SQL from `migrations/002_rls_policies.sql`

This configures RLS policies to ensure:
- Users can only view their own data
- Admins can manage user data
- Global templates are accessible to everyone
- All data is properly secured

### Step 3: Configure GitHub OAuth Provider

1. Go to **Authentication > Providers**
2. Find **GitHub** and click to edit
3. Enable the provider
4. Add your GitHub OAuth app credentials:
   - Client ID
   - Client Secret

### Step 4: Set up Storage Buckets (Optional)

1. Go to **Storage**
2. Create a new bucket called `readme-assets`
3. Configure RLS policies to allow users to upload images

## Database Schema

### Users Table
```
- id: UUID (Primary Key)
- auth_id: UUID (Links to Supabase auth)
- email: String
- name: String
- avatar_url: String (GitHub avatar)
- github_username: String
- github_access_token: String (Encrypted)
- github_id: Integer
- plan: String (free, pro, team)
- subscription_status: String
- created_at: Timestamp
```

### Repos Table
```
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key)
- github_repo_id: Integer
- name: String
- description: String
- language: String
- stars: Integer
- is_private: Boolean
- topics: JSON Array
- last_synced: Timestamp
```

### READMEs Table
```
- id: UUID (Primary Key)
- repo_id: UUID (Foreign Key)
- user_id: UUID (Foreign Key)
- template_id: UUID (Foreign Key)
- content: Text (Markdown)
- health_score: Integer (0-100)
- version: Integer
- is_pushed_to_github: Boolean
- created_at: Timestamp
```

### Templates Table
```
- id: UUID (Primary Key)
- name: String
- style_type: String (minimal, detailed, startup, open_source)
- structure_json: JSON
- is_global: Boolean
- created_by: UUID (Foreign Key)
- created_at: Timestamp
```

### Subscriptions Table
```
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key)
- plan_type: String (free, pro, team)
- status: String (active, cancelled, past_due)
- stripe_subscription_id: String
- stripe_customer_id: String
- current_period_start: Timestamp
- current_period_end: Timestamp
```

## Supabase Features Used

- ✅ **PostgreSQL Database** - Reliable relational database
- ✅ **Authentication** - GitHub OAuth integration
- ✅ **Row Level Security** - Fine-grained access control
- ✅ **Real-time Subscriptions** - Live data updates (optional)
- ✅ **Storage** - File uploads (optional)

## Development Setup

### Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Create Supabase Client Instance

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## Testing Queries

Use the Supabase dashboard Query Editor to test queries:

```sql
-- Get all users
SELECT * FROM users;

-- Get user statistics
SELECT 
  COUNT(DISTINCT user_id) as total_users,
  COUNT(DISTINCT repo_id) as total_repos,
  AVG(health_score) as avg_health_score
FROM readmes;

-- Get active subscriptions
SELECT * FROM subscriptions WHERE status = 'active';
```

## Backup and Migration

The SQL files in `migrations/` directory can be:
1. Manually run in Supabase SQL Editor
2. Stored as version control for your database schema
3. Used for local development with Supabase CLI

## Troubleshooting

### RLS Policies Blocking Access

- Check Supabase Dashboard > Authentication > Users
- Verify user's auth_id is properly stored
- Test RLS by running queries with specific user context

### Connection Issues

- Verify environment variables are set correctly
- Check network connectivity
- Review Supabase logs in dashboard

### Data Not Syncing

- Check if real-time is enabled for tables
- Verify RLS policies aren't overly restrictive
- Review Supabase performance logs
