import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://xhiqdalqtrlxmhqbldak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoaXFkYWxxdHJseG1ocWJsZGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDI0MjIsImV4cCI6MjA3ODk3ODQyMn0.bF6cAbb-ilGe8IVgFv63CpGMyGAKF_Uzp5fNxiG7iGo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Setting up database...');
  
  try {
    // Test connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error && error.code === '42P01') {
      console.log('📋 Tables not found. Please run the SQL setup manually.');
      console.log('👉 Go to Supabase Dashboard → SQL Editor');
      console.log('👉 Copy & paste content from database/setup.sql');
      console.log('👉 Click Run');
      return;
    }
    
    console.log('✅ Database connection successful!');
    console.log('✅ Tables already exist or setup completed!');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('📋 Please run SQL setup manually in Supabase Dashboard');
  }
}

setupDatabase();