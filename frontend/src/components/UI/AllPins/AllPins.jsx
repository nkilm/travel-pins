import React, { useState, useEffect, useCallback } from 'react'
import axios from "axios";
import { Marker, Popup } from 'react-map-gl';
import { Room } from '@material-ui/icons';
import { format } from "timeago.js";

import styles from "./popup.module.css";

const AllPins = ({ handleChangeViewstate, currentViewState }) => {
    const currentUser = "nikhilmohite";
    const [allPins, setAllPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    useEffect(() => {
        const getAllPins = async () => {
            const res = await axios.get("/pins") // only '/pins' as we are using proxy 
            setAllPins(res.data);
        }
        getAllPins();
    }, []);

    const handleMarkerClick = useCallback((id, lat, long) => {
        setCurrentPlaceId(id);
        handleChangeViewstate({ ...currentViewState, latitude: lat, longitude: long })
    }, [currentViewState, handleChangeViewstate]);


    return (
        <>
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
        </>
    )
}

export default AllPins;