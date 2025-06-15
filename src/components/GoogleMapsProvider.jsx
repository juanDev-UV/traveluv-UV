import { LoadScript } from '@react-google-maps/api';

const libraries = ['places']; // Solo usamos Places API (autocomplete)

function GoogleMapsProvider({ children }) {
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
        >
            {children}
        </LoadScript>
    );
}

export default GoogleMapsProvider;
