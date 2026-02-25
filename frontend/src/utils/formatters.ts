/**
 * Common formatting utility functions
 */

/**
 * Formats a date as relative time (e.g., "2 hours ago")
 * @param timestamp - Unix timestamp in nanoseconds (BigInt)
 * @returns Formatted relative time string
 */
export function formatRelativeTime(timestamp: bigint): string {
  const now = Date.now();
  const date = new Date(Number(timestamp / 1000000n)); // Convert nanoseconds to milliseconds
  const diffMs = now - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 30) {
    return formatFullDate(timestamp);
  } else if (diffDay > 0) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else if (diffHour > 0) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

/**
 * Formats a date as full date string
 * @param timestamp - Unix timestamp in nanoseconds (BigInt)
 * @returns Formatted date string (e.g., "Jan 15, 2026")
 */
export function formatFullDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp / 1000000n));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Formats a date as short date string
 * @param timestamp - Unix timestamp in nanoseconds (BigInt)
 * @returns Formatted date string (e.g., "01/15/26")
 */
export function formatShortDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp / 1000000n));
  return date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
}

/**
 * Formats a large number with commas
 * @param num - Number to format
 * @returns Formatted number string (e.g., "1,234,567")
 */
export function formatNumber(num: number | bigint): string {
  return num.toLocaleString('en-US');
}

/**
 * Truncates text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Formats currency value
 * @param amount - Amount to format
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Formats file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Calculates reading time for text
 * @param text - Text content
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
