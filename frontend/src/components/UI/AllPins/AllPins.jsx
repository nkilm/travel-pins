import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Marker } from 'react-map-gl';
import { Room } from '@material-ui/icons';
import { format } from "timeago.js";

import PlacePopup from '../Popup/PlacePopup';

const AllPins = () => {
    const [allPins, setAllPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    useEffect(() => {
        const getAllPins = async () => {
            const res = await axios.get("/pins") // only '/pins' as we are using proxy 
            setAllPins(res.data);
        }
        getAllPins();
    }, []);

    const handleMarkerClick = id => {
        setCurrentPlaceId(id);
    }

    return (
        <>
            {allPins?.map((pin, index) => (
                <>
                    <Marker
                        longitude={pin.longitude}
                        latitude={pin.latitude}
                    >
                        <Room style={{ color: "#e34659",cursor:"pointer" }} onClick={() => handleMarkerClick(pin._id)} />
                    </Marker>
                    {(pin._id === currentPlaceId) && (<PlacePopup
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                        title={pin.title}
                        description={pin.description}
                        username={pin.username}
                        time={format(pin.createdAt)}
                    />)}
                </>
            ))}
        </>
    )
}

export default AllPins;