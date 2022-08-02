import React, { useState, useEffect, useCallback } from 'react'
import axios from "axios";
import { Marker } from 'react-map-gl';
import { Room } from '@material-ui/icons';
import { format } from "timeago.js";

import PlacePopup from '../Popup/PlacePopup';

const AllPins = () => {
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

    const handleMarkerClick = useCallback(id => {
        setCurrentPlaceId(id);
    }, []);

    return (
        <>
            {allPins?.map((pin, index) => (
                <>
                    <Marker
                        longitude={pin.longitude}
                        latitude={pin.latitude}
                    >
                        <Room style={{ color: pin.username === currentUser ? "tomato" : "slateblue", cursor: "pointer" }} onClick={() => { handleMarkerClick(pin._id) }} />
                    </Marker>
                    {(pin._id === currentPlaceId) && (<PlacePopup
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                        title={pin.title}
                        description={pin.description}
                        username={pin.username}
                        time={format(pin.createdAt)}
                        onClose={() => { setCurrentPlaceId(null) }}
                    ></PlacePopup>) && console.log("rendered")}
                </>
            ))}
        </>
    )
}

export default AllPins;