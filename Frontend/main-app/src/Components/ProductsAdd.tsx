import '../styles/ProductsAdd.css';
import {useEffect, useState} from 'react';
import {FiEdit} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";

const ProductsAdd = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [products, setProducts] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [prodId, setProdId] = useState(null);

    const navigate = useNavigate();



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
                credentials: 'include',
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                console.log('Produkt został wysłany!')
                window.location.reload();
            } else {
                console.log('Błąd podczas wysyłania produktu');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };



        const hiddenPopup = () => {
            setHidden(false);
        };

        const showPopup = (id) => {
            setHidden(true);
            setProdId(id);
            console.log(id);
        };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products',{
                    credentials: 'include',
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching header content:', error);
            }
        };
        fetchProducts();
    }, []);

    if (!products) return null;




        const deleteProduct = async (prodID) => {
            try {
                const response = await fetch(`http://localhost:3000/deleteProduct/${prodID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    console.log(`Produkt o ID ${prodID} został usunięty!`);
                } else {
                    console.log('Błąd podczas usuwania produktu');
                }
            } catch (error) {
                console.error('Wystąpił błąd:', error);
            }
        };


        const onClickDelete = (id) =>{
            deleteProduct(id);
            hiddenPopup();
            navigate('/products');
        }


        return (
        <div className="productsAdd-container">
            <div className="AddForm-box">
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="Change-Div">
                        <label className="edit-label">Nazwa</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Opis</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Cena</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Dodaj plik ze zdjęciem</label>
                        <input
                            type="string"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Product-Add-Btn">
                        <button type="submit" className="Add-Btn">Add Product</button>
                    </div>
                </form>
            </div>

            <div className="listProductsToEdit">
                <div className="products-containerAdmin">
                    <h3 className='products-text'>Zapoznaj się z naszą ofertą</h3>

                    <div className="products-boxAdmin">
                        {products.map((product) => (

                            <div key={product.id} className="product-cardAdmin">
                                <img src={product.imageURL} alt={product.name} className="product-image"/>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <h3>Price: ${product.price}</h3>
                                <div className='product-buttons'>
                                    <a href='/ProductsAdd' className='product-button'> <FiEdit/></a>
                                    <button className='product-button' onClick={() => showPopup(product._id)}>
                                        <RiDeleteBin6Line/></button>
                                </div>
                            </div>
                        ))}


                    </div>

                    {hidden && (<div className="deletePopup">
                            <div className="deleteTextArea">
                                <p className="deletePara">
                                    Are you sure, you want to delete ?
                                </p>
                            </div>
                            <div className="deleteButtons">
                                <button className="deleteConfirm deleteButton"
                                        onClick={() => onClickDelete(prodId)}> Confirm
                                </button>
                                <button onClick={hiddenPopup}
                                        className="deleteCancel deleteButton"> Cancel
                                </button>

                            </div>


                        </div>
                    )}

                </div>
            </div>

        </div>
    );
};

export default ProductsAdd;
