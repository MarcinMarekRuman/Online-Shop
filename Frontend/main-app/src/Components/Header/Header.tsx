
import { useEffect, useState } from "react";
import { HeaderContent, NavigationItem } from './header.interface';
import '../../styles/Header.css'

// @ts-ignore
import LogoPhoto from '../../Media1/shopLogo.jpeg';

const Header = () => {
    const [headerData, setHeaderData] = useState<HeaderContent | null>(null);
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState(false);
    const [adminRole, setAdminRole] = useState(false);


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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/userCheck', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    console.log('No response');
                }

                const data = await response.json();
                setUserData(data);


                if (data.userData) {
                    setRole(true);
                    if (data.userData.role === 'admin') {
                        setAdminRole(true);
                    }
                } else {
                    setRole(false);
                    setAdminRole(false);
                }

            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        };
        fetchUserData();
    }, []);




    if (!headerData) return null;

    const redirect = () =>{
        window.location.replace('/');
    }

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

    if(!userData || userData)
    return (
        <div className='headerDiv'>
            <header>
                <div className="logoDiv" onClick={redirect}>
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


                {!role && (<div>
                    <a href='/login'>LOGIN</a>
                </div>)}


                {adminRole && (<div className="AdminPanel">
                    <a href='/Admin'> Admin Panel </a>
                </div>)}
                {role && (<div className='roleDiv'>
                    <a href='/cart'>My Cart</a>
                    <button className='logout' onClick={logout}>Logout</button>
                </div>
                )}


            </header>
        </div>
    );
}

export default Header;