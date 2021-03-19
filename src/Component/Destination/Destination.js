import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TakeRide from '../TakeRide/TakeRide';
import './Destination.css';
import fakeData from '../fakeData/data.json'
import { UserContext } from '../../App';


const Destination = () => {
    const { key } = useParams();
    // console.log(key)

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const [location, setLocation] = useState({})
    // console.log(location)
    const [destination, setDestination] = useState({
        from: '',
        to: ''
    });

    const [vehicle, setVehicle] = useState([]);
    // console.log(vehicle);


    useEffect(() => {
        setVehicle(fakeData)
    }, []);


    const handleDestination = () => {
        let userLocation = { ...location };
        userLocation = destination;
        setLocation(userLocation)
        const newRide = vehicle.filter(ride => ride.key === key);
        setVehicle(newRide);

        const destinationPlace = { ...loggedInUser };
        destinationPlace.from = userLocation.from;
        destinationPlace.to = userLocation.to;
        setLoggedInUser(destinationPlace);

    }


    const pickFrom = (e) => {
        if (e.target.name === 'from') {
            const fromData = e.target.value;
            const data = { ...destination };
            data.from = fromData;
            setDestination(data)

        }
        if (e.target.name === 'to') {
            const fromData = e.target.value;
            const data = { ...destination };
            data.to = fromData;
            setDestination(data)


        }
    }


    return (
        <div className='App'>
            <h3>This is destination</h3>


            <div className="destination">
                <div className="pick">
                    <div>
                        <form action="">
                            <p>Pick From</p>
                            <input onBlur={pickFrom} type="text" name='from' required />
                            <p>Pick To</p>
                            <input onBlur={pickFrom} type="text" name='to' required />
                            <br />
                        </form>
                    </div>
                    <div>
                        <form action="">
                            <p>From: {location.from}</p>
                            <p>To: {location.to}</p>
                        </form>
                    </div>
                    <br />

                    <button onClick={handleDestination}   ><Link to={"/rider/" + key}>
                        Search
                </Link ></button>
                    {
                        <TakeRide data={vehicle} location={location}></TakeRide>
                    }

                </div>

            </div>



        </div>
    );
};

export default Destination;