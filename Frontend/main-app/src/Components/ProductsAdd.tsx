import '../styles/ProductsAdd.css'



    const ProductsAdd = () => {




        return (
            <div className="productsAdd-container">
                <div className='AddForm-box'>
                    <form className='edit-form'>
                        <div className='Change-Div'>
                            <label className='edit-label'>Edytuj Nazwę</label>
                            <input type='string'
                                   value={''}
                                   onChange={ () =>{}}
                                   required
                                   className='edit-input'
                            />

                        </div>
                        <div className='Change-Div'>
                            <label className='edit-label'>Edytuj Opis</label>
                            <input type='string'
                                   value={''}
                                   onChange={ () =>{}}
                                   required
                                   className='edit-input'
                            />

                        </div>
                        <div className='Change-Div'>
                            <label className='edit-label'>Edytuj Zdjęcie</label>
                            <input type='string'
                                   value={''}
                                   onChange={ () =>{}}
                                   required
                                   className='edit-input'
                            />

                        </div>
                        <div className='Change-Div'>
                            <label className='edit-label'>Edytuj Cenę</label>
                            <input type='string'
                                   value={''}
                                   onChange={() => {
                                   }}
                                   required
                                   className='edit-input'
                            />

                        </div>

                    </form>
                </div>
                <div className='Data-View-Box'>
                    <form className='edit-form'>
                        <div className='Data-Div'>
                        <label className='data-label'>Product:</label>
                            <span>dane</span>


                        </div>

                        <div className='Data-Div'>
                            <label className='data-label'>Product Name</label>
                            <span>dane</span>

                        </div>
                        <div className='Data-Div'>
                            <label className='data-label'>Product Description:</label>
                            <span>dane</span>

                        </div>
                        <div className='Data-Div'>
                            <label className='data-label'>Product Photo:</label>
                            <span>dane</span>

                        </div>
                        <div className='Data-Div'>
                            <label className='data-label'>Product Price:</label>
                            <span>dane</span>

                        </div>

                    </form>

                </div>

                <div className='Product-Add-Btn'>
                    <button className='Add-Btn'>ADD / Edit Product</button>
                </div>

            </div>

        )
    }


export default ProductsAdd;