import React, { useContext, useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Facebook from '../../images/fb.jpg';
import Google from '../../images/gg.jpg'



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        Photo: '',
        password: '',
        error: '',
        from: '',
        to: '',
        date:'',
        success: false
    });

    console.log(user);




    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    var googleProvider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleGoogleSignIn = () => {
        console.log('clicked')
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                console.log(res.user)
                const signedInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
    }

    const handleBlur = (e) => {
        let fieldValid = true;
        if (e.target.name === 'email') {
            fieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.password === 'password') {
            const passwordLength = e.target.value > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            fieldValid = passwordLength && passwordNumber
        }
        if (e.target.name === 'name') {
            fieldValid = e.target.value;
        }
        if (fieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        // console.log('clicked')
        // console.log(user.email, user.password)
        if (newUser && user.password && user.email) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // console.log(res)
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    // console.log(newUserInfo);
                    setUser(newUserInfo)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }
        if (!newUser && user.password && user.email) {
            console.log(user.email, user.password, user.displayName)
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {

                    const newUserInfo = { ...user };
                    console.log(newUserInfo)
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    console.log(newUserInfo);
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then(res => {
                const { displayName, email } = res.user;
                console.log(res.user)
                const signedInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email

                }
                setUser(signedInUser);
                console.log(signedInUser)
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
    }

    return (
        <div className='App'>


            <div className="main-log">
                <div className="log-in">


                    <h3>{newUser ? "Create an account" : "Login"}</h3>
                    <form action="">
                        {newUser && <input className='form-control' type="text" name='name' placeholder='Name' onBlur={handleBlur} required />}
                        
                        <br />
                        <input className='form-control' type="text" name='email' onBlur={handleBlur} placeholder='Username or Email' required />
                        
                        <br />
                        <input className='form-control' type="password" name="password" onBlur={handleBlur} id="" required placeholder='Password' />
                        <br/>
                        {newUser && <input className='form-control' type="text" name='confirm-password' placeholder='Confirm Password' onBlur={handleBlur} required />}
                        

                        <div className="forget">
                            
                            <label htmlFor="remember"> <input type="checkbox" name="remember" id="" /> Remember Me</label>
                            <p>Forget Password</p>
                        </div>

                        <input  className='btn btn-warning' type="submit" value={newUser ? 'Sign Up' : 'Login'} onClick={handleSubmit} />
                        
                        <br />
                        <h5>{newUser ? "Already have an account?" : "Don't have an account?"} <button className='have-account' onClick={() => setNewUser(!newUser)}>{newUser ? 'Login' : 'Create an account'}</button> </h5>
                    </form>


                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "Logged In"} Successfully</p>}
                </div>

                <p>Or</p>
                <div className="other-sign-in">
                    <button className='sign-In-btn' onClick={handleFbSignIn}><img src={Facebook} alt=""/> Continue with Facebook</button>
                    <br />
                    <br/>
                    <button className='sign-In-btn' onClick={handleGoogleSignIn}><img src={Google} alt=""/> Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;