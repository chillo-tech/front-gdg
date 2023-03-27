import React, { useContext } from 'react';
import { CONTACT_PHONE_NUMBER,  } from '@/utils';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { HiPhone } from 'react-icons/hi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Input from '@/components/forms/inputs/Input';
import Button from '@/components/buttons/Button';
import Image from 'next/image';
import { ApplicationContext } from '@/context/ApplicationContext';

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

  const {state:{menus, entreprise}} = useContext(ApplicationContext);
  return (
    <footer className="w-full flex flex-col items-center justify-center pt-6 md:pb-10 bg-app-black text-white">
      <div className="container flex items-center justify-center">
        {menus ? (
          <ul className='flex flex-col md:flex-row items-center justify-center'>
            {
              menus
              .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
              .map((menu: any) => 
                <li key={`footer-${menu.id}-item`}><Link className='block py-1 px-5 text-[#FFFFFF80] hover:text-app-gray' href={`${menu.slug}`}>{menu.libelle}</Link></li>)}
                  {
                    (entreprise && entreprise.contact) ? (
                    <li>
                      <Link href={`tel:${entreprise.contact[0].item.telephone}`} className="py-5 flex items-center justify-center">
                        <span className="mr-2 rounded-full p-2 border-2 border-white">
                          <HiPhone />
                        </span>
                        {entreprise.contact[0].item.telephone}
                      </Link>
                    </li>
                    ) : null
                  }
          </ul>
        ): null}
      </div>
      <div className="flex flex-col gap-4 items-center w-[95%] md:w-[80%] h-[85%] md:pt-2">
        <div className="flex flex-col flex-1 w-full md:w-[70%] my-4">
          <span className="text-md w-full text-[#FFFFFF80]">
            Connectez vous pour recevoir nos actualités
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
            <Image
            width={150} height={120}
              src="/assets/images/logo-blanc.png"
              alt="logo Gite de la Gare"
            />
          </div>
        </div>
      </div>
      {(entreprise && entreprise.contact) ? (
      <Link href={`tel:${entreprise.contact[0].item.telephone}`} className="flex items-center justify-center bg-app-yellow w-full py-2 mt-2 md:hidden">
        <span className="mr-2 rounded-full p-2 border-2 border-white">
          <HiPhone />
        </span>
        {entreprise.contact[0].item.telephone}
      </Link>
      ): null }
    </footer>
  );
};

export default Footer;
