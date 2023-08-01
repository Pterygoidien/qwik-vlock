import { component$ } from "@builder.io/qwik";

interface IMapProps {
    gpsCoordinates: {
        x: number;
        y: number;
    },
}


export default component$<IMapProps>((props) => {
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
});