import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function fixPolicies() {
  console.log('Fixing RLS policies for draft jobs...');
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      -- Drop existing policies
      DROP POLICY IF EXISTS "Allow read for all" ON jobs;
      DROP POLICY IF EXISTS "Allow insert for authenticated users" ON jobs;
      DROP POLICY IF EXISTS "Allow update for authenticated users" ON jobs;
      
      -- Create new policies that allow draft jobs
      CREATE POLICY "Allow read for all jobs" ON jobs FOR SELECT USING (true);
      CREATE POLICY "Allow insert for authenticated users" ON jobs FOR INSERT TO authenticated WITH CHECK (true);
      CREATE POLICY "Allow update for authenticated users" ON jobs FOR UPDATE TO authenticated USING (true);
    `
  });
  
  if (error) {
    console.error('Policy error:', error);
  } else {
    console.log('Policies updated successfully');
    
    // Test creating draft job again
    const { data, error: insertError } = await supabase
      .from('jobs')
      .insert({
        title: 'Test Draft Job',
        description: 'This is a test draft job',
        company_id: '550e8400-e29b-41d4-a716-446655440001',
        location: 'Jakarta',
        employment_type: 'full_time',
        status: 'draft'
      })
      .select()
      .single();
      
    if (insertError) {
      console.error('Insert error:', insertError);
    } else {
      console.log('Draft job created successfully:', data);
    }
  }
}

fixPolicies();