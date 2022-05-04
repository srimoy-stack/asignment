import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const ApiContext = React.createContext();

export const useApi = () => useContext( ApiContext );

function ApiProvider({ children }) {
    
    const [ user, setUser ] = useState({});
    const [ ride, setRide ] = useState([]); 
    const [ filters, setFilters ] = useState({ state:"", city: "" });
    const [ status, setStatus ] = useState(""); // upcoming, past

    const url="https://assessment.api.vweb.app/rides";
    const headers = {
        "Content-Type": "application/json"
       
      };
  useEffect(() => {
        const loadData= async ()=> {
             const respUser= await axios.get('https://assessment.api.vweb.app/user');
              
             const respRide= await axios.get(url,{headers});

             //const test = await respRide.json();
           setUser(respUser.data);
           setRide(respRide.data);
        }
        loadData()
        .catch(console.error);
    }, [])

    //  Upcoming ride: It shows all rides which has date in future. 
    //we have to filter the data by applying filter on state and city
    function selectUpcomingRides() {
        const date = new Date();
        const now = date.getTime();
          
        return ride.filter( obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity  = filters.city  ? obj.city === filters.city : !filters.city;
            const dt = new Date(obj.date);
            let d = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
           console.log(filterCity);
            return ( d.getTime()>= now) && filterState && filterCity
        });
    }


     //Past ride: It shows all rides which has date in past
     //we have to filter the data by applying filter on state and city
    function selectPastRides() {
        const date = new Date();
        const now = date.getTime();

        return ride.filter(obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity = filters.city ? obj.city === filters.city : !filters.city;
            const dt = new Date(obj.date);
            let d = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
           //console.log(d.getTime());
            return (d.getTime() < now) && filterState && filterCity;
        });
    }


    function selectAllRides() {
        return ride.filter( obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity  = filters.city  ? obj.city === filters.city : !filters.city;
    
            return filterState && filterCity
        });
    }

    
    /* return Ride by selected ( status ) // upcoming, past and "" ( for all rides )  
     * Apply the Filter by: state and city*/

    const getRides = () => {

        switch(status) {
            case "upcoming": 
            return selectUpcomingRides();

            case "past": 
            return selectPastRides();

            default: 
            return selectAllRides();
        }
    }

    //now we have to handle status of state and filter state
    const handleStatus = ( state ) => {
        setStatus( state );
        //console.log();
    }
    const handleFilters = ( obj ) => {
        setFilters( obj );
        console.log(obj);
    } 

    
    const value = {
        handleStatus,
        handleFilters,
        selectUpcomingRides,
        selectPastRides,
        getRides,
        filters,
        status,
        ride,
        user,
    };


    return (
        <ApiContext.Provider value = { value } >
            { children }
        </ApiContext.Provider>
    )
}

export default ApiProvider;