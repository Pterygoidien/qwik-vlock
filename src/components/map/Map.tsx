import { 
    component$, 
    noSerialize, 
    useVisibleTask$,
    useStore,
    useSignal,
    type NoSerialize
} from "@builder.io/qwik";

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import  {MarkerClusterGroup }  from 'leaflet.markercluster';
import './clusters.css';
import parkingLocations from './parking-locations.json';

interface IMapCoordinates {
    lat: number;
    long: number;

}

interface IParking {
    id: number;
    name: string;
    address: string;
    coordinates: IMapCoordinates;
    city?: string;
    area?: string;
    available:number,
    capacity:number,
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

    const parkingStore = useStore<IParking[]>(parkingLocations);

    const mapRef = useSignal<HTMLElement>();
    const mapStore = useStore<{
        mapInstance: NoSerialize<L.Map>;
    }>({
        mapInstance: undefined
    })


    useVisibleTask$(({track}) => {
        track(() => gpsCoordinates);
        track(() => parkingStore);

        const map = L.map('map')
            .setView([defaultCoordinates.lat, defaultCoordinates.long], 13);
        
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {    
            attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            minZoom: 9,
            maxZoom: 20,
        }).addTo(map);
        

        try {
            navigator.geolocation.getCurrentPosition((position) => {
                gpsCoordinates.lat = position.coords.latitude;
                gpsCoordinates.long = position.coords.longitude;
                map.setView([gpsCoordinates.lat!, gpsCoordinates.long!], 18);
                L.marker([gpsCoordinates.lat!, gpsCoordinates.long!], {
                    icon: L.icon({
                        iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
                        iconSize: [38, 38],
                        iconAnchor: [22, 38],
                        popupAnchor: [-2, -40],
                    }),
                    title: 'Votre emplacement',
                    zIndexOffset: 1000,
                }).addTo(map).bindPopup('Vous êtes ici').openPopup();

                L.circle([gpsCoordinates.lat!, gpsCoordinates.long!], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.2,
                    radius: 400,
                }).addTo(map);
                
                
            setTimeout(() => {
                    map.setView([gpsCoordinates.lat!, gpsCoordinates.long!], 16);
                }, 1700);
            })
        } catch (error) {
            console.log(error);
        }

        const parkingIcon = L.icon({
            iconUrl: 'http://localhost:5173/assets/map/marker-blue.e938bc99.svg',
            shadowUrl:'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
            shadowSize: [68, 95],
            shadowAnchor: [18, 80],
            iconSize: [80, 80],
            iconAnchor: [40, 65],
            popupAnchor: [-2, -40],
        });

        const parkingCluster = new MarkerClusterGroup({
            iconCreateFunction: function(cluster:any) {
                const childCount = cluster.getChildCount();
                let c = ' mclusters-';
                if (childCount < 10) {
                    c += 'small';
                } else if (childCount < 100) {
                    c += 'medium';
                } else {
                    c += 'large';
                }
                return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'mclusters' + c,
                    iconSize: new L.Point(40, 40)
                });
            }
            
        });

        try {
            parkingStore.forEach((parking:IParking) => {
                L.marker(new L.LatLng(parking.coordinates.lat, parking.coordinates.long), {

                    icon: parkingIcon,
                    title: parking.name,
                }).bindPopup(parking.name).addTo(parkingCluster);

            })
            parkingCluster.addTo(map);
        } catch(err) {
            console.log(err);

        }

        mapStore.mapInstance = noSerialize(map);
       // mapStore.mapInstance = noSerialize(newMap);
    });

    return(
        <>
        <div id="map" ref={mapRef} style={{height: "calc(100vh - 100px)", maxHeight:"calc(100vh - 100px)", overflow: "hidden"}}>
           
        </div>
        </>
        );
});