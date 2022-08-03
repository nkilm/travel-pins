import { useState, useCallback, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { Room } from '@material-ui/icons';
import { format } from "timeago.js";

import styles from "./app.module.css";

function App() {
  const [viewState, setViewState] = useState({
    latitude: 21.1458,
    longitude: 79.0882,
    zoom: 4
  });
  const [newPinCoordinates, setNewPinCoordinates] = useState(null);
  const [allPins, setAllPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [title, setTitle] = useState("");
  const [desciption, setDesciption] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleDblClick = (event) => {
    const coord = event['lngLat'];
    setNewPinCoordinates({
      long: coord['lng'],
      lat: coord['lat']
    })
    console.log(newPinCoordinates);
  }

  useEffect(() => {
    const getAllPins = async () => {
      const res = await axios.get("/pins") // only '/pins' as we are using proxy 
      setAllPins(res.data);
    }
    getAllPins();
  }, []);

  const handleMarkerClick = useCallback((id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long })
  }, [viewState, setViewState]);


  const handleOnSubmit = async () => {
    const newPinObj = {
      username: "nikhil",
      title: title,
      description: desciption,
      latitude: newPinCoordinates.lat,
      longitude: newPinCoordinates.long
    }

    try {
      const res = await axios.post("/pins", newPinObj);
      setAllPins((prevPins) => (
        [...prevPins, res.data]
      ))
      setNewPinCoordinates(null);
    } catch (error) {
      console.log(error);
    }
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
        {/* <AllPins handleChangeViewstate={setViewState} currentViewState={viewState} setUpdateAllPins={setUpdateAllPins} /> */}
        {allPins?.map((pin, index) => (
          <>
            <Marker
              longitude={pin.longitude}
              latitude={pin.latitude}
            >
              <Room style={{ color: pin.username === currentUser ? "tomato" : "slateblue", cursor: "pointer" }} onClick={() => { handleMarkerClick(pin._id, pin.latitude, pin.longitude) }} />
            </Marker>
            {(pin._id === currentPlaceId) && (
              <Popup
                longitude={pin.longitude}
                latitude={pin.latitude}
                anchor="left"
                onClose={setCurrentPlaceId(null)}
              >
                <div className={styles.card}>
                  <label>Place</label>
                  <h4 className={styles.place}>{pin.title}</h4>
                  <label>Desciption</label>
                  <p className={styles.description}>{pin.description}</p>
                  <label>Information</label>
                  <span className={styles.username}>Created by <b>{pin.username}</b> </span>
                  <span className={styles.date}>{format(pin.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}

        {newPinCoordinates && (
          <Popup
            latitude={newPinCoordinates.lat}
            longitude={newPinCoordinates.long}
            onClose={() => { setNewPinCoordinates(null) }}
          >
            <form className={styles.form} onSubmit={handleOnSubmit}>
              <label htmlFor='title'>Title</label>
              <input type="text" name='title' onChange={e => { setTitle(e.target.value) }} />

              <label htmlFor='desc'>Description</label>
              <input type="text" name="desc" onChange={e => { setDesciption(e.target.value) }} />

              <button type='submit' className='submitButton'>Add Pin📌</button>
            </form>
          </Popup>
        )}

      </Map>
    </div >
  );
}

export default App;