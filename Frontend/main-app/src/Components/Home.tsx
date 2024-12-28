import '../styles/Home.css';
import { useState, useEffect } from 'react';


const carouselImages = [

    '/Carousel_Photos/photo1.jpg',
    '/Carousel_Photos/photo2.jpg',
    '/Carousel_Photos/photo3.jpg',
    '/Carousel_Photos/photo4.jpeg',
    '/Carousel_Photos/photo5.jpg'

];


const HomePage = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
    };


    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, []);






    return(

        <div className='home_div'>

            <div className='carousel'>
                <button className="prev" onClick={prevSlide}></button>
                <img src={carouselImages[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image"/>
                <button className="next" onClick={nextSlide}></button>
            </div>

            <div className=' first'>
                    <div className='fadeDiv1'>
                        <div className='firstDescription'>
                            <p>HAUISDHBUIASBDUIASDIOASDBASUDBIASD</p>
                        </div>
                        <div className='firstFadeBlock'>
                            <div className='firstBlock'>
                                <img src='/FadesPhotos/photo2.jpg' alt='FadePhoto' className="fadeImage1" />
                            </div>
                        </div>
                    </div>
            </div>
            <div className='second'>
                <div className='fadeDiv2'>
                    <div className='secondFadeBlock'>
                        <div className='secondBlock'>
                            <img src='/FadesPhotos/photo2.jpg' alt='FadePhoto' className="fadeImage2"/>
                        </div>
                    </div>
                    <div className='secondDescription'>
                        <p>HAUISDHBUIASBDUIASDIOASDBASUDBIASD</p>
                    </div>

                </div>
            </div>

        </div>
    )
}


export default HomePage;

