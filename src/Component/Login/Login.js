import React, { useContext, useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

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
        success: false
    })
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
                const signedInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email

                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
                // console.log(res.user);

            }).catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // console.log(errorCode, errorMessage)
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
                    console.log(res)
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
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
                console.log(res)
                const { displayName, email } = res.user;
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

    return (
        <div className='App'>
            <h3>This is login section</h3>

            <div className="main-log">
                <div className="log-in">


                    <h3>{newUser ? "Create an account" : "Login"}</h3>
                    <form action="">
                        {newUser && <input type="text" name='name' placeholder='Name' onBlur={handleBlur} required />}
                        <br />
                        <input type="text" name='email' onBlur={handleBlur} placeholder='Username or Email' required />
                        <br />
                        <input type="password" name="password" onBlur={handleBlur} id="" required placeholder='Password' />
                        <br />
                        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} onClick={handleSubmit} />
                        <br />
                        <h4>{newUser ? "Already have an account?" : "Don't have an account?"} <button onClick={() => setNewUser(!newUser)}>{newUser ? 'Login' : 'Create an account'}</button> </h4>
                    </form>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "Logged In"} Successfully</p>}
                </div>
            </div>
            <div className="other-sign-in">
                <button onClick={handleFbSignIn}>Continue with Facebook</button>
                <br />
                <button onClick={handleGoogleSignIn}>Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;