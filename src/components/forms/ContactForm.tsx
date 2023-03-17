import React from 'react';
import classNames from 'classnames';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/router';
import Input from './inputs/Input';
import Select from './inputs/Select';
import { CIVILITIES, TERMES_PROPOSITIONS } from '@/utils';
import TextArea from './inputs/TextArea';
import Button from '@/components/buttons/Button';

type Props = {
  className?: string;
};

export type Message = {
  civility: string;
  name: string;
  surname: string;
  address: string;
  town: string;
  phone: string;
  email: string;
  message: string;
  formAccepted: boolean;
};

const schema = yup
  .object({
    civility: yup.string().trim(),
    name: yup.string().trim().required('Ce champ est requis.'),
    surname: yup.string().trim(),
    address: yup.string().trim(),
    town: yup.string().trim(),
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
    formAccepted: yup
      .bool()
      .oneOf([true], 'Vous devez accepter les termes pour poursuivre.')
      .required('Ce champ est requis.'),
  })
  .required();

// Contact Form
function ContactForm({ className }: Props) {
  const router = useRouter();

  const onSubmit = async (message: Message) => {
    console.log(message);
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
  } = useForm<Message>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <div className={classNames('', className)}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="h-full w-full mt-2 col-span-6 px-3 md:px-6 pb-6">
        <div className="grid">
          <div className={'!mr-0 !mt-0'}>
            <Select
              label="Civilité"
              placeholder="Comment s'adresser à vous ?"
              values={CIVILITIES}
              name="civility"
              register={register}
              error={errors?.civility}
            />
            <Input
              label="Nom"
              type="text"
              error={errors?.name}
              name="name"
              placeholder="Votre nom"
              register={register}
            />
            <Input
              label="Prénom"
              type="text"
              error={errors?.surname}
              name="surname"
              placeholder="Votre prénom"
              register={register}
            />
            <TextArea
              label="Adresse"
              error={errors?.address}
              name="address"
              placeholder="Votre adresse"
              register={register}
            />
            <Input
              label="Ville"
              type="text"
              error={errors?.town}
              name="town"
              placeholder="Votre ville"
              register={register}
            />
            <Input
              label="Téléphone portable *"
              type="tel"
              error={errors?.phone}
              name="phone"
              placeholder="Votre numéro de téléphone"
              register={register}
            />
            <Input
              label="Email *"
              type="email"
              error={errors?.email}
              name="email"
              placeholder="Votre adresse mail"
              register={register}
            />
            <TextArea
              label="Votre message *"
              rows={6}
              error={errors?.message}
              name="message"
              placeholder="Votre message"
              register={register}
            />
            <Select
              label="Je consens à recevoir par email des informations de la part de l'établissement *"
              placeholder="Accepter vous les termes ?"
              values={TERMES_PROPOSITIONS}
              name="formAccepted"
              register={register}
              error={errors?.formAccepted}
            />
            <Button title="Envoyer" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
