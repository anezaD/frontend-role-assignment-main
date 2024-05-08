import { useEffect, useState } from 'react';
import { LeafletFabricLayer } from './leaflet-extensions.config';
import * as Leaflet from 'leaflet';
import { fabric } from 'fabric';

export default function Canvas({ map }: { map: Leaflet.Map }): null {
    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(
        null
    );
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

    if (!fabricCanvas) return null;

    return null;
}
