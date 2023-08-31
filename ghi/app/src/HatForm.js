import React, {useEffect, useState} from 'react';

function HatForm() {
    const [locations, setLocations] = useState([])
    const [fabric, setFabric] = useState('')
    const [style, setStyle] = useState('')
    const [color, setColor] = useState('')
    const [picture_url, setPictureUrl] = useState('')
    const [location, setLocation] = useState('')

    const getData = async () => {
        const url = 'http://localhost:8100/api/locations/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setLocations(data.locations)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }

    const handleStyleChange = (event) => {
        const value = event.target.value;
        setStyle(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.fabric = fabric
        data.style = style
        data.color = color
        data.picture_url = picture_url
        data.location = location

    const hatsUrl = "http://localhost:8090/api/hats/"

    const fetchConfig = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const hat_response = await fetch(hatsUrl, fetchConfig)
    if (hat_response.ok) {
        setFabric('')
        setStyle('')
        setColor('')
        setPictureUrl('')
        setLocation('')
    }
}

    return (
        <div className="container">
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <center><h1>Add a new hat ♡</h1></center>
                <form onSubmit={handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFabricChange} value={fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                        <label htmlFor="fabric">Fabric</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleStyleChange} value={style} placeholder="Style Name" required type="text" name="style_name" id="style_name" className="form-control" />
                        <label htmlFor="style">Style Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePictureUrlChange} value={picture_url} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                        <label htmlFor="picture_url">Picture URL</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <select required onChange={handleLocationChange} value={location} name="location" id="location" className="form-select">
                            <option>Choose a Location</option>
                        {locations.map(location => {
                            return (
                                <option key={location.href} value={location.href}>
                                {location.closet_name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
        </div>
        </div>
    );
    }

    export default HatForm;
