import {
  component$,
  noSerialize,
  useVisibleTask$,
  useStore,
  useSignal,
  type NoSerialize,
} from "@builder.io/qwik";

import L from "leaflet";
//import types from leaflet at @types/leaflet

import "leaflet/dist/leaflet.css";
import { MarkerClusterGroup } from "leaflet.markercluster/dist/leaflet.markercluster.js";
import "./clusters.css";
import parkingLocations from "./parking-locations.json";

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
  available: number;
  capacity: number;
}

export default component$((props) => {
  const racks: any = props.racks.value;

  const defaultCoordinates: IMapCoordinates = {
    lat: 50.6425,
    long: 5.5857,
  };
  const gpsCoordinates = useStore<{
    lat: number | null;
    long: number | null;
  }>({
    lat: null,
    long: null,
  });

  const parkingStore = useStore<IParking[]>(parkingLocations);

  const mapRef = useSignal<HTMLElement>();
  const mapStore = useStore<{
    mapInstance: NoSerialize<L.Map>;
  }>({
    mapInstance: undefined,
  });

  // initialize map
  useVisibleTask$(
    () => {
      const map = L.map("map").setView(
        [defaultCoordinates.lat, defaultCoordinates.long],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        minZoom: 7,
        maxZoom: 20,
      }).addTo(map);
      mapStore.mapInstance = noSerialize(map);
    },
    { strategy: "document-ready" }
  );

  // get user location
  useVisibleTask$(async () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        gpsCoordinates.lat = position.coords.latitude;
        gpsCoordinates.long = position.coords.longitude;
      });
    } catch (error) {
      console.log(error);
    }
  });

  // change view if gpsCoordinates are updated
  useVisibleTask$(({ track }) => {
    track(() => gpsCoordinates);
    const map: any = mapStore.mapInstance; //temporary, before implementing type-safety
    map.setView([gpsCoordinates.lat!, gpsCoordinates.long!], 18);
    L.marker([gpsCoordinates.lat!, gpsCoordinates.long!], {
      icon: L.icon({
        iconUrl:
          "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
        iconSize: [38, 38],
        iconAnchor: [22, 38],
        popupAnchor: [-2, -40],
      }),
      title: "Votre emplacement",
      zIndexOffset: 1000,
    })
      .addTo(map)
      .bindPopup("Vous êtes ici")
      .openPopup();

    setTimeout(() => {
      map.setView([gpsCoordinates.lat!, gpsCoordinates.long!], 16);
    }, 1700);
  });

  // add secure parkings markers
  useVisibleTask$(({ track }) => {
    track(() => parkingStore);
    const map: any = mapStore.mapInstance; //temporary, before implementing type-safety

    const parkingIcon = L.icon({
      iconUrl: "../../assets/map/marker-blue.e938bc99.svg",
      shadowUrl:
        "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
      shadowSize: [68, 95],
      shadowAnchor: [18, 80],
      iconSize: [80, 80],
      iconAnchor: [40, 65],
      popupAnchor: [-2, -40],
    });

    const parkingCluster = new MarkerClusterGroup({
      iconCreateFunction: function (cluster: any) {
        const childCount = cluster.getChildCount();
        let c = " mclusters-";
        if (childCount < 10) {
          c += "small";
        } else if (childCount < 100) {
          c += "medium";
        } else {
          c += "large";
        }
        return new L.DivIcon({
          html: "<div><span>" + childCount + "</span></div>",
          className: "mclusters" + c,
          iconSize: new L.Point(70, 70),
        });
      },
      maxClusterRadius: 80,
      zIndexOffset: 992,
    });

    try {
      parkingStore.forEach((parking: IParking) => {
        L.marker(
          new L.LatLng(parking.coordinates.lat, parking.coordinates.long),
          {
            icon: parkingIcon,
            title: parking.name,
          }
        )
          .bindPopup(parking.name)
          .addTo(parkingCluster);
      });
      parkingCluster.addTo(map);
    } catch (err) {
      console.log(err);
    }
  });

  // add bike racks markers
  useVisibleTask$(({ track }) => {
    track(() => racks);
    const map: any = mapStore.mapInstance; //temporary, before implementing type-safety

    const rackIcon = L.icon({
      iconUrl: "/assets/map/icon_rack.svg",
      shadowUrl:
        "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
      shadowSize: [40, 60],
      shadowAnchor: [18, 80],
      iconSize: [60, 60],
      iconAnchor: [40, 65],
      popupAnchor: [-2, -40],
    });

    const rackCluster = new MarkerClusterGroup({
      iconCreateFunction: function (cluster: any) {
        const childCount = cluster.getChildCount();
        let c = " rclusters-";
        if (childCount < 10) {
          c += "small";
        } else if (childCount < 100) {
          c += "medium";
        } else {
          c += "large";
        }
        return new L.DivIcon({
          html: "<div><span>" + childCount + "</span></div>",
          className: "mclusters" + c,
          iconSize: new L.Point(70, 70),
        });
      },
      maxClusterRadius: 80,
      zIndexOffset: 992,
    });

    try {
      racks.forEach((rack: any) => {
        const coordinates = rack.coordinates.split(",");
        L.marker(new L.LatLng(coordinates[0], coordinates[1]), {
          icon: rackIcon,
          title: rack.address,
        })
          .bindPopup(
            `<h4 class="font-semibold font-lg">${rack.address}</h4><p>${
              rack.description
            }</p><p><span class="font-semibold">Nombre</span>: ${
              rack.capacity / 2
            }</p><p><span class="font-semibold">Places disponibles:</span> ${
              rack.capacity
            }</p>`
          )
          .addTo(rackCluster);
      });
      rackCluster.addTo(map);
    } catch (err) {
      console.log(err);
    }
  });

  /*
    useVisibleTask$(({track}) => {
        track(() => gpsCoordinates);
        track(() => parkingStore);

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
            iconUrl: '/assets/map/marker-blue.e938bc99.svg',
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
                    iconSize: new L.Point(70, 70)
                });
            },
            maxClusterRadius: 80,
            zIndexOffset: 992,
            
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

        const rackIcon = L.icon({
            iconUrl: '/assets/map/icon_rack.svg',
            shadowUrl:'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
            shadowSize: [40, 60],
            shadowAnchor: [18, 80],
            iconSize: [60, 60],
            iconAnchor: [40, 65],
            popupAnchor: [-2, -40],
        });

        const rackCluster = new MarkerClusterGroup({
            iconCreateFunction: function(cluster:any) {
                const childCount = cluster.getChildCount();
                let c = ' rclusters-';
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
                    iconSize: new L.Point(70, 70)
                });
            },
            maxClusterRadius: 80,
            zIndexOffset: 992,
            
        });

        try {
            racks.forEach((rack) => {

                const coordinates = rack.coordinates.split(',');
                L.marker(new L.LatLng(coordinates[0], coordinates[1]), {

                    icon: rackIcon,
                    title: rack.address,
                }).bindPopup(
                    `<h4 class="font-semibold font-lg">${rack.address}</h4><p>${rack.description}</p><p><span class="font-semibold">Nombre</span>: ${rack.capacity/2}</p><p><span class="font-semibold">Places disponibles:</span> ${rack.capacity}</p>`
                ).addTo(rackCluster);

            })
            rackCluster.addTo(map);
        } catch(err) {
            console.log(err);

        }

        
       // mapStore.mapInstance = noSerialize(newMap);
    });*/

  return (
    <>
      <div
        id="map"
        ref={mapRef}
        style={{
          height: "calc(100vh - 100px)",
          maxHeight: "calc(100vh - 100px)",
          overflow: "hidden",
        }}
      >
        {mapStore.mapInstance ? null : "loading..."}
      </div>
    </>
  );
});
