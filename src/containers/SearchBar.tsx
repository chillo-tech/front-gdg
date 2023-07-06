import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { array, date, object, string } from 'yup';
import { HiOutlineSearch } from 'react-icons/hi';
import { parseDateString, todayDate } from '@/utils';
import SelectPersonne from '@/components/forms/inputs/SelectPersonne';

type FormData = {
  debut?: Date;
  fin?: Date;

  personnes: [
    {
      type: 'ADULTE' | 'ENFANT';
      age?: string;
    }
  ];
  options: any[];
};

const schema = object({
  debut: date()
    .typeError('Quand arrivez vous ?')
    .required('Sélectionner une date de début')
    .transform(parseDateString)
    .min(todayDate(), "Votre date doit être à partir d'aujourd'hui"),

  fin: date()
    .typeError('Quand nous quitterez vous ?')
    .required('Sélectionner une date de fin')
    .transform(parseDateString),

  personnes: array()
    .of(
      object().shape({
        type: string().oneOf(['ADULTE', 'ENFANT']).required(),
        age: string(),
      })
    )
    .typeError('Combien serez vous ?')
    .required('Combien serez vous ?'),
}).required();

function SearchBar() {
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    sessionStorage.setItem('RESERVATION', JSON.stringify(data));
    router.push('/reservation');
  };

  const { register, control, handleSubmit, formState, setValue } =
    useForm<FormData>({
      mode: 'onChange',
      resolver: yupResolver(schema),
    });

  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  const { errors } = formState;

  return (
    <>
      <section className="bg-white py-3 px-3 mt-4 md:mt-10 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-4 gap-2">
          <div className="grid grid-cols-1 md:grid-cols-6 md:col-span-3 gap-4 md:gap-2">
            <div className="flex flex-col md:col-span-2">
              <label className="text-app-black font-semibold" htmlFor="debut">
                Date d&lsquo;arrivée
              </label>
              <input
                {...register('debut')}
                min={todayDate().toISOString().split('T')[0]}
                type="date"
                id="date_debut"
                className="w-full border border-gray-300 rounded-lg text-xl text-app-black"
              />
              <p className="text-red-700 text-center">
                {errors.debut?.message}
              </p>
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-app-black font-semibold" htmlFor="debut">
                Date de départ
              </label>
              <input
                {...register('fin')}
                min={todayDate().toISOString().split('T')[0]}
                type="date"
                id="date_fin"
                className="w-full border border-gray-300 rounded-lg text-xl text-app-black"
              />
              <p className="text-red-700 text-center">
                {errors.fin?.message}
              </p>
            </div>
            <SelectPersonne
              errorMessage={errors?.personnes?.message}
              control={control}
              formKey={'personnes'}
              id="personnes"
              setValue={setValue}
            />
          </div>
          <div className="flex flex-col">
            <label className="hidden md:block text-white font-semibold">
              Date
            </label>
            <button className="bg-app-yellow py-2 rounded-lg text-xl !text-app-black uppercase flex items-center justify-center">
              <HiOutlineSearch className="inline-block mr-2" />
              <span className="text-app-black">Chercher</span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default SearchBar;
