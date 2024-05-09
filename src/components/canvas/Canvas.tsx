import { useEffect, useState } from 'react';
import { LeafletFabricLayer } from './leaflet-extensions.config';
import * as Leaflet from 'leaflet';
import { fabric } from 'fabric';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { removePlayerAction, showNotificationAction } from '../../redux/game/reducer';
import { getGamePlayers } from '../../redux/game/selectors';

export default function Canvas({ map, changeState }: { map: Leaflet.Map, changeState: boolean }): null {

    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(
        null
    );
    const dispatch = useDispatch();

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
            fabricCanvas.getObjects().forEach(function (obj) {
                obj.visible = changeState;
            });
            fabricCanvas.renderAll(); // This updates the canvas to reflect changes
        }
    }, [changeState]);

    useEffect(() => {
        const getResolution = (center: any, zoom: number) => {
            // Resolution in meters per pixel. 40075016 is the length of the equator in meters.
            return (
                (Math.cos((center.lat * Math.PI) / 180) * 40075016) /
                (256 * Math.pow(2, zoom))
            );
        }
        const updateMarkerPositions = () => {
            if (fabricCanvas) {
                fabricCanvas.clear();
                // Get the current latitude and longitude
                const currentLatlng = map.getCenter();
                // Get the current zoom level
                const currentZoomLevel = map.getZoom();
                const resolution = getResolution(currentLatlng, currentZoomLevel);

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
                        radius: 5 / resolution,
                        fill: 'blue',
                        strokeWidth: 2 / resolution,
                        stroke: 'white',

                    }) : new fabric.Rect({
                        left: point.x,
                        top: point.y,
                        width: 10 / resolution,
                        height: 10 / resolution,
                        fill: 'white',
                        strokeWidth: 2 / resolution,
                        stroke: 'red',
                    });

                    shape.on('selected', function () {
                        dispatch(removePlayerAction(item.id));
                        dispatch(showNotificationAction({ name: item.name, id: item.id, team: item.teamName }))
                        fabricCanvas.remove(shape);
                    });

                    return fabricCanvas.add(shape);
                });
            };
        };

        map.on('moveend zoomend', updateMarkerPositions);

    }, [map, fabricCanvas, PLAYERS_DATA]);

    if (!fabricCanvas) return null;

    return null;
}
