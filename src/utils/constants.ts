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
export const UPDATE_DATA = "UPDATE_DATA";

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

//Header de pages
export type SubTitle = {
  title: string;
  href: string;
};

export type HeaderSubTitle = {
  title: string;
  previousPages?: SubTitle[];
};

export const HEADER_ACCUEIL: HeaderSubTitle = {
  title: 'Accueil',
};
export const HEADER_CONTACT: HeaderSubTitle = {
  title: 'Contact',
  previousPages: [
    {
      title: 'Accueil',
      href: ROUTE_ACCUEIL,
    },
  ],
};
export const HEADER_RESERVATION: HeaderSubTitle = {
  title: 'Reservation',
  previousPages: [
    {
      title: 'Accueil',
      href: ROUTE_ACCUEIL,
    },
  ],
};
export const HEADER_RESERVATION_DETAILS: HeaderSubTitle = {
  title: '',
  previousPages: [
    {
      title: 'Accueil',
      href: ROUTE_ACCUEIL,
    },
    {
      title: 'Reservation',
      href: ROUTE_RESERVATION,
    },
  ],
};
export const HEADER_NOUS_CONNAITRE: HeaderSubTitle = {
  title: 'Nous Connaîtres',
  previousPages: [
    {
      title: 'Accueil',
      href: ROUTE_ACCUEIL,
    },
  ],
};
export const HEADER_VOTRE_GITE: HeaderSubTitle = {
  title: 'Votre gite',
  previousPages: [
    {
      title: 'Accueil',
      href: ROUTE_ACCUEIL,
    },
  ],
};
export const HEADER_VOTRE_GITE_DETAILS: HeaderSubTitle = {
  title: '',
  previousPages: [
    {
      title: 'Accueil',
      href: ROUTE_ACCUEIL,
    },
    {
      title: 'Votre gite',
      href: ROUTE_VOTRE_GITE,
    },
  ],
};

//Payment method
export const PAYMENT_METHOD = {
  online: {
    label: 'Payer en ligne',
    value: 'BUY_ONLINE',
  },
  presential: {
    label: 'Payer une fois au gite',
    value: 'BUY_ON_GITE',
  },
};

//Gite 
export type GitePreview = {
  notReserved?: boolean;
  className?: string;
  pictureURL: string;
  name: string;
  rate: number;
  address: string;
  pricePerNight: number;
  status: 'available' | 'unavailable';
  shouldBePaidInAdvance: boolean;
}