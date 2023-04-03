export * from './constants';
export * from './items-params';

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[é,è,ê]/g, 'e')
    .replace(/[à]/g, 'a')
    .replace(/[î]/g, 'i')
    .split(' ')
    .join('-');
};

export const toTitle = (text: string): string => {
  if (!text) return text;
  if (text.length === 1) return text.toUpperCase();
  return text.charAt(0).toUpperCase() + text.slice(1, text.length);
};
