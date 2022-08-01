import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AllPins from './components/UI/AllPins/AllPins';

function App() {
  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: 79.0669,
          latitude: 30.7346,
          zoom: 4
        }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      >
        <AllPins />
      </Map>
    </div >
  );
}

export default App;