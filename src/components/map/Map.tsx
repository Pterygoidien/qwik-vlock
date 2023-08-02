import { 
    component$, 
    noSerialize, 
    useVisibleTask$,
    useStore,
    useSignal,
    
    type NoSerialize
} from "@builder.io/qwik";

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface IMapCoordinates {
    lat: number;
    long: number;

}

interface IParking {
    id: number;
    name: string;
    address: string;
    coordinates: IMapCoordinates;
}

export default component$(() => {
    const defaultCoordinates:IMapCoordinates = {
        lat: 50.64250,
        long: 5.58570,
    }
    const gpsCoordinates = useStore<{
        lat: number | null,
        long: number | null,
    }>({
        lat: null,
        long: null,
    });

    const parkingStore = useStore<IParking[]>([{
        id: 1,
        name: 'Parking 1',
        address: 'prout',
        coordinates: {
            lat: 50.64250,
            long: 5.58570,
        }
    },
    {
        id: 2,
        name: 'Parking 2',
        address: 'prout',
        coordinates: {
            lat:50.63569237663317, 
            long:5.571662394235067
        }
    },

]);

    const mapRef = useSignal<HTMLElement>();
    const mapStore = useStore<{
        mapInstance: NoSerialize<L.Map>;
    }>({
        mapInstance: undefined
    })


    useVisibleTask$(({track}) => {
        const map = L.map('map')
            .setView([defaultCoordinates.lat, defaultCoordinates.long], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'v-lock uses OpenStreetMap with <3 ',
            minZoom: 8,
            maxZoom: 20,

        }).addTo(map);
        

        track(() => gpsCoordinates);
        track(() => parkingStore);

        try {
            navigator.geolocation.getCurrentPosition((position) => {
                gpsCoordinates.lat = position.coords.latitude;
                gpsCoordinates.long = position.coords.longitude;
                map.setView([gpsCoordinates.lat!, gpsCoordinates.long!], 17);
                L.marker([gpsCoordinates.lat!, gpsCoordinates.long!], {
                    icon: L.icon({
                        iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
                        iconSize: [38, 38],
                        iconAnchor: [22, 38],
                        popupAnchor: [-2, -40],
                    }),

                })
                .addTo(map)
                .bindPopup('Vous êtes ici').openPopup();
            setTimeout(() => {
                    map.setView([gpsCoordinates.lat!, gpsCoordinates.long!], 13);
                }, 2000);


                
                
            })
        } catch (error) {
            console.log(error);
        }

        try {
            parkingStore.forEach((parking:IParking) => {
                L.marker([parking.coordinates.lat, parking.coordinates.long], {

                    icon: L.icon({
                        iconUrl: 'http://localhost:5173/assets/map/marker-blue.e938bc99.svg',
                        iconSize: [80, 80],
                        iconAnchor: [80, 80],
                        popupAnchor: [-2, -40],
                    }),

                }).addTo(map);
            })
        } catch(err) {
            console.log(err);

        }

        mapStore.mapInstance = noSerialize(map);
       // mapStore.mapInstance = noSerialize(newMap);
    });

    return(
        <>
        <div id="map" ref={mapRef} style={{height: "calc(100vh - 100px)", overflow: "hidden"}}>
           
        </div>
        </>
        );
});