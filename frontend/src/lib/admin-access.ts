export const ADMIN_EMAILS = [
  "gokulvishnu350@gmail.com",
  "mayilengineering4204@gmail.com",
] as const;

export function isAdminEmail(email: string | null | undefined) {
  return Boolean(email && ADMIN_EMAILS.includes(email.trim().toLowerCase() as (typeof ADMIN_EMAILS)[number]));
}