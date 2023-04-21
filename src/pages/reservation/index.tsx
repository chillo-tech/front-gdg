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

type FormData = {
  reservation: {
    debut?: Date;
    jours?: string;
    personnes?: string;
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
      .required('Sélectionner une date de début')
      .transform(parseDateString)
      .min(todayDate(), "Votre date doit être à partir d'aujourd'hui"),
    jours: string()
      .typeError('Combien de jours serez vous des nôtres ?')
      .required('Combien de jours serez vous des nôtres ? '),
    personnes: string().typeError('Combien serez vous ?').required('Combien serez vous ?'),
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
      prenom: string().typeError('Votre prénom').required('Votre prénom '),
      nom: string().typeError('Votre nom').required('Votre nom'),
      email: string().required('Ce champ est requis').email('Email invalide'),
      telephone: string()
        .required('Le téléphone est requis')
        .matches(/^[0-9]+$/, 'Le téléphone invalide il ne doit comporter que des chiffres')
        .min(9, 'Le téléphone invalide il ne doit comporter que des chiffres')
        .max(15, 'Le téléphone invalide il ne doit comporter que des chiffres'),
    }).required(),
  }).required(),
}).required();

function Reservation() {
  const router = useRouter();
  const [spaces, setSpaces] = useState([]);
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

  const { register, handleSubmit, formState, setValue } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const onSubmit = (data: any) => {
    let { message, jours, personnes, debut, client, types } = data['reservation'];
    types = types
    .filter((value: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t.id === value.id)
    ).map((type: any) => ({reservation_id: "+", type_id: {id: Number(type.id)}}));
    mutation.mutate({
      message,
      jours,
      personnes,
      debut,
      client,
      types: {create: types}
    });
  };

{create: [{reservation_id: "+", type_id: {id: 1}}]}
{create: [{reservation_id: "+", type_id: {id: 1}}]}
  
  const onError = (errors: any, e: any) => null;

  const handleError = (error: any) => {
    error.preventDefault();
    router.push('/');
  };

  const mutation = useMutation({
    mutationFn: (message: any) => sendData('/reservation', message),
  });

  useEffect(() => {
    const reservation = sessionStorage.getItem('RESERVATION');
    if (reservation) {
      const reservationObject = JSON.parse(reservation);
      setValue('reservation.debut', reservationObject['debut'].split('T')[0]);
      setValue('reservation.jours', reservationObject['jours']);
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
        <title>{`${APP_NAME} | réservation`}</title>
      </Head>
      <div className="container py-5 md:px-20">
        <h1 className="w-full text-2xl md:text-4xl pb-0">Votre réservation</h1>
        {mutation.isError ? (
          <Message
            type="error"
            firstMessage="Une erreur est survenue, nous allons la résoudre sous peu"
            secondMessage="N'hésitez pas à nous passer un coup de fil"
            action={handleError}
            actionLabel="Retourner à l'accueil"
          />
        ) : null}
        {mutation.isSuccess ? (
          <Message
            type="success"
            firstMessage="Nous avons reçu votre message."
            secondMessage="Une réponse personnalisée vous sera apportée dans les meilleurs délais."
            action={handleError}
            actionLabel="Retourner à l'accueil"
          />
        ) : null}
        {mutation.isIdle ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 mt-2 gap-2 w-full">
              <div className="grid grid-cols-1 md:grid-cols-6 md:col-span-3 gap-4 md:gap-2">
                <div className="flex flex-col md:col-span-2">
                  <label className="text-xl mb-2 font-semibold" htmlFor="debut">
                    Date d&lsquo;arrivée
                  </label>
                  <input
                    {...register('reservation.debut')}
                    min={todayDate().toISOString().split('T')[0]}
                    type="date"
                    id="date"
                    className="w-full border border-gray-300 rounded-lg text-xl"
                  />
                  <p className="text-red-700 text-center">{errors?.reservation?.debut?.message}</p>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-xl mb-2 font-semibold" htmlFor="jours">
                    Nuits
                  </label>
                  <select
                    {...register('reservation.jours')}
                    id="jours"
                    className="border border-gray-300 rounded-lg text-xl"
                  >
                    <option value="">Sélectionner le nombre de jours</option>
                    {Array.from(Array(15).keys())
                      .filter((key) => key !== 0)
                      .map((option) => (
                        <option value={option} key={`option-${option}`}>{`${option} ${
                          option === 1 ? 'nuit' : 'nuits'
                        }`}</option>
                      ))}
                  </select>
                  <p className="text-red-700 text-center">{errors?.reservation?.jours?.message}</p>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-xl mb-2 font-semibold" htmlFor="personnes">
                    Personnes
                  </label>
                  <select
                    {...register('reservation.personnes')}
                    id="personnes"
                    className="border border-gray-300 rounded-lg text-xl"
                  >
                    <option value="">Sélectionner le nombre de personnes</option>
                    {Array.from(Array(15).keys())
                      .filter((key) => key !== 0)
                      .map((option) => (
                        <option value={option} key={`option-${option}`}>{`${option} ${
                          option === 1 ? 'personne' : 'personnes'
                        }`}</option>
                      ))}
                  </select>
                  <p className="text-red-700 text-center">
                    {errors?.reservation?.personnes?.message}
                  </p>
                </div>
              </div>
            </div>
            <h2 className="w-full text-2xl md:text-4xl pb-2 mt-6">Votre logement</h2>
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
                      )}
                    >
                      {space?.images?.length ? (
                        <ImageDisplay
                          image={space.images[0].directus_files_id}
                          imageClasses="object-cover"
                          wrapperClasses="md:rounded-r-none rounded-r-lg rounded-l-lg overflow-hidden h-52 w-full md:w-96 md:h-64 relative"
                        />
                      ) : null}
                      <div className="flex flex-col justify-between p-4 rounded-lg w-full">
                        <div className="flex flex-col justify-between">
                          <h3 className="text-xl font-semibold">{space?.libelle}</h3>
                          <h4 className="font-extrabold text-2xl my-1 text-app-brown">
                            {space?.types[0].type_id?.prix[0]?.item?.valeur} &euro;/nuit
                          </h4>
                        </div>
                        <div className="flex items-center justify-end">
                          {selectedSpaces.find((item: any) => item.id === space.id) == null ? (
                            <button
                              type="button"
                              className="bg-app-yellow text-app-brown py-2 px-6 rounded-md text-xl"
                              onClick={() => toggleType('ADD', space)}
                            >
                              Réserver
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="bg-app-xs-black text-app-black py-2 px-6 rounded-md text-xl"
                              onClick={() => toggleType('REMOVE', space)}
                            >
                              Annuler
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
            <p className="text-red-700 text-center mt-4">{errors?.reservation?.types?.message}</p>
            <h2 className="w-full text-2xl md:text-4xl pb-2 mt-6">Vos informations</h2>
            <div className="p-4 bg-app-beige">
              <div className="grid md:grid-cols-2 md:gap-4">
                <div className="w-full relative mb-4">
                  <label className="text-app-black text-xs" htmlFor="prenom">
                    Votre prénom
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
                    Votre téléphone
                  </label>
                  <input
                    type="text"
                    id="telephone"
                    placeholder="Votre téléphone"
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
                    Si vous avez des précisions, transmettez les nous
                  </label>
                  <textarea
                    rows={5}
                    id="message"
                    placeholder="Votre message"
                    className={classNames(
                      'w-full text-left px-0 py-2 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-app-yellow'
                    )}
                    {...register('reservation.message')}
                  ></textarea>
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
