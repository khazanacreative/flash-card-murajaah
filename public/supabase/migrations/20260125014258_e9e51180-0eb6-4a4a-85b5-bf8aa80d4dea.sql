-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can create sessions" ON public.sessions;
DROP POLICY IF EXISTS "Creators can update their sessions" ON public.sessions;
DROP POLICY IF EXISTS "Creators can delete their sessions" ON public.sessions;
DROP POLICY IF EXISTS "Anyone can read active sessions" ON public.sessions;
DROP POLICY IF EXISTS "Anyone can read results of active sessions" ON public.session_results;

-- Create new permissive policies for sessions
CREATE POLICY "Anyone can create sessions" 
ON public.sessions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read sessions" 
ON public.sessions 
FOR SELECT 
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can update active sessions" 
ON public.sessions 
FOR UPDATE 
TO anon, authenticated
USING (is_active = true)
WITH CHECK (is_active = true);

-- Create policies for session_results
CREATE POLICY "Anyone can read session results" 
ON public.session_results 
FOR SELECT 
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can insert session results" 
ON public.session_results 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can update session results" 
ON public.session_results 
FOR UPDATE 
TO anon, authenticated
USING (true)
WITH CHECK (true);