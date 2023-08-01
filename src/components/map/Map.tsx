import { component$, useVisibleTask$ } from "@builder.io/qwik";


interface IMapProps {
    gpsCoordinates: {
        x: number;
        y: number;
    }
}

export default component$<IMapProps>((props) => {
    const { gpsCoordinates } = props;
    

    useVisibleTask$(() => {

        navigator.geolocation.getCurrentPosition((position) => {
        gpsCoordinates.x = position.coords.latitude;
        gpsCoordinates.y = position.coords.longitude;
    })   


        import("leaflet").then((L)=>{
            const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                minZoom: 8,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            });
            const newMap = L.map("map").setView([gpsCoordinates.x, gpsCoordinates.y], 16);
            tiles.addTo(newMap);
      
            const marker = L.marker([gpsCoordinates.x, gpsCoordinates.y]).addTo(newMap);
            marker.bindPopup("Vous êtes ici").openPopup();
      
            setMap(newMap);

        })  
    });

    return(
        <>
        <div id="map" style="min-height:calc(100vh - 76px);">
           
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