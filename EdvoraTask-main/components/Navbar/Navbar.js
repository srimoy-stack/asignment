import Image from 'next/image';
import styles from './Navbar.module.css';
import logoImg from '../../public/assets/logo.svg';
import { useApi } from '../../Context/Apihandle';


export const NavBar = ({}) => {

    // style variables
    const { logo,uname,avatar,row,navbar } = styles;
    const { user } = useApi();
    return (
        <nav className = { navbar } >
            <div className = "container">
                <div className = { row }>                   
                    <div className = {logo} >
                        <Image src = { logoImg} alt = "logo" />
                    </div>
                     {
                        <div className = { row }>
                        <p className = { uname } >{user.name}</p>

                        <div className = { avatar } >
                            <img src ={user.url} alt = "avatar" />
                        </div>
                       </div>
                    } 
                </div>
            </div>
        </nav>
    );
}
