import React, { useEffect, useState } from 'react';
import Layout from '@/containers/Layout';
import { APP_NAME, PARTIAL_SPACES, parseDateString, todayDate } from '@/utils';
import Head from 'next/head';
import { useMutation, useQuery } from 'react-query';
import { fetchData } from '@/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { date, object, array, string } from 'yup';
import ImageDisplay from '@/components/image-display';
import classNames from 'classnames';
import { sendData } from '@/services';
import { useRouter } from 'next/router';
import Message from '@/components/Message';
import SelectPersonne from '@/components/forms/inputs/SelectPersonne';
import moment from 'moment';

moment.locale('fr', {
  months:
    'Janvier_F&eacute;vrier_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_D&eacute;cembre'.split(
      '_'
    ),
  monthsShort:
    'Janv._F&eacute;vr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._D&eacute;c.'.split('_'),
  monthsParseExact: true,
  weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
  weekdaysShort: 'Dim._Lun._Mar._Mer._Jeu._Ven._Sam.'.split('_'),
  weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
});

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
//@ts-ignore
import { DateRangePicker } from 'react-dates';

type FormData = {
  reservation: {
    debut?: Date;
    fin?: Date;

    personnes: [
      {
        type: 'ADULTE' | 'ENFANT';
        age?: string;
      }
    ];

    types: any[];
    message?: string;
    client: {
      nom?: string;
      prenom?: string;
      email?: string;
      telephone?: string;
    };
  };
};

const schema = object({
  reservation: object({
    debut: date()
      .typeError('Quand arrivez vous ?')
      .required('S&eacute;lectionner une date de d&eacute;but')
      .transform(parseDateString)
      .min(todayDate(), "Votre date doit être à partir d'aujourd'hui"),

    fin: date()
      .when(
        'debut',
        (debut, yup) =>
          debut &&
          yup.min(
            debut,
            "La date de d&eacute;part ne peut pas être avant celle d'arriv&eacute;e."
          )
      )
      .typeError('Quand nous quitterez vous ?')
      .required('S&eacute;lectionner une date de fin')
      .transform(parseDateString),

    personnes: array()
      .of(
        object().shape({
          type: string().oneOf(['ADULTE', 'ENFANT']).required(),
          age: string().optional(),
        })
      )
      .typeError('Combien serez vous ?')
      .required('Combien serez vous ?'),

    message: string(),
    types: array()
      .of(
        object().shape({
          libelle: string().required('libelle invalide'),
          description: string(),
          id: string()
            .typeError('Identifiant invalide')
            .matches(/^[0-9]+$/, 'Identifiant invalide')
            .required('Identifiant invalide')
            .min(1, 'Identifiant invalide'),
        })
      )
      .test({
        message: 'Quel type de logement pourrait vous convenir ?',
        test: (arr) => (arr ? arr.length > 0 : false),
      }),

    client: object({
      prenom: string().typeError('Votre pr&eacute;nom').required('Votre pr&eacute;nom '),
      nom: string().typeError('Votre nom').required('Votre nom'),
      email: string().required('Ce champ est requis').email('Email invalide'),
      telephone: string()
        .required('Le t&eacute;l&eacute;phone est requis')
        .matches(
          /^[0-9]+$/,
          'Le t&eacute;l&eacute;phone invalide il ne doit comporter que des chiffres'
        )
        .min(9, 'Le t&eacute;l&eacute;phone invalide il ne doit comporter que des chiffres')
        .max(15, 'Le t&eacute;l&eacute;phone invalide il ne doit comporter que des chiffres'),
    }).required(),
  }).required(),
}).required();

