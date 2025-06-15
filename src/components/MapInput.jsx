import { useEffect, useRef } from 'react';

function MapInput({ placeholder, onPlaceSelected }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.warn('Google Maps Places API no disponible.');
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
      fields: ['formatted_address'],
      componentRestrictions: { country: 'co' } // 🇨🇴 limitar a Colombia
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onPlaceSelected(place.formatted_address);
      }
    });
  }, [onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder || 'Buscar ubicación'}
      style={{
        width: '100%',
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        background: 'white'
      }}
    />
  );
}

export default MapInput;
