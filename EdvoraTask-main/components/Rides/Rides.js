import { useApi } from '../../Context/Apihandle';
import { Ride } from './Ride';
import { NoResult } from '../NoResult/NoResult';

import  { sortByNearest } from '../../utils/CalcDist';

export const Rides = () => {
    const { user, getRides } = useApi();
    const sortN = sortByNearest( getRides(), user.station_code )
    
    return (
        <div>
            { sortN.length ? sortN.map( ( s, i ) => (
                <Ride key = { i } station_code = { user.station_code } { ...s } /> )) :
                <NoResult/>
            }
        </div>
    );
};