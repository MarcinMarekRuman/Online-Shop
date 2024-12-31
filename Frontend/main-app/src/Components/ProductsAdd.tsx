import '../styles/ProductsAdd.css';
import {useEffect, useState} from 'react';
import {FiEdit} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";

const ProductsAdd = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editImageURL, setEditImageURL] = useState('');
    const [products, setProducts] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [hiddenEdit, setHiddenEdit] = useState(false);
    const [prodId, setProdId] = useState(null);
    const [prodIdEdit, setProdIdEdit] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);




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
            setIsPopupVisible(false);
        };

        const hiddenEditPopup = () => {
            setHiddenEdit(false);
            setIsPopupVisible(false);
        };

        const showPopup = (id) => {
        setHidden(true);
        setIsPopupVisible(true);
        setProdId(id);
        console.log(id);
        };

        const showEditPopup = (id, name, desctiption, price, imageURL) => {
            setHiddenEdit(true);
            setIsPopupVisible(true);
            setProdIdEdit(id);
            setEditName(name)
            setEditDescription(desctiption)
            setEditPrice(price)
            setEditImageURL(imageURL)
            console.log(id);
        };

    useEffect(() => {
        if (isPopupVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }


        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupVisible]);

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

    const editProduct = async (ID) => {
        try {
            const response = await fetch(`http://localhost:3000/editProduct/${ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ editName, editPrice, editDescription, editImageURL })
            });

            if (response.ok) {
                console.log(`Product with ID ${ID} has been edited!`);
            } else {
                console.log('Błąd podczas edycji produktu');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };


        const onClickDelete = (id) =>{
            deleteProduct(id);
            hiddenPopup();
            window.location.href = '/ProductsAdd';
        }

        const onClickEdit = (id) => {
            editProduct(id);
            hiddenEditPopup();
            window.location.href = '/ProductsAdd';
        }

    return (
        <div className="productsAdd-container">
            <div className="AddForm-box">
                <p className='addProductTitle'>Add Product</p>
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="Change-Div">
                        <label className="edit-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="edit-input"
                        />
                    </div>

                    <div className="Change-Div">
                        <label className="edit-label">Add file with photo of product</label>
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
                    <h3 className='products-text'>Products</h3>

                    <div className="products-boxAdmin">
                        {products.map((product) => (

                            <div key={product.id} className="product-cardAdmin">
                                <img src={product.imageURL} alt={product.name} className="product-image"/>
                                <h2>{product.name}</h2>
                                <p className="descriptionsOfProduct">{product.description}</p>
                                <h3>Price: ${product.price}</h3>
                                <div className='product-buttons'>
                                    <button className='product-button edit' onClick={() => showEditPopup(
                                        product._id,
                                        product.name,
                                        product.description,
                                        product.price,
                                        product.imageURL)}> <FiEdit/></button>
                                    <button className='product-button delete' onClick={() => showPopup(product._id)}>
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

                    {hiddenEdit && (<div className="editPopup">

                        <div className="EditForm-box">
                            <form onSubmit={handleSubmit} className="edit-form">
                                <p className="editPara">
                                    Edit Product: {prodIdEdit}
                                </p>
                                <div className="Change-Div">
                                    <label className="edit-label">Name</label>
                                    <input
                                        type="text"
                                        value={editName}
                                        placeholder={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        required
                                        className="edit-input"
                                    />
                                </div>

                                <div className="Change-Div">
                                    <label className="edit-label">Description</label>
                                    <input
                                        type="text"
                                        value={editDescription}
                                        placeholder={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        required
                                        className="edit-input"
                                    />
                                </div>

                                <div className="Change-Div">
                                    <label className="edit-label">Price</label>
                                    <input
                                        type="number"
                                        value={editPrice}
                                        placeholder={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}
                                        required
                                        className="edit-input"
                                    />
                                </div>

                                <div className="Change-Div">
                                    <label className="edit-label">Add file with photo of product</label>
                                    <input
                                        type="string"
                                        value={editImageURL}
                                        placeholder={editImageURL}
                                        onChange={(e) => setEditImageURL(e.target.value)}
                                        required
                                        className="edit-input"
                                    />
                                </div>
                            </form>
                        </div>
                            <div className="editButtons">
                            <button className="editConfirm editButton"
                                            onClick={() => onClickEdit(prodIdEdit)}> Edit
                                    </button>
                                    <button onClick={hiddenEditPopup}
                                            className="editCancel editButton"> Cancel
                                    </button>

                                </div>

                        </div>
                    )}

                </div>
            </div>

        </div>
    )};

        export default ProductsAdd
