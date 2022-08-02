import React from 'react'
import { Popup } from 'react-map-gl';

import styles from "./placepopup.module.css"

const PlacePopup = ({latitude,longitude,title,description,username,time}) => {
    return (
        <Popup longitude={longitude} latitude={latitude}
            anchor="left"
        >   
            <div className={styles.card}>
                <label>Place</label>
                <h4 className={styles.place}>{title}</h4>
                <label>Desciption</label>
                <p className={styles.description}>{description}</p>
                <label>Information</label>
                <span className={styles.username}>Created by <b>{username}</b> </span>
                <span className={styles.date}>{time}</span>
            </div>
        </Popup>
    )
}

export default React.memo(PlacePopup);