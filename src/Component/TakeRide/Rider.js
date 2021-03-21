import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import fakeData from '../fakeData/data.json';
import './Rider.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Map from '../Map/Map';

const Rider = () => {
    const [data, setData] = useState([])
    console.log(data)
    const { key } = useParams();
    // console.log(key)
    useEffect(() => {
        const vehicle = fakeData.find(data => data.key === key)
        setData(vehicle)
    }, [key])

    const [loggedInUser] = useContext(UserContext);
    console.log(loggedInUser)
    return (
        <div className='Rider'>
            <div className="destination-details">
                <div className="far">
                    <h5>Please select your plan</h5>
                    <h5>{loggedInUser.date}</h5>
                
                    <h3>{loggedInUser.from}</h3>
                    <p>To</p>
                    <h3>{loggedInUser.to}</h3>
                </div>
                <div className="vehicle">

                    <img className='car' src={data.img} alt="" />
                    <h4>{data.name}</h4>

                    <h5> <img className='person' src={data.person} alt="" /> 2</h5>
                    <h5>$ 50</h5>
                </div>
                <div className="vehicle">

                    <img className='car' src={data.img} alt="" />
                    <h4>{data.name}</h4>

                    <h5> <img className='person' src={data.person} alt="" /> 2</h5>
                    <h5>$ 50</h5>
                </div>
                <div className="vehicle">

                    <img className='car' src={data.img} alt="" />
                    <h4>{data.name}</h4>

                    <h5> <img className='person' src={data.person} alt="" /> 2</h5>
                    <h5>$ 50</h5>
                </div>
            </div>
            <div className="map">
                <Map></Map>
            </div>
        </div>
    );
};

export default Rider;