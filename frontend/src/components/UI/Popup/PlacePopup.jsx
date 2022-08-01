import React from 'react'
import { Popup } from 'react-map-gl';

import styles from "./placepopup.module.css"

const PlacePopup = () => {
    return (
        <Popup longitude={79.0669} latitude={30.7346}
            anchor="left"
        >
            <div className={styles.card}>
                <label>Place</label>
                <h4 className={styles.place}>Kedarnath</h4>
                <label>Desciption</label>
                <p className={styles.description}>The Kedarnath temple is located on the Garhwal Himalayan range near the Mandakini river, in the state of Uttarakhand, India</p>
                <label>Information</label>
                <span className={styles.username}>Created by <b>nikhilmohite</b> </span>
                <span className={styles.date}>1 hour ago</span>
            </div>
        </Popup>
    )
}

export default PlacePopup;