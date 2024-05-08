import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './style.css';
import Map from './components/map/Map';
import Button from './components/button/Button';
import useConstructor from './useConstructor';
import ExtendLeafletPrototypes from './components/canvas/leaflet-extensions.config';

function App() {
    useConstructor(() => {
        ExtendLeafletPrototypes();
    });

    return (
        <Provider store={store}>
            <Map />
            <Button text={'Show Locations'} />
        </Provider>
    );
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
