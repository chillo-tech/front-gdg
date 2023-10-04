import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { array, date, object, string } from 'yup';
import { HiOutlineSearch } from 'react-icons/hi';
import { parseDateString, todayDate } from '@/utils';
import SelectPersonne from '@/components/forms/inputs/SelectPersonne';

import moment from 'moment';

moment.locale('fr', {
  months:
    'Janvier_F&eacute;vrier_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_D&eacute;cembre'.split(
      '_'
    ),
  monthsShort:
    'Janv._F&eacute;vr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._D&eacute;c.'.split('_'),
  monthsParseExact: true,
  weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
  weekdaysShort: 'Dim._Lun._Mar._Mer._Jeu._Ven._Sam.'.split('_'),
  weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
});

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
//@ts-ignore
import { DateRangePicker } from 'react-dates';

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
    .required('S&eacute;lectionner une date de d&eacute;but')
    .transform(parseDateString)
    .min(todayDate(), "Votre date doit être à partir d'aujourd'hui"),

  fin: date()
    .when(
      'debut',
      (debut, yup) =>
        debut &&
        yup.min(
          debut,
          "La date de d&eacute;part ne peut pas être avant celle d'arriv&eacute;e."
        )
    )
    .typeError('Quand nous quitterez vous ?')
    .required('S&eacute;lectionner une date de fin')
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

  const [_startDate, setStartDate] = useState<any>(null);
  const [_endDate, setEndDate] = useState<any>(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const onSubmit = async (data: FormData) => {
    sessionStorage.setItem('RESERVATION', JSON.stringify(data));
    router.push('/reservation');
  };

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<FormData>({
      mode: 'onChange',
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  return (
    <>
      <section className="bg-white py-3 px-3 mt-4 md:mt-10 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-4 gap-2">
          <div className="grid grid-cols-1 md:grid-cols-6 md:col-span-3 gap-4 md:gap-2">
            <div className="flex flex-col md:col-span-3 pr-2">
              <label className={`font-semibold text-black`}>
                Date d&apos;arriv&eacute;e et de d&eacute;part
              </label>
              <DateRangePicker
                showDefaultInputIcon={true}
                block={true}
                numberOfMonths={1}
                hideKeyboardShortcutsPanel={true}
                keepOpenOnDateSelect={true}
                minDate={moment()}
                displayFormat="D/M/Y"
                startDate={_startDate}
                startDatePlaceholderText="Arriv&eacute;e"
                startDateId="debut"
                endDate={_endDate}
                endDatePlaceholderText="D&eacute;part"
                endDateId="fin"
                onDatesChange={({ startDate, endDate }: any) => {
                  setValue('debut', startDate?.toDate());
                  setStartDate(startDate);

                  setValue('fin', endDate?.toDate());
                  setEndDate(endDate);

                  console.log(`Starting date ${_startDate}`);
                  console.log(`Ending date ${_endDate}`);
                }}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput: any) => {
                  console.log(`Focused input : ${focusedInput}`);
                  setFocusedInput(focusedInput);
                }}
              />
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
