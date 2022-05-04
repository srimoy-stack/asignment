import { useEffect } from 'react';
import styles from './Filters.module.css';
import { useApi } from '../../Context/Apihandle';

export const DropDown = ({ setMenu }) => {
    
    const { drop_menu, control } = styles;
    const { filters, handleFilters } = useApi();

    useEffect(() => {
        
        function handleCLick( { target } ) {
            const menu = document.getElementsByClassName(drop_menu)[0];
            if( !menu.contains( target ) ) {
                setMenu( false );
            }
        }
        function handleKeyboard({ key }) {
            if( key === "Escape" ) {
                setMenu( false );
            }
        }
        //for keyboard interaction
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("click", handleCLick);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
            document.removeEventListener("click", handleCLick);
        }

    }, [ drop_menu, setMenu ]);

    return (
        <>
        {/* if the target match with option value then will diplay the ride card else will diplay no result */}
        <ul className = { drop_menu } >
            <li>Filters</li>
            
            <li>
                <select 
                onChange = { ({ target }) => handleFilters({ ...filters, state: target.value }) } 
                value = { filters.state } 
                className = { control }>
                    <option value = "">State</option>
                    <option value = "Delhi">Delhi</option>
                    <option value = "Odisha">Odisha</option>
                    <option value = "Bihar">Bihar</option>
                </select>
            </li>
            
            <li>
                <select 
                onChange = { ({ target }) => handleFilters({ ...filters, city: target.value }) }
                value = { filters.city } 
                className = { control }>
                    <option value = "">City</option>
                    <option value = "New Delhi">New Delhi</option>
                    <option value = "Marhaura">Marhaura</option>
                    <option value = "Brahmapur">Brahmapur</option>
                </select>
            </li>
        </ul>
        </>
    );
};