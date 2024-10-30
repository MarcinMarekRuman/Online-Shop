import { useEffect, useState } from "react";
import '../../styles/Footer.css'
import {Contact} from './footer.interface';


const Footer = () => {
    const [footerData, setFooterData] = useState<Contact | null>(null);

    useEffect(() => {
        const fetchFooterContact = async () =>{
            try{
                const response = await fetch('/footerData.json');
                if(!response.ok){
                    throw new Error('Error');
                }
                const data = await response.json();
                setFooterData(data);
            }
            catch(error){
                console.log('Error fetching header content:', error);
            }
        }
        fetchFooterContact();
    }, []);
    if (!footerData) return null;



    return(

        <footer>
            <div className='footer_div'>
                <div className="temp"></div>
                <div className="copyRight">
                    <p>
                        Copyright&copy;2024 All rights reserved. Made by
                    </p>
                    <span> Marcin Ruman</span>
                </div>
                <div className="footerContact">
                    <p className="title">{footerData.contact.title}</p>
                    <p className="phone"> 📱 {footerData.contact.phone}</p>
                    <p className="location">{footerData.contact.location}</p>
                </div>

            </div>
        </footer>
    )
}


export default Footer;