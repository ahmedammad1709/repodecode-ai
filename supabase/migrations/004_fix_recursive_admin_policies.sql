-- Fix infinite recursion between users/admin_logs policies.
-- Previous policies referenced users <-> admin_logs inside each other.

-- Drop recursive policies if they exist.
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can view admin logs" ON admin_logs;

-- Safe replacement: service role can read all users/admin logs.
-- (Client-side users still use "Users can view their own profile").
CREATE POLICY "Service role can view all users" ON users
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can view admin logs" ON admin_logs
  FOR SELECT
  USING (auth.role() = 'service_role');