function Reservation() {
  const router = useRouter();
  const [spaces, setSpaces] = useState([]);
  const [_startDate, setStartDate] = useState<any>(null);
  const [_endDate, setEndDate] = useState<any>(null);
  const [focusedInput, setFocusedInput] = useState(null);

  useQuery<any>({
    queryKey: ['nos_types'],
    onSuccess: (data) => {
      setSpaces(data.data.data);
    },
    queryFn: () =>
      fetchData({
        path: 'espace',
        fields: PARTIAL_SPACES,
        limit: 10,
      }),
  });

  const { control, register, handleSubmit, formState, setValue, watch } =
    useForm<FormData>({
      mode: 'onChange',
      resolver: yupResolver(schema),
    });

  const mutation = useMutation({
    mutationFn: (message: any) => sendData('/reservations', message),
  });

  const { errors } = formState;

  const onSubmit = (data: any) => {
    let { message, personnes, debut, fin, client, types } = data['reservation'];

    types = types
      ?.filter(
        (value: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t.id === value.id)
      )
      ?.map((type: any) => ({
        // reservation_id: '+',
        type_id: { id: Number(type.id) },
      }));

    debut = debut.toISOString().split('T')[0];
    fin = fin.toISOString().split('T')[0];

    mutation.mutate({
      debut,
      fin,
      message,
      client,
      voyageurs: personnes,
      types_espaces: types,
    });
  };

  const handleError = (error: any) => {
    error.preventDefault();
    router.push('/');
  };

  useEffect(() => {
    const reservation = sessionStorage.getItem('RESERVATION');
    if (reservation) {
      const reservationObject = JSON.parse(reservation);

      if (reservationObject['debut']) {
        setValue(
          'reservation.debut',
          moment(reservationObject['debut']?.split('T')[0]).toDate()
        );
        setStartDate(moment(reservationObject['debut']?.split('T')[0]));
      }

      if (reservationObject['fin']) {
        setValue(
          'reservation.fin',
          moment(reservationObject['fin']?.split('T')[0]).toDate()
        );
        setEndDate(moment(reservationObject['fin']?.split('T')[0]));
      }

      setValue('reservation.personnes', reservationObject['personnes']);
    }
  }, [setValue]);

  const [selectedSpaces, setSelectedSpaces] = useState<any>([]);
  const toggleType = (action: string, space: any) => {
    if (action === 'ADD') {
      setSelectedSpaces((prev: any[]) => {
        const data = [...prev, space];
        setValue(
          'reservation.types',
          data.map((entry: any) => entry.types[0].type_id)
        );
        return data;
      });
    }
    if (action === 'REMOVE') {
      setSelectedSpaces((prev: any[]) => {
        const data = prev.filter((item) => item.id !== space.id);
        setValue(
          'reservation.types',
          data.map((entry: any) => entry.types[0].type_id)
        );
        return data;
      });
    }
  };

  return (
    <Layout containerClasses="py-10">
      <Head>
        <title>{`${APP_NAME} | r&eacute;servation`}</title>
      </Head>
      <div className="container py-5 md:px-20">
        <h1 className="w-full text-2xl md:text-4xl pb-0 mb-4">
          Votre r&eacute;servation
        </h1>
        {mutation.isError ? (
          <Message
            type="error"
            firstMessage="Une erreur est survenue, nous allons la r&eacute;soudre sous peu"
            secondMessage="N'h&eacute;sitez pas à nous passer un coup de fil"
            action={handleError}
            actionLabel="Retourner à l'accueil"
          />
        ) : null}
        {mutation.isSuccess ? (
          <Message
            type="success"
            firstMessage="Nous avons reçu votre message."
            secondMessage="Une r&eacute;ponse personnalis&eacute;e vous sera apport&eacute;e dans les meilleurs d&eacute;lais."
            action={handleError}
            actionLabel="Retourner à l'accueil"
          />
        ) : null}
        {mutation.isIdle ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 mt-2 gap-2 w-full">
              <div className="grid grid-cols-1 md:grid-cols-6 md:col-span-3 gap-4 md:gap-2">
                <div className="flex flex-col md:col-span-2 pr-2">
                  <label className={`text-xl mb-2 font-semibold`}>
                    Date d&apos;arriv&eacute;e et de d&eacute;part &;
                  </label>
                  <DateRangePicker
                    showDefaultInputIcon={true}
                    block={true}
                    numberOfMonths={1}
                    hideKeyboardShortcutsPanel={true}
                    keepOpenOnDateSelect={true}
                    renderCalendarInfo={() => <span className="text-md font-semibold inline-block m-6">Here we should write the price ?</span>}
                    minDate={moment()}
                    displayFormat="D/M/Y"
                    startDate={_startDate}
                    startDatePlaceholderText="Arriv&eacute;e"
                    startDateId="reservation.debut"
                    endDate={_endDate}
                    endDatePlaceholderText="D&eacute;part"
                    endDateId="reservation.fin"
                    onDatesChange={({ startDate, endDate }: any) => {
                      setValue('reservation.debut', startDate?.toDate());
                      setStartDate(startDate);

                      setValue('reservation.fin', endDate?.toDate());
                      setEndDate(endDate);

                      console.log(`Starting date ${_startDate}`);
                      console.log(`Ending date ${_endDate}`);
                    }}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput: any) => {
                      console.log(`Focused input : ${focusedInput}`);
                      setFocusedInput(focusedInput);
                    }}
                  />
                </div>
                <SelectPersonne
                  errorMessage={errors?.reservation?.personnes?.message}
                  control={control}
                  formKey={'reservation.personnes'}
                  id="personnes"
                  setValue={setValue}
                />
              </div>
            </div>
            <h2 className="w-full text-2xl md:text-4xl pb-2 mt-6 mb-4">
              Votre logement
            </h2>
            <div className="grid md:grid-cols-2 gap-4 overflow-hidden">
              {spaces
                .filter((item: any) => item.types && item.types.length)
                .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
                .map((space: any, index: number) => {
                  return (
                    <article
                      key={`${space.id}-${index}`}
                      className={classNames(
                        'text-app-black flex flex-col md:flex-row border shadow-lg rounded-lg relative md:w-auto'
                      )}>
                      {space?.images?.length ? (
                        <ImageDisplay
                          image={space.images[0].directus_files_id}
                          imageClasses="object-cover"
                          wrapperClasses="md:rounded-r-none rounded-r-lg rounded-l-lg overflow-hidden h-52 w-full md:w-96 md:h-64 relative"
                        />
                      ) : null}
                      <div className="flex flex-col justify-between p-4 rounded-lg w-full">
                        <div className="flex flex-col justify-between">
                          <h3 className="text-xl font-semibold">
                            {space?.libelle}
                          </h3>
                          <h4 className="font-extrabold text-2xl my-1 text-app-brown">
                            {space?.types[0].type_id?.prix[0]?.item?.valeur}{' '}
                            &euro;/nuit
                          </h4>
                        </div>
                        <div className="flex items-center justify-end">
                          {selectedSpaces.find(
                            (item: any) => item.id === space.id
                          ) == null ? (
                            <button
                              type="button"
                              className="bg-app-yellow text-app-brown py-2 px-6 rounded-md text-xl"
                              onClick={() => toggleType('ADD', space)}>
                              R&eacute;server
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="bg-app-xs-black text-app-black py-2 px-6 rounded-md text-xl"
                              onClick={() => toggleType('REMOVE', space)}>
                              Annuler
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
            <p className="text-red-700 text-center mt-4">
              {errors?.reservation?.types?.message}
            </p>
            <h2 className="w-full text-2xl md:text-4xl pb-2 mt-6 mb-4">
              Vos informations
            </h2>
            <div className="p-4 bg-app-beige">
              <div className="grid md:grid-cols-2 md:gap-4">
                <div className="w-full relative mb-4">
                  <label className="text-app-black text-xs" htmlFor="prenom">
                    Votre pr&eacute;nom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    placeholder="Votre prenom"
                    className={classNames(
                      'w-full text-left px-0 py-2 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-app-yellow'
                    )}
                    {...register('reservation.client.prenom')}
                  />
                  <p className="text-red-700 text-center">
                    {errors?.reservation?.client?.prenom?.message}
                  </p>
                </div>
                <div className="w-full relative mb-4">
                  <label className="text-app-black text-xs" htmlFor="nom">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    placeholder="Votre nom"
                    className={classNames(
                      'w-full text-left px-0 py-2 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-app-yellow'
                    )}
                    {...register('reservation.client.nom')}
                  />
                  <p className="text-red-700 text-center">
                    {errors?.reservation?.client?.nom?.message}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-4">
                <div className="w-full relative mb-4">
                  <label className="text-app-black text-xs" htmlFor="telephone">
                    Votre t&eacute;l&eacute;phone
                  </label>
                  <input
                    type="text"
                    id="telephone"
                    placeholder="Votre t&eacute;l&eacute;phone"
                    className={classNames(
                      'w-full text-left px-0 py-2 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-app-yellow'
                    )}
                    {...register('reservation.client.telephone')}
                  />
                  <p className="text-red-700 text-center">
                    {errors?.reservation?.client?.telephone?.message}
                  </p>
                </div>
                <div className="w-full relative mb-4">
                  <label className="text-app-black text-xs" htmlFor="email">
                    Votre email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Votre email"
                    className={classNames(
                      'w-full text-left px-0 py-2 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-app-yellow'
                    )}
                    {...register('reservation.client.email')}
                  />
                  <p className="text-red-700 text-center">
                    {errors?.reservation?.client?.email?.message}
                  </p>
                </div>
              </div>
              <div className="grid">
                <div className="w-full relative mb-4">
                  <label className="text-app-black text-xs" htmlFor="message">
                    Si vous avez des pr&eacute;cisions, transmettez les nous
                  </label>
                  <textarea
                    rows={5}
                    id="message"
                    placeholder="Votre message"
                    className={classNames(
                      'w-full text-left px-0 py-2 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-app-yellow'
                    )}
                    {...register('reservation.message')}></textarea>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-app-yellow text-app-brown py-3 px-12 rounded-md text-xl">
                  Transmettre
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </Layout>
  );
}

export default Reservation;
