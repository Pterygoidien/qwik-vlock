import { component$, useStore,    useVisibleTask$ } from "@builder.io/qwik";
import Map from "~/components/map/Map";

export default component$(() => {

    const gpsCoordinates = useStore({
        x: 50.64250,
        y: 5.58570,
    })


    useVisibleTask$(({track}) => {
        track(()=>
        {
            if(gpsCoordinates.x==50.64250 || gpsCoordinates.y==5.58570)
            {
                navigator.geolocation.getCurrentPosition((position) => {
                gpsCoordinates.x = position.coords.latitude;
                gpsCoordinates.y = position.coords.longitude;
                }) 
            } 
        });

          
    });
    //now let's do it with useTask instead

   


    return(
        <>
            <section>
                
              {gpsCoordinates && <Map gpsCoordinates={gpsCoordinates} />}
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