import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Component/RideBy/Home';
import Destination from './Component/Destination/Destination';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFount/NotFound';
import PrivetRoute from './Component/PrivetRoute/PrivetRoute';
import Contact from './Component/Contact/Contact';
import Blog from './Component/Blog/Blog';
import Rider from './Component/TakeRide/Rider';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className='App'>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route path='/home'>
              <Home></Home>
            </Route>

            <PrivetRoute path='/destination/:key'>
              <Destination></Destination>
            </PrivetRoute>
            <PrivetRoute path='/destination'>
              <Destination></Destination>
            </PrivetRoute>

            <Route path='/login'>
              <Login></Login>
            </Route>

            <Route path='/contact'>
              <Contact></Contact>
            </Route>

            <Route path='/blog'>
              <Blog></Blog>
            </Route>
            <Route path='/rider/:key'>
              <Rider></Rider>
            </Route>
            <Route exact path='/'>
              <Home></Home>
            </Route>

            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
