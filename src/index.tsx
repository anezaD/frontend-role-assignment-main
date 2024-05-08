import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './style.css';
import Map from './components/map/Map';
import Button from './components/ui/button/Button';
import useConstructor from './useConstructor';
import ExtendLeafletPrototypes from './components/canvas/leaflet-extensions.config';
import CenterText from './components/ui/centerText/CenterText';

function App() {
    useConstructor(() => {
        ExtendLeafletPrototypes();
    });

    const [showMap,setShowMap] = useState<boolean>(false);
    const [changeState, setChangeState] = useState(false);

    const usersVisibilityHandler = (): void => {
        setShowMap(true);
        setChangeState(state=>!state);
    }
     
    return (
        <>  
            {showMap ? <Map changeState={changeState} /> : <CenterText text="Ready to play?"/>}
            <Button className={changeState ? 'color-red' : ''} onClick={usersVisibilityHandler} text={changeState ? 'Hide Locations':'Show Locations'} />
        </>
    );
}

const container = document.getElementById('app');
const root = createRoot(container!);
root.render( <Provider store={store}> <App /> </Provider>);
