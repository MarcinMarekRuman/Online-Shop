import '../styles/ProductsAdd.css';
import { useState } from 'react';

const ProductsAdd = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const productData = {
        name,
        price,
        description,
        imageURL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/AddProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                console.log('Produkt został wysłany!');
            } else {
                console.log('Błąd podczas wysyłania produktu');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };

    return (
        <div className="productsAdd-container">
            <div className="AddForm-box">
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="Change-Div">
                        <label className="edit-label">Edytuj Nazwę</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Edytuj Opis</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Edytuj Cenę</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Edytuj Zdjęcie</label>
                        <input
                            type="url"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Product-Add-Btn">
                        <button type="submit" className="Add-Btn">ADD / Edit Product</button>
                    </div>
                </form>
            </div>

            {/*<div className="Data-View-Box">*/}
            {/*    <form className="edit-form">*/}
            {/*        <div className="Data-Div">*/}
            {/*            <label className="data-label">Product:</label>*/}
            {/*            <span>{name}</span>*/}
            {/*        </div>*/}

            {/*        <div className="Data-Div">*/}
            {/*            <label className="data-label">Product Name:</label>*/}
            {/*            <span>{name}</span>*/}
            {/*        </div>*/}

            {/*        <div className="Data-Div">*/}
            {/*            <label className="data-label">Product Description:</label>*/}
            {/*            <span>{description}</span>*/}
            {/*        </div>*/}

            {/*        <div className="Data-Div">*/}
            {/*            <label className="data-label">Product Price:</label>*/}
            {/*            <span>{price}</span>*/}
            {/*        </div>*/}

            {/*        <div className="Data-Div">*/}
            {/*            <label className="data-label">Product Photo:</label>*/}
            {/*            <span>{imageURL}</span>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>
    );
};

export default ProductsAdd;
