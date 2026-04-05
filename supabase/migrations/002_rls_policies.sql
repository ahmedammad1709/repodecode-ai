-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE repos ENABLE ROW LEVEL SECURITY;
ALTER TABLE readmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = auth_id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.auth_id = auth.uid() 
      AND admin_user.id IN (
        SELECT DISTINCT admin_id FROM admin_logs
      )
    )
  );

-- Repos table policies
CREATE POLICY "Users can view their own repos" ON repos
  FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can create repos" ON repos
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can update their own repos" ON repos
  FOR UPDATE USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- READMEs table policies
CREATE POLICY "Users can view their own readmes" ON readmes
  FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can create readmes" ON readmes
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can update their own readmes" ON readmes
  FOR UPDATE USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can delete their own readmes" ON readmes
  FOR DELETE USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Templates table policies
CREATE POLICY "Everyone can view global templates" ON templates
  FOR SELECT USING (is_global = TRUE);

CREATE POLICY "Users can view own custom templates" ON templates
  FOR SELECT USING (
    is_global = TRUE OR 
    created_by = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY "Users can create templates" ON templates
  FOR INSERT WITH CHECK (created_by = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can update own templates" ON templates
  FOR UPDATE USING (created_by = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Subscriptions table policies
CREATE POLICY "Users can view their subscription" ON subscriptions
  FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can update their subscription" ON subscriptions
  FOR UPDATE USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Feedback table policies
CREATE POLICY "Users can view their feedback" ON feedback
  FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can create feedback" ON feedback
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Admin logs policies
CREATE POLICY "Admins can view admin logs" ON admin_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.auth_id = auth.uid() 
      AND (admin_user.id IN (SELECT DISTINCT admin_id FROM admin_logs)
      OR admin_user.plan = 'team')
    )
  );

-- Usage tracking policies
CREATE POLICY "Users can view own usage" ON usage_tracking
  FOR SELECT USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));
