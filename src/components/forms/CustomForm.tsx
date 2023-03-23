import React from 'react';
import classNames from 'classnames';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/router';
import Input from './inputs/Input';
import { PAYMENT_METHOD, ROUTE_ACCUEIL } from '@/utils';
import TextArea from './inputs/TextArea';
import Button from '@/components/buttons/Button';
import RadioGroup from './inputs/RadioGroup';

type Props = {
  title: string;
  action: Function;
  messageTitle?: string;
  messagePlaceholder?: string;
  className?: string;
};

export type FormSchema = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  message: string;
  paymentMethod: string;
};

const schema = yup
  .object({
    name: yup.string().trim().required('Ce champ est requis.'),
    surname: yup.string().trim(),
    phone: yup
      .string()
      .required('Ce champ est requis.')
      .min(10, 'Veuillez entrer un numéro correcte.'),
    email: yup
      .string()
      .email('Veuillez entrer un email correct.')
      .required('Ce champ est requis.'),
    message: yup
      .string()
      .trim()
      .required('Ce champ est requis.')
      .min(30, "Dites nous en un peu plus s'il vous plait."),
    paymentMethod: yup
      .string()
      .oneOf(
        [PAYMENT_METHOD.online.value, PAYMENT_METHOD.presential.value],
        'Méthode de paiement invalide'
      )
      .required('Ce champ est requis.'),
  })
  .required();

// Contact Form
function ContactForm({
  className,
  action,
  title,
  messageTitle,
  messagePlaceholder,
}: Props) {
  const router = useRouter();

  const onSubmit = async (data: FormSchema) => {
    action(data);
  };

  const onError = (errors: any, e: any) => console.log({ errors });

  const handleError = (error: any) => {
    error.preventDefault();
    router.push(ROUTE_ACCUEIL);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const paymentMethod = watch('paymentMethod');
  const name = watch('name');
  const surname = watch('surname');
  const email = watch('email');
  const phone = watch('phone');

  return (
    <div
      className={classNames(
        'w-full md:w-10/12 mx-auto bg-app-beige',
        className
      )}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="h-full w-full">
        <legend className="w-full text-4xl py-6 text-center bg-app-yellow font-thin">
          {title}
        </legend>
        <div className="grid grid-cols-12 mx-4">
          <div className="col-span-12 md:flex items-center justify-between gap-4">
            <Input
              value={name}
              type="text"
              className='mb-8'
              error={errors?.name}
              name="name"
              placeholder="Nom"
              register={register}
            />
            <Input
              value={surname}
              type="text"
              className='mb-4'
              error={errors?.surname}
              name="surname"
              placeholder="Prénom"
              register={register}
            />
          </div>
          <div className="col-span-12 md:flex items-center justify-between md:gap-4">
            <Input
              value={email}
              type="email"
              className='mb-10'
              error={errors?.email}
              name="email"
              placeholder="Adresse email"
              register={register}
            />
            <Input
              value={phone}
              type="tel"
              error={errors?.phone}
              name="phone"
              placeholder="Numéro de téléphone"
              register={register}
            />
          </div>
          <div className="col-span-12 md:flex items-center mt-8 justify-between gap-4">
            <TextArea
              label={messageTitle}
              rows={6}
              error={errors?.message}
              name="message"
              placeholder={messagePlaceholder ? messagePlaceholder : 'Écrire'}
              register={register}
            />
          </div>
          <div className="col-span-12 flex items-center justify-center">
            <RadioGroup
              error={errors?.paymentMethod}
              name="paymentMethod"
              register={register}
              values={[PAYMENT_METHOD.presential, PAYMENT_METHOD.online]}
            />
          </div>
          <div className="col-span-12 flex items-center justify-center mt-10 mb-20">
            <Button title="Confirmation" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
