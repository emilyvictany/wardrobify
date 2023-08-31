import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import './index.css'



const ShoeList = (props) => {
    // This code is to get and show the shoe data in a list
    // console.log(props)
    const [shoes, setShoes] = useState([]);
    const [shoe, setShoe] = useState('');
    const fetchData = async () => {
        const allShoesUrl = `http://localhost:8080/api/bins/shoes/`;

        try {
            const shoesResponse = await fetch(allShoesUrl);
            if (shoesResponse.ok) {
                const shoesData = await shoesResponse.json();
                // console.log(shoesData.shoes)
                const request = [];
                const shoeList = shoesData.shoes;
                setShoes(shoeList)
            }
        } catch (e) {
            console.error(e)
        }


    }

    useEffect(() => {
        fetchData();
    }, []);
    // console.log(shoes[1].href)

    const handleDelete = async (href) => {
        // const shoeUrl = `http://localhost:8080/${shoes}`
        const newShoeList = shoes.filter((shoe) => shoe.href != href);
        console.log(newShoeList);
        const url = `http://localhost:8080${href}`;
        const deleteOptions = {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: null
        }
        const deleteResponse = await fetch(url, deleteOptions);
        if (deleteResponse.ok) {
            setShoes(newShoeList);
        }
        console.log(newShoeList);
    }

    return (
        <div>
            <NavLink className="nav-link" to="/shoes/new">Add Shoes</NavLink>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Manufacturer</th>
                        <th>Model Name</th>
                        <th>Color</th>
                        <th>Bin Number</th>
                        <th>Closet Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {shoes.map(shoe => {
                    return (
                        <tr key = { shoe.href }>
                    <td><img src={ shoe.picture_url } /></td>
                    <td>{ shoe.manufacturer }</td>
                    <td>{ shoe.model_name }</td>
                    <td>{ shoe.color }</td>
                    <td>{ shoe.bin.number }</td>
                    <td>{ shoe.bin.closet_name } </td>
                    <td>
                        <button className='delete' type='button' onClick={() => handleDelete(shoe.href)}> Delete </button>
                    </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

    );
}

export default ShoeList;
