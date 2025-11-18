import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xhiqdalqtrlxmhqbldak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoaXFkYWxxdHJseG1ocWJsZGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDI0MjIsImV4cCI6MjA3ODk3ODQyMn0.bF6cAbb-ilGe8IVgFv63CpGMyGAKF_Uzp5fNxiG7iGo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  console.log('🧪 Testing Supabase connection and operations...\n');

  try {
    // Test 1: Read companies
    console.log('📖 Test 1: Reading companies...');
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .limit(3);
    
    if (companiesError) {
      console.error('❌ Companies error:', companiesError);
    } else {
      console.log('✅ Companies found:', companies?.length || 0);
      companies?.forEach(company => console.log(`   - ${company.name}`));
    }

    // Test 2: Read jobs
    console.log('\n📖 Test 2: Reading jobs...');
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select(`
        *,
        companies (
          name,
          logo_url
        )
      `)
      .limit(3);
    
    if (jobsError) {
      console.error('❌ Jobs error:', jobsError);
    } else {
      console.log('✅ Jobs found:', jobs?.length || 0);
      jobs?.forEach(job => console.log(`   - ${job.title} at ${job.companies?.name}`));
    }

    // Test 3: Read users
    console.log('\n📖 Test 3: Reading users...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, role, full_name')
      .limit(3);
    
    if (usersError) {
      console.error('❌ Users error:', usersError);
    } else {
      console.log('✅ Users found:', users?.length || 0);
      users?.forEach(user => console.log(`   - ${user.email} (${user.role})`));
    }

    // Test 4: Test insert (applications)
    console.log('\n📝 Test 4: Testing insert operation...');
    const testApplication = {
      job_id: jobs?.[0]?.id,
      user_id: users?.[0]?.id,
      full_name: 'Test User',
      email: 'test@example.com',
      phone: '+6281234567890'
    };

    if (testApplication.job_id && testApplication.user_id) {
      const { data: newApp, error: insertError } = await supabase
        .from('applications')
        .insert(testApplication)
        .select()
        .single();

      if (insertError) {
        console.error('❌ Insert error:', insertError);
      } else {
        console.log('✅ Insert successful:', newApp?.id);
        
        // Clean up test data
        await supabase.from('applications').delete().eq('id', newApp.id);
        console.log('🧹 Test data cleaned up');
      }
    } else {
      console.log('⚠️  Skipping insert test - missing job or user data');
    }

    console.log('\n🎉 All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSupabase();