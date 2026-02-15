-- Drop the restrictive UPDATE policy
DROP POLICY IF EXISTS "Anyone can update active sessions" ON public.sessions;

-- Create a more permissive UPDATE policy
CREATE POLICY "Anyone can update sessions"
ON public.sessions
FOR UPDATE
USING (true)
WITH CHECK (true);