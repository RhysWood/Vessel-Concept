import {useState} from 'react';
import '../styles/Navbar.css';
import { MenuItems } from './Menuitems';
import VesselLogo from '../imgs/vessel-logo.png';

export default function Navbar() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked)
    }
    

    return(
        <>
            <nav className='NavbarItems'>
                <h1 className='navbar-logo'><img className='vlogo' src={VesselLogo} alt='Vessel Logo'></img></h1>
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
            </nav>
        </>
    );
}