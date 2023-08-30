import { NavLink } from 'react-router-dom';

const ShoeList = (props) => {
    return (
        <p>
            <NavLink className="nav-link" to="/shoes/new">Add Shoes</NavLink>
        </p>

    );
}

export default ShoeList;
