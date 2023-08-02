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

interface IMapProps {
    gpsCoordinates: {
        x: number;
        y: number;
    }

}

export default component$<IMapProps>((props) => {
    const { gpsCoordinates } = props;

    const mapRef = useSignal<HTMLElement>();
    const mapStore = useStore<{
        mapInstance: NoSerialize<L.Map>;
    }>({
        mapInstance: undefined
    })

    useVisibleTask$(() => {

        navigator.geolocation.getCurrentPosition((position) => {
        gpsCoordinates.x = position.coords.latitude;
        gpsCoordinates.y = position.coords.longitude;
        })   

        const map = L.map('map')
            .setView([gpsCoordinates.x, gpsCoordinates.y], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(map);

        L.marker([gpsCoordinates.x, gpsCoordinates.y]).addTo(map);

        mapStore.mapInstance = noSerialize(map);
       // mapStore.mapInstance = noSerialize(newMap);
    });

    return(
        <>
            <div id="map" ref={mapRef} style="height:calc(100vh - 76px); overflow:hidden">
            
            </div>
        </>
        );
});


/*export default component$<IMapProps>((props) => {
    const { gpsCoordinates } = props;
    return(
        <><iframe 
            width="100%" 
            height="100%" 
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${gpsCoordinates.y + 0.00787}%2C${gpsCoordinates.x - 0.00424}%2C${gpsCoordinates.y - 0.00787}%2C${gpsCoordinates.x + 0.00424}&amp;layer=mapnik`} 
            style="min-height:calc(100vh - 76px);"
        >
        </iframe>
        </>
    );
});*/