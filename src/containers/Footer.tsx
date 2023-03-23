import React from 'react';
import FooterLink from '@/components/FooterLink';
import { CONTACT_PHONE_NUMBER, ROUTE_ACCUEIL } from '@/utils';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { HiPhone } from 'react-icons/hi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Input from '@/components/forms/inputs/Input';
import Button from '@/components/buttons/Button';

export type Email = {
  email: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email('Veuillez entrer un email correct.')
  })
  .required();

const Footer = () => {
  const router = useRouter();

  const onSubmit = async (email: Email) => {
    console.log(email);
  };

  const onError = (errors: any, e: any) => console.log({ errors });

  const handleError = (error: any) => {
    error.preventDefault();
    router.push('/');
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Email>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const call = async () => {
    if (typeof window !== 'undefined') {
      window.open(CONTACT_PHONE_NUMBER.url);
    }
  };

  return (
    <footer className="w-full flex flex-col h-[40rem] md:h-96 items-center justify-center bg-app-black text-white">
      <div className="flex flex-col gap-4 items-center w-[95%] md:w-[80%] h-[85%] pt-10 md:pt-2">
        <div className="md:flex w-full justify-center items-center">
          <FooterLink href={ROUTE_ACCUEIL}>Accueil</FooterLink>
          <FooterLink href={ROUTE_ACCUEIL}>Votre gite</FooterLink>
          <FooterLink href={ROUTE_ACCUEIL}>Réservation</FooterLink>
          <FooterLink href={ROUTE_ACCUEIL}>Nous connaître</FooterLink>
          <FooterLink href={ROUTE_ACCUEIL}>Contact</FooterLink>
          <button
            onClick={call}
            className={
              'flex cursor-pointer h-20 w-full items-center justify-center text-white text-md'
            }>
            <span className="mr-2 rounded-full p-2 border-2 border-white">
              <HiPhone />
            </span>
            <Link href={CONTACT_PHONE_NUMBER.url}>
              {CONTACT_PHONE_NUMBER.label}
            </Link>
          </button>
        </div>
        <div className="flex flex-col flex-1 w-full md:w-[70%] my-4">
          <span className="text-md w-full text-[#FFFFFF80]">
            Connectez vous pour recevoir plus de notification
          </span>
          <div className="flex items-end md:items-center gap-2 w-full border-b-2 border-[#FFFFFF40] my-2 pb-2">
            <Input
              type="email"
              className='flex-1 mb-0 md:mb-0 my-0'
              contentClassName="rounded-none border-none text-white placeholder-white px-0"
              error={errors?.email}
              name="email"
              placeholder="Votre email"
              register={register}
            />
            <Button className='bg-app-yellow' type='submit' title='Envoyer' />
          </div>
        </div>
        <div className="flex flex-col items-center w-full border-t-2 border-[#FFFFFF80] pt-4">
          <div className="h-full w-44 flex items-end">
            <img
              src="/assets/images/logo-blanc.png"
              alt="logo Gite de la Gare"
            />
          </div>
        </div>
      </div>
      <button
        onClick={call}
        className={
          'flex md:hidden cursor-pointer px-2 mt-8 h-20 w-full bg-app-yellow items-center justify-center text-white text-md'
        }>
        <span className="mr-2 rounded-full p-2 border-2 border-white">
          <HiPhone />
        </span>
        <Link href={CONTACT_PHONE_NUMBER.url}>
          {CONTACT_PHONE_NUMBER.label}
        </Link>
      </button>
    </footer>
  );
};

export default Footer;
