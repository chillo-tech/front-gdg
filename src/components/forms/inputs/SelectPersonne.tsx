import React, { MutableRefObject, useRef, useState, useEffect } from 'react';
import {
  Control,
  FieldValues,
  UseFieldArrayUpdate,
  UseFormRegister,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';

const PersonInput = ({
  index,
  control,
  update,
  formKey,
  value,
  register,
}: {
  index: number;
  control: Control<any, any>;
  update: UseFieldArrayUpdate<any, any>;
  formKey: string;
  value: any;
  register: UseFormRegister<FieldValues>;
}) => {
  const age = useWatch({
    control,
    defaultValue: value?.age,
    name: `${formKey}.${index}.age`,
  });

  if (value.type === 'adulte') {
    return (
      <input
        className="hidden"
        value={value.type}
        {...register(`${formKey}.${index}.type` as const)}
      />
    );
  }

  return (
    <div className="space-y-2">
      <label className="font-semibold" htmlFor={`person-${index + 1}`}>
        Âge de l&apos;enfant
      </label>
      <input
        readOnly
        className="hidden"
        value={value.type}
        {...register(`${formKey}.${index}.type` as const)}
      />
      <select
        id={`age-enfant-${index + 1}`}
        {...register(`${formKey}.${index}.age` as const)}
        className="w-full border border-gray-300 rounded-lg text-xl">
        {Array.from(Array(16).keys()).map((option) => (
          <option value={option} key={`option-${option}`}>
            {' '}
            {option == 0 ? 'quelques mois' : `${option} ans`}
          </option>
        ))}
      </select>
    </div>
  );
};

function SelectPersonne({
  control,
  errorMessage,
  id,
  formKey,
  setValue,
}: {
  control: Control<any, any>;
  errorMessage?: string;
  id?: string;
  formKey: string;
  setValue: any;
}) {
  const { register, handleSubmit } = useForm();

  const { fields, append, prepend, remove, update } = useFieldArray({
    control,
    name: `${formKey}`,
  });

  const [showFields, setShowFields] = useState<any>(false);

  const [nombresAdultes, setNombresAdultes] = useState(0);

  const [nombresEnfants, setNombresEnfants] = useState(0);

  const incrementAdult = () => {
    append({ type: 'adulte' });
    setNombresAdultes(nombresAdultes + 1);
  };

  const incrementChild = () => {
    append({ type: 'enfant', age: '0' });
    setNombresEnfants(nombresEnfants + 1);
  };

  const decrementAdult = () => {
    if (nombresAdultes > 0) {
      setNombresAdultes(nombresAdultes - 1);
      deletePerson('adulte');
    }
  };

  const deletePerson = (type: string) => {
    for (let i = fields.length - 1; i >= 0; i--) {
      const f: any = fields[i];
      // If it's the target person : adulte | enfant
      if (f?.type === type) {
        remove(i);
        break;
      }
    }
  };

  const decrementChild = () => {
    if (nombresEnfants > 0) {
      setNombresEnfants(nombresEnfants - 1);
      deletePerson('enfant');
    }
  };

  const submitData = (data: any) => {
    setShowFields(false);

    if (!data) return;

    let objKeys = formKey.split('.');

    let sendData = data;
    
    for (let key of objKeys) {
      if (!sendData) return;

      sendData = sendData[`${key}`];
      // Find the array of personnes
      if (key?.search('person') != -1) {
        setValue(`${formKey}`, sendData);
        break;
      }
    }
  };

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current?.contains(event?.target as Node)
      ) {
        setShowFields(false);
        handleSubmit((data) => submitData(data))();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [panelRef]);

  return (
    <div className="relative flex flex-col md:col-span-2 text-black">
      <label
        onClick={() => setShowFields(!showFields)}
        className={` ${
          formKey?.search('reservation') != -1 ? 'text-xl mb-2' : ''
        } font-semibold`}
        htmlFor="personnes">
        Personnes
      </label>
      <button
        type="button"
        onClick={() => setShowFields(!showFields)}
        className="w-full h-full text-left py-2 px-4 border border-gray-300 rounded-lg text-xl">
        {nombresAdultes + nombresEnfants} Voyageurs
      </button>
      <div
        ref={panelRef}
        id="panelContent"
        className={
          showFields
            ? 'absolute top-full mt-4 border border-gray-300 left-0 bg-white z-10 rounded-lg flex flex-col py-6 px-4 space-y-8 max-h-[30rem] overflow-y-scroll overflow-x-hidden'
            : 'hidden'
        }>
        <div className="w-full flex-1 space-y-8">
          <div className="flex space-x-10 w-full">
            <div className="flex-1 w-full space-y-2">
              <span className="font-bold">Adultes</span>
              <p className="w-32">De 16 ans et plus</p>
            </div>
            <div className="flex flex-1 h-12 space-x-2">
              <button
                type="button"
                onClick={decrementAdult}
                className="p-2 font-extrabold text-center flex justify-center items-center text-xl bg-gray-200 rounded-lg aspect-square">
                <span className="inline-flex h-full">-</span>
              </button>
              <span className="aspect-square h-full pt-2 text-center w-10">
                {nombresAdultes}
              </span>
              <button
                type="button"
                onClick={incrementAdult}
                className="p-2 font-extrabold text-center flex justify-center items-center text-xl bg-gray-200 rounded-lg aspect-square">
                <span className="inline-flex h-full">+</span>
              </button>
            </div>
          </div>
          <div className="flex space-x-10 w-full">
            <div className="flex-1 w-full space-y-2">
              <span className="font-bold">Enfants</span>
              <p className="w-32">De 0 ans à 15 ans</p>
            </div>
            <div className="flex flex-1 h-12 space-x-2">
              <button
                type="button"
                onClick={decrementChild}
                className="p-2 font-extrabold text-center flex justify-center items-center text-xl bg-gray-200 rounded-lg aspect-square">
                <span className="inline-flex h-full">-</span>
              </button>
              <span className="aspect-square h-full pt-2 text-center w-10">
                {nombresEnfants}
              </span>
              <button
                type="button"
                onClick={incrementChild}
                className="p-2 font-extrabold text-center flex justify-center items-center text-xl bg-gray-200 rounded-lg aspect-square">
                <span className="inline-flex h-full">+</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 w-full flex-1 space-y-8">
          {fields.map((field, ind) => {
            return (
              <PersonInput
                key={field.id}
                index={ind}
                control={control}
                update={update}
                formKey={formKey}
                value={field}
                register={register}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="w-full bg-app-yellow mt-4 rounded-md border-0 py-2 px-6 transition hover:bg-opacity-80"
          onClick={handleSubmit((data) => submitData(data))}>
          Confirmer
        </button>
      </div>

      <p className="text-red-700 text-center">{errorMessage}</p>
    </div>
  );
}

export default SelectPersonne;
