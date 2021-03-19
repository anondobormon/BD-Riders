import React from 'react';
import { Link } from 'react-router-dom';


const Vehicles = (props) => {
    // console.log(props.vehicle)
    const {key, name, img} = props.vehicle
    return (
        <div>
            {/* <h5>This is vehicle</h5> */}
            <Link to ={"/destination/" + key}>
                    <div className='bike'>
                        <img src={img} alt="" />
                        <h3>{name}</h3>
                    </div>
                </Link >
            
        </div>
    );
};

export default Vehicles;

// Link to={'/teams/' + idLeague}