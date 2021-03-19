import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import fakeData from '../fakeData/data.json'

const Rider = () => {
    const [data, setData] = useState([])
    console.log(data)
    const {key} = useParams();
    console.log(key)
    useEffect(() => {
        const vehicle = fakeData.find(data => data.key === key)
        setData(vehicle)
    }, [])
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser)
    return (
        <div>
            <h3>{loggedInUser.from}</h3>
            <h3>{loggedInUser.to}</h3>
            <h4>Jurney by : {data.name}</h4>
        </div>
    );
};

export default Rider;