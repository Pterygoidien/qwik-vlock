import { component$, useStore,  useVisibleTask$ } from "@builder.io/qwik";
import Map from "~/components/map/Map";

export default component$(() => {
    const gpsCoordinates = useStore({
        x: 50.64596,
        y: 5.57806,
    })

    useVisibleTask$(() => {
        
        navigator.geolocation.getCurrentPosition((position) => {
            gpsCoordinates.x = position.coords.latitude;
            gpsCoordinates.y = position.coords.longitude;
        })
        
    });
   
    return(
        <>
            <section>
                <Map gpsCoordinates={gpsCoordinates} />
            </section>
        </>
    )
});