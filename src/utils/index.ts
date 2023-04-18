import { isDate, parse } from 'date-fns';
import { ROUTE_404, ROUTE_ACCUEIL, ROUTE_CONTACT, ROUTE_NOUS_CONNAITRE, ROUTE_RESERVATION, ROUTE_VOTRE_GITE } from './constants';

export * from './constants';
export * from './items-params';
export const capitalize = (data: string): string => {
  return (data && data.length) ? `${data[0].toUpperCase()}${data.slice(1).toLocaleLowerCase()}` : '';

}

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

export type URL_DATA = {
  route: string;
  label: string;
  index: number;
};

export const parseURL = (url: string): URL_DATA => {
  const urlParams = url.toLocaleLowerCase().split('-');

  //Prepare URL parameters
  const urlData: URL_DATA = {
    route: '',
    label: '',
    index: 0,
  };

  //Verify is the last parameter is a number
  if (+urlParams[urlParams.length - 1])
    urlData.index = +urlParams[urlParams.length - 1];

  //Find out which route corresponds
  switch(urlParams[0]) {
    case 'accueil':
      urlData.route = ROUTE_ACCUEIL;
      break;
    case 'espaces':
    case 'nos':
      urlData.route = ROUTE_VOTRE_GITE;
      break;
    case 'reservation':
      urlData.route = ROUTE_RESERVATION;
      break;
    case 'nous':
      urlData.route = ROUTE_NOUS_CONNAITRE;
      break;
    case 'contact':
      urlData.route = ROUTE_CONTACT;
      break;
    default:
      urlData.route = ROUTE_404;
  }

  // Create label
  let label: string = '';
  for (let index = 0; index < urlParams.length - 1; index++) {
    label += toTitle(urlParams[index]) + ' ';
  }

  urlData.label = label;

  return urlData;
};

export const parseDateString = (value: any, originalValue: any) => {
  const parsedDate = isDate(value) ? value : parse(value, "yyyy-MM-dd", new Date());
  return parsedDate;
}

export const todayDate = () => {
  const nowAsString = new Date().toISOString().slice(0, 10);
  const date = new Date(nowAsString);
  date.setDate(date.getDate()-1);
  return date;
}