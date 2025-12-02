/**
 * PostCSS Configuration
 * Processes CSS with plugins for optimization and compatibility
 */
export default {
  plugins: {
    // Tailwind CSS - utility-first CSS framework
    tailwindcss: {},
    
    // Autoprefixer - adds vendor prefixes for browser compatibility
    autoprefixer: {
      // Target browsers based on browserslist in package.json or defaults
      // Supports last 2 versions of major browsers
      flexbox: 'no-2009', // Only use final flexbox spec
      grid: 'autoplace', // Enable CSS Grid autoprefixing
    },
  },
}

