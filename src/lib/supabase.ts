import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Treat placeholders or empty strings as missing
const isPlaceholder = (v?: string) => !v || v.startsWith('${') || v.trim() === '';
const supabaseUrl = isPlaceholder(rawUrl) ? undefined : rawUrl;
const supabaseAnonKey = isPlaceholder(rawKey) ? undefined : rawKey;
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Validate URL format with more specific error handling (warn only)
if (supabaseUrl) {
  try {
    const url = new URL(supabaseUrl);
    if (!url.hostname.includes('supabase')) {
      console.warn('URL does not appear to be a Supabase URL:', supabaseUrl);
    }
  } catch (error) {
    console.error('Invalid VITE_SUPABASE_URL format:', supabaseUrl);
  }
} else {
  console.warn('VITE_SUPABASE_URL is missing. Running in offline analytics mode.');
}

if (!supabaseAnonKey) {
  console.warn('VITE_SUPABASE_ANON_KEY is missing. Running in offline analytics mode.');
}


// Create a minimal offline stub client to avoid crashes when env isn't configured
const createOfflineClient = () => {
  const offlineResponse = { data: null, error: { message: 'Supabase not configured (offline mode)' } };
  const tableApi = () => ({
    select: () => offlineResponse,
    insert: () => offlineResponse,
    update: () => offlineResponse,
    delete: () => offlineResponse,
    order: () => offlineResponse,
    limit: () => offlineResponse,
    single: () => offlineResponse,
    eq: () => offlineResponse,
  });
  return {
    from: (_table: string) => tableApi(),
    rpc: (_fn: string, _args?: any) => ({ data: [], error: { message: 'Supabase not configured (offline mode)' } }),
  } as any;
};

// Create Supabase client with enhanced error handling (or offline stub)
export const supabase: any = isConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          'Content-Type': 'application/json',
        },
        fetch: (url, options = {}) => {
          
          // Create AbortController for timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased to 30 seconds
          
          return fetch(url, {
            ...options,
            signal: controller.signal,
          }).then(response => {
            clearTimeout(timeoutId);
            return response;
          }).catch(error => {
            clearTimeout(timeoutId);
            console.error('Supabase fetch error:', {
              name: error.name,
              message: error.message,
              url: url,
              stack: error.stack
            });
            
            // Provide more specific error messages
            if (error.name === 'AbortError') {
              throw new Error('Request timeout - Supabase server is not responding. Please check your internet connection and Supabase project status.');
            } else if (error.message.includes('Failed to fetch')) {
              throw new Error('Network error - Unable to reach Supabase server. Please check: 1) Internet connection, 2) Supabase project is active, 3) Environment variables are correct, 4) No firewall/VPN blocking the connection.');
            } else if (error.message.includes('NetworkError')) {
              throw new Error('Network connection failed. This could be due to: 1) No internet connection, 2) Firewall blocking the request, 3) VPN interference, 4) Supabase service outage.');
            }
            
            throw error;
          });
        },
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : createOfflineClient();

// Enhanced connection test with better error reporting and retry logic
export const testSupabaseConnection = async (retries = 2) => {
  if (!isConfigured) {
    console.warn('Supabase not configured. Skipping connection test (offline mode).');
    return false;
  }
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      
      // First, test basic connectivity with a simple query
      const { data, error } = await supabase
        .from('quiz_sessions')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error(`Supabase connection test failed on attempt ${attempt} with database error:`, {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // Provide specific guidance based on error type
        if (error.message.includes('relation "quiz_sessions" does not exist')) {
          throw new Error('Database table "quiz_sessions" not found. Please run the database migrations.');
        } else if (error.message.includes('Invalid API key') || error.code === 'PGRST301') {
          throw new Error('Invalid Supabase API key. Please check your VITE_SUPABASE_ANON_KEY in the .env file.');
        } else if (error.message.includes('Project not found') || error.code === 'PGRST000') {
          throw new Error('Supabase project not found. Please check your VITE_SUPABASE_URL in the .env file.');
        } else if (error.message.includes('JWT expired') || error.code === 'PGRST301') {
          throw new Error('Supabase API key has expired. Please generate a new API key from your Supabase dashboard.');
        }
        
        throw new Error(`Database connection failed: ${error.message}`);
      }
      
      return true;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.error(`Supabase connection test error on attempt ${attempt}:`, lastError);
      
      // Don't retry for certain types of errors
      if (lastError.message.includes('Database table') || 
          lastError.message.includes('Invalid API key') || 
          lastError.message.includes('Project not found') ||
          lastError.message.includes('expired')) {
        break;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt <= retries) {
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s...
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // Handle final error
  if (lastError) {
    // Re-throw with original message if it's already a custom error
    if (lastError.message.includes('Database') || 
        lastError.message.includes('Invalid') || 
        lastError.message.includes('Project not found')) {
      throw lastError;
    }
    
    // Handle network-level errors
    if (lastError.message.includes('Failed to fetch') || 
        lastError.message.includes('Network error') ||
        lastError.message.includes('NetworkError')) {
      throw new Error(`Unable to connect to Supabase after ${retries + 1} attempts. Please check: 1) Your internet connection, 2) Supabase project is active at ${supabaseUrl}, 3) Environment variables are correct, 4) No firewall/VPN blocking the connection.`);
    }
    
    throw new Error(`Connection test failed after ${retries + 1} attempts: ${lastError.message}`);
  }
  
  return false;
};

// Helper function to check if we're in development mode
export const isDevelopment = () => {
  return import.meta.env.DEV;
};

// Helper function to validate environment setup
export const validateEnvironment = () => {
  const issues: string[] = [];
  
  if (!supabaseUrl) {
    issues.push('VITE_SUPABASE_URL is missing');
  } else if (!supabaseUrl.startsWith('https://')) {
    issues.push('VITE_SUPABASE_URL should start with https://');
  }
  
  if (!supabaseAnonKey) {
    issues.push('VITE_SUPABASE_ANON_KEY is missing');
  } else if (supabaseAnonKey.length < 100) {
    issues.push('VITE_SUPABASE_ANON_KEY appears to be too short');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};