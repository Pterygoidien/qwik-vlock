import { component$, useSignal, useStore,    useVisibleTask$ } from "@builder.io/qwik";
import Map from "~/components/map/Map";

export default component$(() => {

    const gpsCoordinates = useStore<{x:number | null,y:number | null}>({
        x: null, //50.64250,
        y: null, //5.58570,
    })

    const coordinatesLoaded = useSignal<boolean>(false);



    useVisibleTask$(({track}) => {
        track(()=>
        {
            try {
                navigator.geolocation.getCurrentPosition((position) => {
                    gpsCoordinates.x = position.coords.latitude;
                    gpsCoordinates.y = position.coords.longitude;
                    coordinatesLoaded.value = true;
                })   
            }
            catch (error) {
                coordinatesLoaded.value = true;
            }

        });

        //todo : first render Map.tsx with default coordinates
        // then, send the updates GPS coordinates, in Map.tsx, to a track for the coordinates that then calls the function map.setView thereafter
        //so that the map loads first, then the coordinates are updated and the map is centered on the user's location

          
    });
    //now let's do it with useTask instead

   


    return(
        <>
            <section>
                
            {(coordinatesLoaded.value) && <Map gpsCoordinates={{x: gpsCoordinates.x ?? 50.64250, y: gpsCoordinates.y ?? 5.58570}} />}
            </section>
        </>
    )

     // use the gpsCoordinates of the user to retrieve its physical address with the OpenStreetMap API
    /**
     * API address : "https://nominatim.openstreetmap.org/reverse?format=jsonv2"+"&lat=" + coords.latitude + "&lon=" + coords.longitude
     * response : {
     *  "place_id": number, 
     * "licence": string,
     * "osm_type": string,
     * "osm_id": number,
     * "lat": string,
     * "}lon": string,
     * "place_rank": number,
     * "category": string[],
     * type": string,
     * "importance": number,
     * "addresstype": string,
     * "name": string,
     * "display_name": string,
     * "address": {
        * "house_number": string,
        * "road": string,
        * "neighbourhood": string,
        * "suburb": string,
        * "city": string,
        * "county": string,
        * "state": string,
        * "postcode": string,
        * "country": string,
        * "country_code": string
        * },
     * }
     */
});