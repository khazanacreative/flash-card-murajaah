/**
 * Generate a random 5-character session code
 * Uses uppercase letters and numbers (excluding confusing chars like 0, O, I, L, 1)
 */
export function generateSessionCode(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Validate session code format
 */
export function isValidSessionCode(code: string): boolean {
  return /^[A-Z0-9]{5}$/i.test(code);
}
