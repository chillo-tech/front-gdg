import React, { useState } from 'react';
import Layout from '@/containers/Layout';
import { APP_NAME, PARTIAL_SPACES } from '@/utils';
import Head from 'next/head';
import { useMutation, useQuery } from 'react-query';
import { fetchData } from '@/services';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import classNames from 'classnames';
import { sendData } from '@/services';
import { useRouter } from 'next/router';
import Message from '@/components/Message';

type FormData = {
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
    message?: string;
  };

const schema = object({
    prenom: string().typeError('Votre prénom').required('Votre prénom '),
    nom: string().typeError('Votre nom').required('Votre nom'),
    email: string().required('Ce champ est requis').email('Email invalide'),
    telephone: string()
      .required('Le téléphone est requis')
      .matches(/^[0-9]+$/, 'Le téléphone invalide il ne doit comporter que des chiffres')
      .min(9, 'Le téléphone invalide il ne doit comporter que des chiffres')
      .max(15, 'Le téléphone invalide il ne doit comporter que des chiffres'),
    message: string().required('Votre message'),
  }).required();
 

function Contact() {
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
    mutation.mutate({
      ...data,
    });
  };

  const onError = (errors: any, e: any) => null;

  const handleError = (error: any) => {
    error.preventDefault();
    router.push('/');
  };

  const mutation = useMutation({
    mutationFn: (message: any) => sendData('/contact', message),
  });

  return (
    <div className="container py-10 md:px-40">
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
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <legend className="w-full text-4xl py-6 text-center bg-app-yellow font-thin">
            Transmettez nous votre message
          </legend>
          <div className="p-4 bg-app-beige">
            <div className="grid md:grid-cols-2 gap-4">
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
                  {...register('prenom')}
                />
                <p className="text-red-700 text-center">{errors?.prenom?.message}</p>
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
                  {...register('nom')}
                />
                <p className="text-red-700 text-center">{errors?.nom?.message}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
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
                  {...register('telephone')}
                />
                <p className="text-red-700 text-center">{errors?.telephone?.message}</p>
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
                  {...register('email')}
                />
                <p className="text-red-700 text-center">{errors?.email?.message}</p>
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
                  {...register('message')}
                ></textarea>
                <p className="text-red-700 text-center">{errors?.message?.message}</p>
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
  );
}

export default Contact;
