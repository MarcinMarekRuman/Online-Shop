import '../styles/FAQ.css'
import {useEffect, useState} from "react";
const FAQ = () =>{

    const [FAQData, setFAQData] = useState([]);


    useEffect(() => {
        const fetchHeaderContent = async () => {
            try {
                const response = await fetch('/FAQData.json');
                if (!response.ok) {
                    console.log('No response');
                }
                const data = await response.json();
                setFAQData(data);
                console.log('FAQ Data:', data);
            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        };
        fetchHeaderContent();
    }, []);

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return(
        <div className='FAQ-Container'>
            <div className='FAQ-List'>
                {FAQData.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <div
                            className="faq-question"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                        </div>
                        <div className={`faq-answer ${activeIndex === index ? "open" : ""}`}>
                            {faq.answer}
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}



export default FAQ;