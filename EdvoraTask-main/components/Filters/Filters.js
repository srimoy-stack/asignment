import { useState } from 'react';
import Image from 'next/dist/client/image';
import sort from '../../public/assets/sort.png';
import styles from './Filters.module.css';
import { DropDown } from './DropDown';
import { useApi } from '../../Context/Apihandle';

export const Filters = () => {
    const { 
        btn_filter,  
        fltr_cm, 
        filter_relative,
        links,
        active,
        icon,
    } = styles;

    const [ showMenue, setShowMenu ] = useState(false);
    const { status, handleStatus, selectUpcomingRides, selectPastRides } = useApi()

    // handle classes
    const nearestRide = status === "" ? active : null
    const upcoming = status === "upcoming" ? active : null
    const past = status === "past" ? active : null

    // get rides length
    const upcomingCount = selectUpcomingRides().length;
   
    const pastCount = selectPastRides().length;
    
    return (
        <div>
            <div className = { fltr_cm }>
                <ul className = { links } >
                    <li 
                    onClick = { () => handleStatus("") }
                    className = { nearestRide }>
                        Nearest rides
                    </li>

                    <li 
                    onClick = { () => handleStatus("upcoming") }
                    className = { upcoming }>
                        <span>Upcoming rides {`(${ upcomingCount })`}</span>
                    </li>

                    <li 
                    onClick = { () => handleStatus("past") }
                    className = { past }>
                        <span>Past rides {`(${ pastCount })`}</span>
                    </li>
                </ul>

                <div className = { filter_relative }>
                    <div 
                    onClick = { () => setShowMenu( prev => !prev ) }
                    className = { btn_filter } 
                    role = "button">
                        <span className = { icon }>
                            <Image src={sort} />
                        </span>
                        Filters
                    </div>
                    { 
                        showMenue ? 
                        <DropDown setMenu = { setShowMenu } /> : <></> 
                    }
                </div>
            </div>

        </div>
    );
};