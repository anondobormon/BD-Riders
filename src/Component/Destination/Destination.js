import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TakeRide from '../TakeRide/TakeRide';
import './Destination.css';
import fakeData from '../fakeData/data.json'
import { UserContext } from '../../App';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Destination = () => {
    const { key } = useParams();
    // console.log(key)

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const [location, setLocation] = useState({})
    console.log(location); 

    const [destination, setDestination] = useState({
        from: '',
        to: '',
        date:''
    });

    const [vehicle, setVehicle] = useState([]);
    // console.log(vehicle);


    useEffect(() => {
        setVehicle(fakeData)
    }, []);


    const handleDestination = () => {
        let userLocation = { ...location };
        userLocation = destination;
        setLocation(userLocation);
        // console.log(userLocation)
        const newRide = vehicle.filter(ride => ride.key === key);
        setVehicle(newRide);

        const destinationPlace = { ...loggedInUser };
        destinationPlace.from = userLocation.from;
        destinationPlace.to = userLocation.to;
        destinationPlace.date = userLocation.date;
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
        if(e.target.name === 'date'){
            const fromData = e.target.value;
            const data = { ...destination };
            data.date = fromData;
            setDestination(data)
        }
    }


    


    return (
        <div>


            <div className="destination">
                <div className="pick align-middle">
                    <div className='destination-form'>
                       
                        <form action="">
                            <p>From</p>
                            <input onBlur={pickFrom} className='inputform form-control' placeholder='From' type="text" name='from' required />
                            <p>To</p>
                            <input onBlur={pickFrom} className='inputform form-control' placeholder='To' type="text" name='to' required />
                            <br />
                        </form>
                    </div>

                    <input type="date" onBlur={pickFrom} name="date" id=""/>

                    <button onClick={handleDestination} className='btn btn-warning'  ><Link className='search' to={"/rider/" + key}>
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