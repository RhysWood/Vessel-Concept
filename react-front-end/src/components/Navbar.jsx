import {useState} from 'react';
import '../styles/Navbar.css';
import { MenuItems } from './Menuitems';
import { Link } from "react-router-dom";
import VesselLogo from '../imgs/vessel-logo.png';
import Button from './Button';
import { useRecoilState } from 'recoil';
import profileState from './atoms';
import Logout from './Logout';

export default function Navbar() {
    const [clicked, setClicked] = useState(false);
    const [profile] = useRecoilState(profileState);
    const handleClick = () => {
        setClicked(!clicked)
    }
    
    const conditionalRender = () => {
        if (profile.length === 0) {
            return (
                <>
                     <Link to='/register'>
                        <Button>Sign up</Button>
                    </Link>
                </>
            )
        } else {
            return (
                <>
                    <p>{`Hello ${profile.first_name}`}</p>
                    <Logout />
                </>
            )
        }
    }

    return(
        <>
            <nav className='NavbarItems'>
            <h1 className='navbar-logo'>
                <Link to='/'>
                <img className='vlogo' src={VesselLogo} alt='Vessel Logo'>

                </img>
                </Link>
            </h1>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index ) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
                {conditionalRender()}
            </nav>
        </>
    );
}