import { render } from '@testing-library/react';
import * as Leaflet from 'leaflet';

jest.mock('fabric', () => ({
    fabric: {
        Canvas: jest.fn().mockImplementation(() => ({
            requestRenderAll: jest.fn(),
        })),
    },
}));

const mockDelegate = jest.fn();
const mockAddTo = jest.fn();
const leafletFabricLayerMock = jest.fn().mockImplementation(() => ({
    delegate: mockDelegate,
    addTo: mockAddTo,
}));

// Mock Leaflet and fabric modules
jest.doMock('./leaflet-extensions.config', () => ({
    LeafletFabricLayer: leafletFabricLayerMock,
}));

const Canvas = require('./Canvas').default;

describe('Canvas', () => {
    it('returns null', () => {
        const { container } = render(
            <Canvas map={jest.fn() as unknown as Leaflet.Map} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('initializes fabric layer', () => {
        const map = jest.fn() as unknown as Leaflet.Map;

        render(<Canvas map={map} />);

        expect(leafletFabricLayerMock).toHaveBeenCalledTimes(1);
        expect(leafletFabricLayerMock).toHaveBeenCalledWith();

        expect(mockDelegate).toHaveBeenCalledTimes(1);
        expect(mockAddTo).toHaveBeenCalledTimes(1);
        expect(mockAddTo).toHaveBeenCalledWith(map);
    });
});
