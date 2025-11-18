// Debug utility untuk troubleshooting masalah autentikasi
export const debugAuth = {
  logUserState: (context: string, user: any, isAuthenticated: boolean, isLoading: boolean) => {
    console.group(`🔍 Auth Debug - ${context}`);
    console.log('User:', user);
    console.log('Is Authenticated:', isAuthenticated);
    console.log('Is Loading:', isLoading);
    console.log('User Role:', user?.role);
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();
  },

  logNavigation: (from: string, to: string, reason: string) => {
    console.log(`🚀 Navigation: ${from} → ${to} (${reason})`);
  },

  logError: (context: string, error: any) => {
    console.group(`❌ Error - ${context}`);
    console.error('Error:', error);
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();
  }
};