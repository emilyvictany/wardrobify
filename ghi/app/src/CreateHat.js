// import React, {useEffect, useState} from 'react';

// function HatForm() {
//     const [locations, setLocations] = useState([])
//     const [fabric, setFabric] = useState('')
//     const [style, setStyle] = useState('')
//     const [color, setColor] = useState('')
//     const [picture_url, setPictureUrl] = useState('')
//     const [location, setLocation] = useState('')

//     const getData = async () => {
//         const url = "http://localhost:8090/api/hats"
//         const response = await fetch(url)

//         if(response.ok) {
//             const data = await response.json()
//             setLocations(data.Locations)
//         }
//     }

//     useEffect(() => {
//         getData()
//     }, [])

// // what is happening
//     const handleSubmit = async (event) => {
//         event.preventDefault()
//         const data = {}
//         data.fabric = fabric
//         data.style = style
//         data.color = color
//         data.picture_url = picture_url
//         data.location = location

//         // const [locations, setLocations] = useState([])
//         // const fetchData = async () => {
//         const hats_url = "http://localhost:8090/api/locations"
//         const fetchConfig = {
//             method: "post",
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }

//         const response = await fetch(hats_url, fetchConfig)

//         // if (response.ok) {
//         //             const data = await response.json();
//         //             setLocations(data.locations);
//         //         } else {
//         //             console.error(response);
//         //         }
//         //     }
// // what is happening


//         if (response.ok) {
//             setFabric('')
//             setStyle('')
//             setColor('')
//             setPictureUrl('')
//             setLocation('')
//         }
//     }

//     // const handleFormChange = (e) => {
//     //     const value = e.target.value
//     //     const inputName = e.target.name
//     //     setFormData({
//     //         ...formData
//     //         [inputName]: value
//     //     })
//     // }


//     const handleFabricChange = (event) => {
//         const value = event.target.value;
//         setFabric(value);
//     }

//     const handleStyleChange = (event) => {
//         const value = event.target.value;
//         setStyle(value);
//     }

//     const handleColorChange = (event) => {
//         const value = event.target.value;
//         setColor(value);
//     }

//     const handlePictureUrlChange = (event) => {
//         const value = event.target.value;
//         setPictureUrl(value);
//     }

//     const handleLocationChange = (event) => {
//         const value = event.target.value;
//         setLocation(value);
//     }

//     return (
//         <div className="row">
//             <div className="offset-3 col-6">
//                 <div className="shadow p-4 mt-4">
//                     <h1>Create a new hat! ♡</h1>
//                     <form onSubmit={handleSubmit} id="create-hat-form">
//                     <div className="form-floating mb-3">
//                         <input onChange={handleFabricChange} value={fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
//                         <label htmlFor="name">Fabric</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input onChange={handleStyleChange} value={style} placeholder="Style" required type="text" name="style" id="style" className="form-control" />
//                         <label htmlFor="name">Style</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
//                         <label htmlFor="name">Color</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input onChange={handlePictureUrlChange} value={picture_url} placeholder="Picture" required type="text" name="picture" id="picture_url" className="form-control" />
//                         <label htmlFor="name">Picture</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <select onChange={handleLocationChange} required name="location" id="location" className="form-select">
//                         <option value="">Choose a location</option>
//                         {locations.map(location => {
//                         return (
//                             <option key={location.id} value={location.id}>{location.closet_name}</option>
//                             )
//                         })}
//                         </select>
//                     </div>
//                     <button className="btn btn-primary">Create</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HatForm
