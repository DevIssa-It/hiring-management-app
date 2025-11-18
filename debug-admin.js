// Debug script to check admin user in database
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function checkAdminUser() {
  try {
    console.log('Checking admin user in database...')
    
    // Check if admin@talenthunt exists in users table
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@talenthunt')
    
    if (error) {
      console.error('Error querying users:', error)
      return
    }
    
    console.log('Users found:', users)
    
    if (!users || users.length === 0) {
      console.log('Admin user not found in users table. Creating...')
      
      // Create admin user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email: 'admin@talenthunt',
          role: 'admin',
          full_name: 'Admin User'
        })
        .select()
        .single()
      
      if (createError) {
        console.error('Error creating admin user:', createError)
      } else {
        console.log('Admin user created:', newUser)
      }
    } else {
      console.log('Admin user exists with role:', users[0].role)
      
      // Update role to make sure it's 'admin'
      if (users[0].role !== 'admin') {
        console.log('Updating role to admin...')
        
        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({ role: 'admin' })
          .eq('email', 'admin@talenthunt')
          .select()
          .single()
        
        if (updateError) {
          console.error('Error updating role:', updateError)
        } else {
          console.log('Role updated:', updatedUser)
        }
      }
    }
    
  } catch (error) {
    console.error('Script error:', error)
  }
}

checkAdminUser()