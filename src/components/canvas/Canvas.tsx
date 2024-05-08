import { useEffect, useState } from 'react';
import { LeafletFabricLayer } from './leaflet-extensions.config';
import * as Leaflet from 'leaflet';
import { fabric } from 'fabric';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { getGamePlayers } from '../../redux/game/selectors';

export default function Canvas({ map, changeState }: { map: Leaflet.Map, changeState:boolean }) : null {
    
    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(
        null
    );

    const PLAYERS_DATA = useSelector((state: RootState) => getGamePlayers(state))

    useEffect(() => {
        const fabricLayer = new LeafletFabricLayer();
        const fabricLayerDidMount = () => {
            const fabricCanvas = new fabric.Canvas(fabricLayer._canvas);
            fabricLayer.setFabricCanvas(fabricCanvas);
            fabricCanvas.requestRenderAll();
            setFabricCanvas(fabricCanvas);
        };

        fabricLayer.delegate({
            onLayerDidMount: fabricLayerDidMount,
        });

        fabricLayer.addTo(map);
    }, [map]);

    useEffect(() => {
        if (fabricCanvas) {
            fabricCanvas.getObjects().forEach(function(obj) {
                obj.visible = changeState;
            });
            fabricCanvas.renderAll(); // This updates the canvas to reflect changes
        }
    },[changeState]);

    useEffect(() => {
        if (fabricCanvas) {
            fabricCanvas.clear();


            PLAYERS_DATA.forEach(item => {
                const latitude = item.position.latitude;
                const longitude = item.position.longitude;
                const team = item.teamName;

                // Convert latitude and longitude to map coordinates
                const latLng = new Leaflet.LatLng(latitude, longitude);
                const point = map.latLngToContainerPoint(latLng);

                const shape = team === 'red' ? new fabric.Circle({
                    left: point.x,
                    top: point.y,
                    radius: 5,
                    fill: 'blue',
                    strokeWidth: 2,
                    stroke: 'white',

                }) : new fabric.Rect({
                    left: point.x,
                    top: point.y,
                    width: 10,
                    height: 10,
                    fill: 'white',
                    strokeWidth: 2,
                    stroke: 'red',
                });

                return fabricCanvas.add(shape);
            });
        };


    }, [map, fabricCanvas, PLAYERS_DATA]);

    if (!fabricCanvas) return null;

    return null;
}
