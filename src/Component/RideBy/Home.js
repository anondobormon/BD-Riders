import React, { useEffect, useState } from 'react';
import './Home.css';
import './Home.css';
import Background from '../../images/Bg.png'
import fakeData from '../fakeData/data.json'
import Vehicles from '../Vehicles/Vehicles';

const Home = () => {
    const [vehicle, setVehicle] = useState([]);

    // console.log(vehicle)
    useEffect(() => {
        setVehicle(fakeData)

    }, []);
 
    return (
        <div className="home-page">

            {
                vehicle.map(vh => <Vehicles vehicle={vh} key={vh}></Vehicles>)
            }


        </div>
    );
};

export default Home;