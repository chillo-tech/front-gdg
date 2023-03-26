
import { useLoadScript, GoogleMap,MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';

const Carte = ({adresses = []}: {adresses: any[]}) => {
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(
    () => ({ lat:47.081012, lng: 2.398782}),
    []
  );

    const onLoad = () => null;

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      zoom: 5
    }),
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
              zoom={6}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: '800px', height: '384px' }}
            >
              {
                  adresses.map((adresse: any, index: number) => (
                      <MarkerF
                        key={`adresse-${adresse.id}-${index}`}
                        onLoad={onLoad}

                        position={{ lat: parseFloat(adresse.latitude), lng: parseFloat(adresse.longitude)}}
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
