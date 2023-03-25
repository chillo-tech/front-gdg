import React from 'react';
import { ROUTE_ACCUEIL } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Select from '@/components/forms/inputs/Select';
import Button from '@/components/buttons/Button';
import classNames from 'classnames';
import { HiOutlineSearch } from 'react-icons/hi';

export type SearchParams = {
  localisation: string;
  amount: number;
};

export const LOCALISATIONS = [
  {
    label: 'Localisation1',
    value: 'Localisation1',
  },
  {
    label: 'Localisation2',
    value: 'Localisation2',
  },
];

export const AMOUNTS = [
  {
    label: '400$ - 500$',
    value: 400,
  },
  {
    label: '500$ - 600$',
    value: 600,
  },
];

const schema = yup
  .object({
    localisation: yup.string().trim(),
    amount: yup.number(),
  })
  .required();

function SearchBar() {
  const router = useRouter();

  const onSubmit = async (data: SearchParams) => {
    console.log(data);
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
  } = useForm<SearchParams>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <div className="bg-white p-3 md:p-0 md:px-3 mt-10 rounded-lg w-11/12 md:flex justify-between items-center">
      <div className="flex-1 md:pr-4 md:mr-4 md:border-r-2 md:border-gray-300">
        <Select
          register={register}
          label="Localisation"
          name={'localisation'}
          placeholder="Sélectionner"
          values={LOCALISATIONS}
        />
      </div>
      <div className="flex-1">
        <Select
          label="Montant"
          register={register}
          name={'amount'}
          placeholder="Sélectionner"
          values={AMOUNTS}
        />
      </div>
      <div className="w-full  md:w-60 my-4 md:my-0 flex justify-center items-center">
        <button
          type={'submit'}
          className={classNames(
            `  bg-app-yellow
                flex
                justify-center
                items-center
                w-4/6
                md:w-full
                h-full
                uppercase
                font-semibold
                rounded-md
                border-0
                py-2
                md:py-4
                transition
                hover:bg-opacity-80
                `
          )}>
          <div>
            <HiOutlineSearch className="inline-block mb-1 mr-1.5" />
            Chercher
          </div>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
