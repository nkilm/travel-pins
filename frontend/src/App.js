import Map from 'react-map-gl';

function App() {
  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: 78.6569,
          latitude: 22.9734,
          zoom: 4
        }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      />
    </div>
  );
}

export default App;