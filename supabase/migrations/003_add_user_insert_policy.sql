-- Fix: Add strict INSERT policy for users table
-- OTP verification creates an authenticated session first, then profile insert is allowed.

DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile during auth" ON users;

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT
  WITH CHECK (auth.uid() = auth_id);
