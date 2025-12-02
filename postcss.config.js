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
    
    // CSS Nano - minifies CSS in production (only if NODE_ENV is production)
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true, // Remove all comments
          },
          normalizeWhitespace: true, // Normalize whitespace
          colormin: true, // Minify colors
          minifyFontValues: true, // Minify font declarations
          minifySelectors: true, // Minify selectors
          reduceIdents: false, // Don't reduce @keyframes names (can break animations)
          zindex: false, // Don't reorganize z-index (can break stacking contexts)
        }],
      },
    }),
  },
}

