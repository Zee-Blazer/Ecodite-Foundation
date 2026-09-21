export function showPlaceholders(): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return process.env.SHOW_PLACEHOLDERS !== 'false';
}

export function filterPlaceholders<T extends { isPlaceholder: boolean }>(items: T[]): T[] {
  if (showPlaceholders()) {
    return items;
  }
  return items.filter(item => !item.isPlaceholder);
}

export function shouldShow(item: { isPlaceholder: boolean }): boolean {
  if (showPlaceholders()) {
    return true;
  }
  return !item.isPlaceholder;
}
