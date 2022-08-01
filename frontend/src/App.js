import Map, { Marker } from 'react-map-gl';
import { Room } from '@material-ui/icons'
import 'mapbox-gl/dist/mapbox-gl.css';
import PlacePopup from './components/UI/PlacePopup';

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
        <Marker
          longitude={79.0669}
          latitude={30.7346}>
          <Room style={{ color: "#e34659" }} />
        </Marker>
        <PlacePopup/>
      </Map>
    </div >
  );
}

export default App;