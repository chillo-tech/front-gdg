import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Message from '@/components/Message';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendData } from '@/services';

type FormData = {
    email: string;
};

const schema = object({
  email: string().required('Ce champ est requis').email('Email invalide')
}).required();

function Newsletter() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (message: any) => sendData('/newsletter', message),
  });

  const onSubmit = (data: any) => {
    mutation.mutate({
      ...data,
    });
  };

  const handleError = (error: any) => {
    error.preventDefault();
    router.push('/');
  };
  const { register, handleSubmit, formState: {errors}, setValue } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  return (
    <div className="container px-40">
      <h2 className="text-md w-full text-[#FFFFFF80]">
        Connectez vous pour recevoir nos actualités
      </h2>
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
          <form className='w-full grid gap-4 md:grid-cols-12 mb-4' onSubmit={handleSubmit(onSubmit)}>
            <div className="md:col-span-9">
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
            <button className="md:col-span-3 bg-app-yellow text-app-brown py-1 px-2 rounded-md text-xl">
              Transmettre
            </button>
          </form>
        ) : null}

    </div>
  )
}

export default Newsletter;
