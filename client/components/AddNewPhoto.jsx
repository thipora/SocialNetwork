import React, { useState } from "react";
import { Photo } from "../Photo";
import { useParams } from 'react-router-dom';
import "../style.css";


function AddNewPhoto(props) {

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('')
    const albumId = useParams();

    async function addNewPhoto() {
        let id;
        await fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                id = json[0].nextPhotoId
            });
        const thumbnailUrl = url.replace("/600/", "/150/");
        const photo = new Photo(id, props.albumId, title, url, thumbnailUrl)
        fetch("http://localhost:3000/photos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photo),
        }).then(response => {
            response.json();
        }).then(props.addToArr(photo)).catch(() => { console.log("adding fail") })

        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextPhotoId": id + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
    }


    return (
        <>
            <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)} required />
            <input type='text' placeholder='URL' onChange={(e) => setUrl(e.target.value)} required />
            <button type="submit" onClick={addNewPhoto}>Add</button>
        </>
    )


}


export default AddNewPhoto
