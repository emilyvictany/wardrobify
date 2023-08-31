import { NavLink } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import './index.css'

const ShoeList = (props) => {
    // console.log(props)
    const [shoes, setShoes] = useState([]);
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
            // console.error(e)
        }


    }

    useEffect(() => {
        fetchData();
      }, []);
    console.log(shoes)
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
                  </tr>
                  );
                })}
                </tbody>
            </table>
        </div>

    );
}

export default ShoeList;
