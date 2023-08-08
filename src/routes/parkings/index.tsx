import { component$} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Map from "~/components/map/Map";


export interface IRackAPI {
    id: number,
        coordinates: string,
        address:string,
        type:string,
        description:string,
        capacity:number,
        icar_street_id:number
}



export const useRacks = routeLoader$(async() => {
    const data = await fetch('http://127.0.0.1:8000/api/map/mapitems', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });



    return await data.json()
    
})


export default component$(() => {

    const racks = useRacks();


    //now let's do it with useTask instead

   


    return(
        <>
            <section>
                
                <Map racks={racks}/>
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