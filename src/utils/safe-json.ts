/**
 * Safe JSON parsing utility.
 * Prevents a single corrupted DB row or malformed config file
 * from crashing the entire worker process.
 */

import { logger } from './logger.js';

/**
 * Safely parse a JSON string, returning a fallback value on failure.
 * Logs the error with context for debugging.
 *
 * @param json - The JSON string to parse
 * @param fallback - Value to return if parsing fails
 * @param context - Description of where this parse is happening (for logging)
 * @returns The parsed value or the fallback
 */
export function safeJsonParse<T>(json: string, fallback: T, context?: string): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const preview = json?.substring(0, 100) ?? '(null/undefined)';
    logger.warn('JSON', `Parse failed${context ? ` in ${context}` : ''}: ${msg} | input preview: ${preview}`);
    return fallback;
  }
}
