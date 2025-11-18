import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testDraftJob() {
  console.log('Testing draft job creation...');
  
  // First, update the constraint
  const { error: constraintError } = await supabase.rpc('exec_sql', {
    sql: `ALTER TABLE jobs DROP CONSTRAINT IF EXISTS jobs_status_check;
          ALTER TABLE jobs ADD CONSTRAINT jobs_status_check CHECK (status IN ('active', 'inactive', 'closed', 'draft'));`
  });
  
  if (constraintError) {
    console.error('Constraint error:', constraintError);
    return;
  }
  
  console.log('Constraint updated successfully');
  
  // Test creating a draft job
  const { data, error } = await supabase
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
    
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Draft job created successfully:', data);
  }
}

testDraftJob();