import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Marker } from 'react-map-gl';
import { Room } from '@material-ui/icons';

import PlacePopup from '../Popup/PlacePopup';

const AllPins = () => {
    const [allPins, setAllPins] = useState([]);

    useEffect(() => {
        const getAllPins = async () => {
            const res = await axios.get("/pins") // only '/pins' as we are using proxy 
            console.log(res.data);
            setAllPins(res.data);
        }
        getAllPins();
    }, []);

    return (
        <>
            {allPins?.map((pin, index) => (
                <>
                    <Marker
                        longitude={pin.longitude}
                        latitude={pin.latitude}
                    >
                        <Room style={{ color: "#e34659" }} />
                    </Marker>

                    <PlacePopup
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                        title={pin.title}
                        description={pin.description}
                        username={pin.username}
                    />
                </>
            ))}
        </>
    )
}

export default AllPins;