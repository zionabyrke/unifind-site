/**
 * PLACEHOLDER. Replace this entire file with the real generated types:
 *
 *   npx supabase gen types typescript --project-id <your-project-ref> \
 *     > src/types/database.types.ts
 *
 * Everything downstream (features/*\/api.ts) imports `Database` from here
 * and maps rows into domain DTOs - components never import this file
 * directly, so regenerating it never touches component code
 */
export type Database = {
  public: {
    Tables: Record<string, { Row: Record<string, unknown> }>;
    Views: Record<string, never>;
    Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>;
    Enums: Record<string, string>;
  };
};
