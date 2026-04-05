-- Create users table with GitHub integration
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  avatar_url TEXT,
  github_username VARCHAR(255) UNIQUE,
  github_access_token TEXT,
  github_id INTEGER UNIQUE,
  plan VARCHAR(50) DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'team')),
  subscription_status VARCHAR(50) DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create repositories table
CREATE TABLE IF NOT EXISTS repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  github_repo_id INTEGER UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  url TEXT,
  language VARCHAR(100),
  stars INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT FALSE,
  topics JSONB DEFAULT '[]'::jsonb,
  last_synced TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_repo UNIQUE (user_id, github_repo_id)
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  style_type VARCHAR(100) CHECK (style_type IN ('minimal', 'detailed', 'startup', 'open_source')),
  structure_json JSONB NOT NULL,
  preview_content TEXT,
  is_global BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create readmes table
CREATE TABLE IF NOT EXISTS readmes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id UUID NOT NULL REFERENCES repos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  health_score INTEGER DEFAULT 0 CHECK (health_score >= 0 AND health_score <= 100),
  version INTEGER DEFAULT 1,
  is_pushed_to_github BOOLEAN DEFAULT FALSE,
  github_pushed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('free', 'pro', 'team')),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'paused')),
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  readme_id UUID REFERENCES readmes(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  type VARCHAR(50) CHECK (type IN ('rating', 'bug_report', 'feature_request')),
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'acknowledged', 'resolved', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin logs table
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(255) NOT NULL,
  target_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage tracking table
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  readme_count INTEGER DEFAULT 0,
  api_calls INTEGER DEFAULT 0,
  month INTEGER,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_month UNIQUE (user_id, month, year)
);

-- Create indexes for better query performance
CREATE INDEX idx_users_github_username ON users(github_username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_repos_user_id ON repos(user_id);
CREATE INDEX idx_repos_github_repo_id ON repos(github_repo_id);
CREATE INDEX idx_readmes_user_id ON readmes(user_id);
CREATE INDEX idx_readmes_repo_id ON readmes(repo_id);
CREATE INDEX idx_readmes_created_at ON readmes(created_at);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_usage_tracking_user_id ON usage_tracking(user_id);
