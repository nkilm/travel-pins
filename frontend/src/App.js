import { useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import AllPins from './components/UI/AllPins/AllPins';
import NewPin from './components/UI/NewPin/NewPin';

function App() {
  const [viewState, setViewState] = useState({
    latitude: 21.1458,
    longitude: 79.0882,
    zoom: 4
  });
  const [newPinCoordinates, setNewPinCoordinates] = useState(null);

  const handleDblClick = (event) => {
    const coord = event['lngLat'];
    setNewPinCoordinates({
      long: coord['lng'],
      lat: coord['lat']
    })
    console.log(newPinCoordinates);
  }

  return (
    <div className="App">
      <Map
        initialViewState={{ ...viewState }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onDblClick={handleDblClick}
      >
        <AllPins handleChangeViewstate={setViewState} currentViewState={viewState} />

        {newPinCoordinates && (
          <NewPin newPinCoordinates={newPinCoordinates} setNewPinCoordinates={setNewPinCoordinates} />
        )}

      </Map>
    </div >
  );
}

export default App;