import React, { useEffect, useState } from 'react';
import './Home.css';

import fakeData from '../fakeData/data.json'
import Vehicles from '../Vehicles/Vehicles';

const Home = () => {
const [vehicle, setVehicle] = useState([]);

// console.log(vehicle)
useEffect(() => {
    setVehicle(fakeData)

  }, []);
    return (
        <div>
            <h3>This is home</h3>


            {
                vehicle.map(vh => <Vehicles vehicle = {vh} key={vh}></Vehicles>)
            }


        </div>
    );
};

export default Home;