import React, { MutableRefObject, useRef, useState, useEffect } from 'react';

function SelectPersonne({
  errorMessage,
  id,
  register,
  formKey,
  setValue,
}: {
  errorMessage?: string;
  id?: string;
  register?: any;
  formKey?: string;
  setValue?: any;
}) {

  const nombresVoyageursInput: MutableRefObject<
    HTMLInputElement | undefined | null
  > = useRef();
  const nombresEnfantsInput: MutableRefObject<
    HTMLInputElement | undefined | null
  > = useRef();
  
  const [showFields, setShowFields] = useState<any>(false);

  const [nombresVoyageurs, setNombresVoyageurs] = useState(0);
  const [nombresEnfants, setNombresEnfants] = useState(0);

  const onAddPeople = () => {
    if (nombresVoyageursInput.current)
      nombresVoyageursInput.current.value = '0';
  };

  const incrementAdult = () => {
    // TODO: Increment the number of adult
    setNombresVoyageurs(nombresVoyageurs + 1);
  };

  const incrementChild = () => {
    // TODO: Increment the number of child
    setNombresEnfants(nombresEnfants + 1);
  };

  const decrementAdult = () => {
    // TODO: Increment the number of adult
    setNombresVoyageurs(nombresVoyageurs <= 0 ? 0 : nombresVoyageurs - 1);
  };

  const decrementChild = () => {
    // TODO: Increment the number of child
    setNombresEnfants(nombresEnfants <= 0 ? 0 : nombresEnfants - 1);
  };

  const submitData = () => {
    setShowFields(false)
    // TODO: Submit data
  };

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current?.contains(event?.target as Node)) {
        setShowFields(false);
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
        className={` ${ formKey?.search('reservation') != -1 ? 'text-xl mb-2' : '' } font-semibold`}
        htmlFor="personnes">
        Personnes
      </label>
      <button
        type="button"
        onClick={() => setShowFields(!showFields)}
        className="w-full h-full text-left py-2 px-4 border border-gray-300 rounded-lg text-xl">
        {nombresVoyageurs} Voyageurs
      </button>
      <div
        ref={panelRef}
        id='panelContent'
        className={
          showFields
            ? 'absolute top-full mt-4 border border-gray-300 left-0 bg-white z-10 rounded-lg flex flex-col py-6 px-4 space-y-8 h-128 overflow-y-scroll overflow-x-hidden'
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
              <input
                {...register(`${formKey}.nombresVoyageurs`)}
                readonly
                className="border-none w-10 aspect-square"
                type="text"
                value={nombresVoyageurs}
              />
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
              <input
                {...register(`${formKey}.nombresEnfants`)}
                readonly
                className="border-none w-10 aspect-square"
                type="text"
                value={nombresEnfants}
              />
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
          {Array.from(Array(nombresEnfants).keys()).map((index) => (
            <div key={`child-${index}`} className="space-y-2">
              <label
                onClick={() => setShowFields(!showFields)}
                className="font-semibold"
                htmlFor={`age-enfant-${index + 1}`}>
                Âge de l'enfant n°{index + 1}
              </label>
              <select
                id={`age-enfant-${index + 1}`}
                name={`age-enfant-${index + 1}`}
                className="w-full border border-gray-300 rounded-lg text-xl">
                <option disabled value="">Sélectionner l'âge</option>
                {Array.from(Array(16).keys()).map((option) => (
                  <option value={option} key={`option-${option}`}>
                    {' '}
                    {option == 0 ? 'quelques mois' : `${option} ans`}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full bg-app-yellow mt-4 rounded-md border-0 py-2 px-6 transition hover:bg-opacity-80"
          onClick={submitData}>
          Confirmer
        </button>
      </div>

      <p className="text-red-700 text-center">{errorMessage}</p>
    </div>
  );
}

export default SelectPersonne;
