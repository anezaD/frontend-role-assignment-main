import * as Leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import './styles.css';
import Canvas from '../canvas/Canvas';

export const LEAFLET_OPTIONS = {
    zoomControl: true,
    loadingControl: true,
    attributionControl: false,
};

export default function Map() {
    const [map, setMap] = useState<Leaflet.Map | null>(null);

    useEffect(() => {
        setMap(
            Leaflet.map('mapid', LEAFLET_OPTIONS).setView(
                [55.6739075, 12.5692004],
                20
            )
        );
    }, []);

    return (
        <div id='mapid' className='map'>
            {map && <Canvas map={map} />}
        </div>
    );
}
