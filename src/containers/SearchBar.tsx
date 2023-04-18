import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { date, object,number,array,string } from "yup";
import { HiOutlineSearch } from 'react-icons/hi';
import { parseDateString, todayDate} from '@/utils';

type FormData = {
  debut?: string;
  jours?: string;
  personnes?: string;
  options: any[]
};

const schema = object({
    debut: date().typeError('Quand arrivez vous ?')
            .required("Sélectionner une date de début")
            .min(todayDate(), "Votre date doit être à partir d'aujourd'hui"),
    jours: string().typeError('Combien de jours serez vous des nôtres ?').required('Combien de jours serez vous des nôtres ? '),
    personnes: string().typeError('Combien serez vous ?').required("Combien serez vous ?")
  })
  .required();

function SearchBar() {
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    sessionStorage.setItem("RESERVATION", JSON.stringify(data));
    router.push('/reservation')
  };

  const { register, control, handleSubmit, formState, watch, setValue }  = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {personnes: '2', debut: new Date().toISOString().split('T')[0]}
  });
  const { fields, append, remove } = useFieldArray({ name: 'options', control });

  const { errors } = formState;

  return (
    <>
      <section className='bg-white py-3 px-3 mt-4 md:mt-10 rounded-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid md:grid-cols-4 gap-2'>
          <div className="grid grid-cols-1 md:grid-cols-6 md:col-span-3 gap-4 md:gap-2" >
            <div className="flex flex-col md:col-span-2">
              <label className="text-app-black font-semibold" htmlFor='debut'>
                Date d&lsquo;arrivée
              </label>
              <input 
                {...register('debut')} 
                min={todayDate().toISOString().split('T')[0]}
                type="date" id="date" className='border border-gray-300 rounded-lg text-xl text-app-black' />
              <p className='text-red-700 text-center'>{errors.debut?.message}</p>
            </div> 
            <div className="flex flex-col md:col-span-2">
              <label className="text-app-black font-semibold" htmlFor='jours'>
                Nuits
              </label>
              <select {...register('jours')} id="jours" className='border border-gray-300 rounded-lg text-xl text-app-black'>
                <option value="">Sélectionner le nombre de jours</option>
                {
                  Array.from(Array(15).keys())
                  .filter(key => key !== 0)
                  .map(option => (              
                    <option value={option} key={`option-${option}`}>{`${option} ${option === 1 ? 'nuit': 'nuits'}`}</option>
                  ))
                }
              </select>
              <p className='text-red-700 text-center'>{errors.jours?.message}</p>
            </div> 
            <div className="flex flex-col md:col-span-2">
              <label className="text-app-black font-semibold" htmlFor='personnes'>
                Personnes
              </label>
              <select  {...register('personnes')} id="personnes" className='border border-gray-300 rounded-lg text-xl text-app-black'>
                <option value="">Sélectionner le nombre de personnes</option>
                {
                  Array.from(Array(15).keys())
                  .filter(key => key !== 0)
                  .map(option => (              
                    <option value={option} key={`option-${option}`}>{`${option} ${option === 1 ? 'personne': 'personnes'}`}</option>
                  ))
                }
              </select>
              <p className='text-red-700 text-center'>{errors.personnes?.message}</p>
            </div> 
            {/*
            <div className="md:col-span-6 relative text-app-black md:h-1">
            <div className="items-wrapper text-app-black md:absolute md:left-0 md:top-0 md:right-0 bg-gray-100 px-2 py-2">
              {fields.map((item, i) => (
                        <div className="grid grid-cols-3 gap-4 items-center" key={`options.${i}`}>
                            <h5 className="card-title text-right text-xl font-bold">Ticket {i + 1}</h5>
                            <div className="flex flex-col">
                              <label className="text-app-black font-semibold" htmlFor={`options.${i}.adultes`}>
                                Adultes
                              </label>
                              <input 
                                type="number" 
                                id={`options.${i}.adultes`} 
                                readOnly 
                                className='border border-gray-300 rounded-lg text-xl text-app-black' 
                                {...register(`options.${i}.adultes`)} 
                              />
                            </div>
                            <div className="flex flex-col">
                              <label className="text-app-black font-semibold" htmlFor={`options.${i}.enfants`}>
                                Enfants
                              </label>
                              <input 
                                type="number" 
                                id={`options.${i}.enfants`} 
                                readOnly 
                                className='border border-gray-300 rounded-lg text-xl text-app-black' 
                                {...register(`options.${i}.enfants`)} 
                              />
                            </div>
                        </div>
                ))}
            </div>
           
            </div> 
            */}
            
          </div>
          <div className="flex flex-col">
            <label className="hidden md:block text-white font-semibold">
              Date
            </label>
            <button className='bg-app-yellow py-2 rounded-lg text-xl !text-app-black uppercase flex items-center justify-center'>
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
