import { useState, useCallback, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { Room } from '@material-ui/icons';
import { format } from "timeago.js";

import "./app.css";
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const myLocalStorage = window.localStorage;
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
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      username: currentUser?currentUser:"anonymous",
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

  const handleLogout = () => {
    myLocalStorage.removeItem("username");
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <Map
        initialViewState={{ ...viewState }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{ width: "100vw", height: "100vh" }}
        // mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        // mapStyle="mapbox://styles/mapbox/dark-v10"
        mapStyle="mapbox://styles/mapbox/streets-v11"
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
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{pin.title}</h4>
                  <label>Desciption</label>
                  <p className="description">{pin.description}</p>
                  <label>Information</label>
                  <span className="username">Created by <b>{pin.username}</b> </span>
                  <span className="date">{format(pin.createdAt)}</span>
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
            <div className="container">
              <form className="form" onSubmit={handleOnSubmit}>
                <div className="title group">
                  <label htmlFor='title'>Place</label>
                  <input type="text" name='title' onChange={e => { setTitle(e.target.value) }} placeholder="Enter the place name" required />
                </div>

                <div className="desc group">
                  <label htmlFor='desc'>Description</label>
                  <textarea type="text" name="desc" onChange={e => { setDesciption(e.target.value) }} placeholder="Enter the description" required />
                </div>
                <button type='submit' className='submitButton'>Add Pin????</button>
              </form>
            </div>
          </Popup>
        )}


        {currentUser ? (
          <button className="btn logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="btn login" onClick={() => { setShowLogin(true) }}>
              Log in
            </button>
            <button
              className="btn register" onClick={() => { setShowRegister(true) }}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && (
          <Register setShowRegister={setShowRegister} />
        )}

        {showLogin && (
          <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} myLocalStorage={myLocalStorage} />
        )}
      </Map>
    </div >
  );
}

export default App;