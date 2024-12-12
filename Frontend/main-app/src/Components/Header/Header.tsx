
import { useEffect, useState } from "react";
import { HeaderContent, NavigationItem } from './header.interface';
import '../../styles/Header.css'

// @ts-ignore
import LogoPhoto from '../../Media1/shopLogo.jpeg';

const Header = () => {
    const [headerData, setHeaderData] = useState<HeaderContent | null>(null);

    useEffect(() => {
        const fetchHeaderContent = async () => {
            try {
                const response = await fetch('/headerData.json');
                if (!response.ok) {
                    throw new Error('Error');
                }
                const data = await response.json();
                setHeaderData(data);
            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        };
        fetchHeaderContent();
    }, []);


    if (!headerData) return null;


    const logout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Logout successfully');
                window.location.href = '/';
            } else {
                console.log('Logout error');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <header>
            <div className="logoDiv">
                <img className="logo" src={LogoPhoto} alt="Logo"/>
                <p className="headerTitle">
                    {headerData.title}
                </p>
            </div>
            <ul>
                {headerData.navigation.map((navigator: NavigationItem) => (
                    <li key={navigator.label}>
                        <a href={navigator.href} className={navigator.label}>
                            {navigator.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="AdminPanel">
                <a href='/Admin'>  Admin Panel </a>
            </div>
            <button className='logout' onClick={logout}>Logout</button>

        </header>
    );
}

export default Header;