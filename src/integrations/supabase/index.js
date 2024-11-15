// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import {
  useAccessLogs,
  useAccessLog,
  useAddAccessLog,
  useUpdateAccessLog,
  useDeleteAccessLog
} from './hooks/accessLog.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useAccessLogs,
  useAccessLog,
  useAddAccessLog,
  useUpdateAccessLog,
  useDeleteAccessLog
};