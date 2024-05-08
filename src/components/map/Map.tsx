import './styles.css';
import * as Leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import Canvas from '../canvas/Canvas';

export const LEAFLET_OPTIONS = {
    zoomControl: true,
    loadingControl: true,
    attributionControl: false,
};

export default function Map({ changeState }: { changeState: boolean }) {
    const [map, setMap] = useState<Leaflet.Map | null>(null);

    useEffect(() => {
        const newMap = Leaflet.map('mapid', LEAFLET_OPTIONS).setView(
            [55.6739075, 12.5692004],
            20
        );

        Leaflet.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5lemEiLCJhIjoiY2x2ejh6NjRoMWN5dTJrcGp1Y25nbnRxZCJ9.eFLWFQpXfq-k5SkudZCwzg", {
            attribution: '© <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11",
        }).addTo(newMap);
        setMap(newMap);

    }, []);

    return (
        <div id='mapid' className='map'>
            {map && <Canvas map={map} changeState={changeState} />}
        </div>
    );
}
