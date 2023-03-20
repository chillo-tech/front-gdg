export const APP_NAME = 'LE GITE DE LA GARE';
export const APP_DESCRIPTION = 'Front GDG - Project';

//ROUTES NAMES
/**
 * Routes mames for the application
 */

export const ROUTE_ACCUEIL = '/';
export const ROUTE_VOTRE_GITE = '/votre-gite';
export const ROUTE_RESERVATION = '/reservation';
export const ROUTE_NOUS_CONNAITRE = '/nous-connaitre';
export const ROUTE_CONTACT = '/contactez-nous';

export const ROUTE_LOGIN = '/login';
export const ROUTE_REGISTER = '/register';
export const ROUTE_RESET_PASSWORD = '/reset-password';

//Initial State
export const INITIAL_STATE = {};

//Forms datas
export const CIVILITIES: any[] = [
  {
    value: 'monsieur',
    label: 'M.',
  },
  {
    value: 'madame',
    label: 'Mme',
  },
  {
    value: 'mademoiselle',
    label: 'Mlle',
  },
];

export const TERMES_PROPOSITIONS: any[] = [
  {
    value: true,
    label: 'Oui',
  },
  {
    value: false,
    label: 'Non',
  },
];

export const CONTACT_PHONE_NUMBER = {
    url: 'tel:009 4563 423',
    label: '009 4563 423',
};
