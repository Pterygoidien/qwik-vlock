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
            attribution: '© OpenStreetMap contributors',
            minZoom: 8,
            maxZoom: 20,

        }).addTo(map);
        

        track(() => gpsCoordinates);

        try {
            navigator.geolocation.getCurrentPosition((position) => {
                gpsCoordinates.lat = position.coords.latitude;
                gpsCoordinates.long = position.coords.longitude;
                map.setView([gpsCoordinates.lat!, gpsCoordinates.long!], 17);
                L.marker([gpsCoordinates.lat!, gpsCoordinates.long!]).addTo(map).bindPopup('Hey, je m\'appelle Paul').openPopup();
                
            })
        } catch (error) {
            console.log(error);
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