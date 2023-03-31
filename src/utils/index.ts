export * from './constants';
export * from './items-params';

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(/[é,è,ê]/g, 'e')
    .replaceAll('à', 'a')
    .replace('î', 'i')
    .split(' ')
    .join('-');
};

export const toTitle = (text: string): string => {
  if (!text) return text;
  if (text.length === 1) return text.toUpperCase();
  return text.charAt(0).toUpperCase() + text.slice(1, text.length);
};
