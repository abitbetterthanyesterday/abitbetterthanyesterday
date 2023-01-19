export const titleToSlug = (title: string) =>
  title.split(/\s/).join("-").toLowerCase();
