import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { array, date, object, string } from 'yup';
import { HiOutlineSearch } from 'react-icons/hi';
import { todayDate } from '@/utils';
import SelectPersonne from '@/components/forms/inputs/SelectPersonne';

type FormData = {
  debut?: string;
  jours?: string;
  personnes: [
    {
      type: 'adulte' | 'enfant';
      age?: string;
    }
  ];
  options: any[];
};

const schema = object({
  debut: date()
    .typeError('Quand arrivez vous ?')
    .required('Sélectionner une date de début')
    .min(todayDate(), "Votre date doit être à partir d'aujourd'hui"),
  jours: string()
    .typeError('Combien de jours serez vous des nôtres ?')
    .required('Combien de jours serez vous des nôtres ? '),

  personnes: array()
    .of(
      object().shape({
        type: string().oneOf(['adulte', 'enfant']).required(),
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

  const { register, control, handleSubmit, formState, watch, setValue } =
    useForm<FormData>({
      mode: 'onChange',
      resolver: yupResolver(schema),
      defaultValues: { debut: new Date().toISOString().split('T')[0] },
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
                id="date"
                className="w-full border border-gray-300 rounded-lg text-xl text-app-black"
              />
              <p className="text-red-700 text-center">
                {errors.debut?.message}
              </p>
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-app-black font-semibold" htmlFor="jours">
                Nuits
              </label>
              <select
                {...register('jours')}
                id="jours"
                className="border border-gray-300 rounded-lg text-xl text-app-black">
                <option value="">Sélectionner le nombre de jours</option>
                {Array.from(Array(15).keys())
                  .filter((key) => key !== 0)
                  .map((option) => (
                    <option
                      value={option}
                      key={`option-${option}`}>{`${option} ${
                      option === 1 ? 'nuit' : 'nuits'
                    }`}</option>
                  ))}
              </select>
              <p className="text-red-700 text-center">
                {errors.jours?.message}
              </p>
            </div>
            <SelectPersonne
              errorMessage={errors?.personnes?.message}
              control={control}
              formKey={'personnes'}
              id="personnes"
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
