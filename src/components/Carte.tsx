
import { useLoadScript, GoogleMap,MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';

const Carte = ({adresses = []}: {adresses: any[]}) => {
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(
    () => ({ lat:48.006111, lng: 0.199556}),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
    {
      adresses ? (
        <div className='flex justify-center items-center relative'>
          <div className="h-96 rounded-xl overflow-hidden">
            <GoogleMap
              zoom={10}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: '600px', height: '384px' }}
            >
              
              {
                  adresses.map((adresse: any, index: number) => (
                      <MarkerF
                        title="ddddd"
                        key={`adresse-${adresse.item.code_postal}-${index}`}
                        position={{ lat: parseFloat(adresse.item.latitude), lng: parseFloat(adresse.item.longitude)}}
                      />
                  ))
              }
            </GoogleMap>
          </div>
        </div>
      ) :null
    }
    </>
  );
};

export default Carte;
