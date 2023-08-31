import React, {useEffect, useState } from 'react';

function ShoeForm() {
    const [bins, setBins] = useState([]); // list of bins
    const [bin, setBin] = useState(''); // should be an href
    const [manufacturer, setManufacturer] = useState('');
    const [modelName, setModelName] = useState('');
    const [color, setColor] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setBins(data.bins);
        //   console.log(bins)
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

      const handleChangeBin = (event) => {
        const value = event.target.value;
        setBin(value);
      }

      const handleChangeManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
      }

      const handleChangeModelName = (event) => {
        const value = event.target.value;
        setModelName(value);
      }

      const handleChangeColor = (event) => {
        const value = event.target.value;
        setColor(value);
      }

      const handleChangePictureUrl = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.manufacturer = manufacturer;
        data.model_name = modelName;
        data.color = color;
        data.picture_url = pictureUrl;
        data.bin = bin;
        // console.log(data);

        const shoesUrl = `http://localhost:8080/api/shoes/`;
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const newShoeResponse = await fetch(shoesUrl, fetchOptions);
        // console.log(newShoeResponse.ok)
        // console.log(newShoeResponse.status)
        if (newShoeResponse.ok) {
            setManufacturer('');
            setModelName('');
            setColor('');
            setPictureUrl('');
            setBin('')
            // console.log('FORM SUBMITTED:' + newShoeResponse)
        }
    }

    console.log("SHOES")
    return (
        <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>New Shoes</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                    <input onChange={handleChangeManufacturer} value={manufacturer} placeholder="Manufacturer" required type="text" id="manufacturer" name="manufacturer" className="form-control"/>
                    <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeModelName} value={modelName} placeholder="Model name" required type="text" id="model_name" name="model_name" className="form-control"/>
                    <label htmlFor="model_name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangeColor} value={color} placeholder="Color" type="text" id="color" name="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChangePictureUrl} value={pictureUrl} placeholder="Picture URL" required type="text" id="picture_url" name="picture_url" className="form-control"/>
                    <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="bin" className="form-label">Bin</label>
                    <select required onChange={handleChangeBin} value={bin} id="bin" name="bin" className="form-select">
                        <option>Choose a bin</option>
                        {bins.map(bin => {
                            return (
                                <option key={bin.href} value={bin.href}>Bin #{bin.bin_number} in {bin.closet_name}</option>
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

export default ShoeForm;
