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
import ImageDisplay from '@/components/image-display';
import Newsletter from './Newsletter';
import Debug from '@/components/Debug';

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
    <footer className="w-full flex flex-col gap-4 md:gap-10 items-center justify-center pt-6 md:pb-10 bg-app-black text-white">
      <div className="container flex items-center justify-center">
        {menus ? (
          <ul className='flex flex-col md:flex-row items-center justify-center'>
            {
              menus
              .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
              .map((menu: any) => 
                <li key={`footer-${menu.id}-item`}><Link className='block py-1 px-5 text-[#FFFFFF80] hover:text-app-gray' href={`/${menu.slug}`}>{menu.libelle}</Link></li>)}
                  {
                    (entreprise && entreprise.contact) ? (
                    <li>
                      <Link href={`tel:${entreprise.contact[0].item?.telephone}`} className="py-5 flex items-center justify-center">
                        <span className="mr-2 rounded-full p-2 border-2 border-white">
                          <HiPhone />
                        </span>
                        {entreprise.contact[0].item?.telephone}
                      </Link>
                    </li>
                    ) : null
                  }
          </ul>
        ): null}
      </div>
      
      <Newsletter />

      <div className="container flex justify-center items-center">
        <Link href={'/'} className='pt-8 pb-8 md:py-2 block'>
          <ImageDisplay
              image={{path: "/assets/images/logo-blanc.png", title: `Le gite de la gare`}} 
              local={true}
              unoptimized
              wrapperClasses="h-16 w-44 rounded-lg overflow-hidden relative" 
          />
        </Link>
      </div>
      {(entreprise && entreprise.contacts) ? (
        <>

        <Link href={`tel:${entreprise.contacts[0]?.telephone}`} className="flex items-center justify-center bg-app-yellow w-full py-2 mt-2 md:hidden">
          <span className="mr-2 rounded-full p-2 border-2 border-white">
            <HiPhone />
          </span>
          {entreprise.contacts[0]?.telephone}
        </Link>
        </>
      ): null }
    </footer>
  );
};

export default Footer;
