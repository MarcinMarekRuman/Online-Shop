

import { useEffect, useState } from "react";
import { HeaderContent, NavigationItem } from './header.interface';
import '../../styles/Header.css'
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
                console.log('Fetched Header content:', data);
            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        };
        fetchHeaderContent();
    }, []);

    console.log(headerData);

    if (!headerData) return null;

    return (
        <header>
            <div className="title">{headerData.title}</div>
            <ul>
                {headerData.navigation.map((navigator: NavigationItem) => (
                    <li key={navigator.label}>
                        <a href={navigator.href} className={navigator.label}>
                            {navigator.label}
                        </a>
                    </li>
                ))}
            </ul>
        </header>
    );
}

export default Header;