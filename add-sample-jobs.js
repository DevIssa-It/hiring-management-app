// Script to add sample jobs to database
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleJobs = [
  {
    title: 'Frontend Developer',
    description: 'We are looking for a skilled Frontend Developer to join our team.',
    location: 'Jakarta',
    employment_type: 'full_time',
    salary_min: 8000000,
    salary_max: 12000000,
    status: 'active',
    company_id: 'YOUR_COMPANY_ID' // You need to get this from companies table
  },
  {
    title: 'Backend Developer',
    description: 'Experienced Backend Developer needed for our growing team.',
    location: 'Bandung',
    employment_type: 'full_time',
    salary_min: 9000000,
    salary_max: 15000000,
    status: 'active',
    company_id: 'YOUR_COMPANY_ID'
  },
  {
    title: 'UI/UX Designer',
    description: 'Creative UI/UX Designer to design amazing user experiences.',
    location: 'Jakarta',
    employment_type: 'contract',
    salary_min: 6000000,
    salary_max: 10000000,
    status: 'draft',
    company_id: 'YOUR_COMPANY_ID'
  }
]

async function addSampleJobs() {
  try {
    console.log('Adding sample jobs...')
    
    const { data, error } = await supabase
      .from('jobs')
      .insert(sampleJobs)
      .select()
    
    if (error) {
      console.error('Error adding jobs:', error)
    } else {
      console.log('Sample jobs added successfully:', data)
    }
  } catch (error) {
    console.error('Script error:', error)
  }
}

// Uncomment to run
// addSampleJobs()