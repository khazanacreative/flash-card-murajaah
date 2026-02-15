import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Deactivate sessions that haven't been updated in the last 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('sessions')
      .update({ is_active: false })
      .eq('is_active', true)
      .lt('updated_at', thirtyMinutesAgo)
      .select('id, code')

    if (error) {
      console.error('Error cleaning up sessions:', error)
      throw error
    }

    const cleanedCount = data?.length || 0
    console.log(`Cleaned up ${cleanedCount} inactive sessions`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        cleaned: cleanedCount,
        sessions: data 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Cleanup error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
