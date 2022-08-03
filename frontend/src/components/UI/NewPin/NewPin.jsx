import React, { useState } from 'react'
import { Popup } from "react-map-gl";

import styles from "./newpin.module.css"

const NewPin = ({ newPinCoordinates, setNewPinCoordinates }) => {

    const [title, setTitle] = useState("");
    const [desciption, setDesciption] = useState("");

    const handleOnSubmit = () => {
        const newPinObj = {
            
            title: title,
            description: desciption,

        }
    }

    return (
        <>
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
        </>
    )
}

export default NewPin;