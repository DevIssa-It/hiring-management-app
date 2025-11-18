import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function disableRLS() {
  console.log('Disabling RLS for jobs table...');
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;`
  });
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('RLS disabled for jobs table');
    
    // Test creating draft job
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

disableRLS();