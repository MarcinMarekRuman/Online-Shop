
import React from 'react';
import '../../styles/Home.css';
import BackgroundPhoto from '../../Media/backgroundIMG.jpg';
import BackgroundPhoto2 from '../../Media/backgroundIMG2.jpg';


const HomePage = () => {
    return(
        <div className='home_div'>


            <div className='homeBackgroundPhoto1'>
                <img src={BackgroundPhoto} alt='BackgroundPhoto'/>
            </div>

            <div className='invite_div'>
                <h1>Hello in my Online Shop !</h1>
            </div>

            <div className='homeBackgroundPhoto2'>
                <img src={BackgroundPhoto2} alt='BackgroundPhoto'/>
            </div>


        </div>
    )
}


export default HomePage;

