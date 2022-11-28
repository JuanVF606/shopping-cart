import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './SideBar'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = ["Ninguna Categoria","Rolls Especiales", "Rolls sin Arroz", "Rolls Apanados","Rolls Frios", "Vegi Rolls", "APPETIEZERS","Bebestibles","Salsas y Extras"]
    const alert = useAlert();
    const dispatch = useDispatch();

    const {error, success } = useSelector(state => state.newProduct);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/products');
            alert.success('Producto agregado a la tienda');
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        <Fragment>
            <MetaData title={'New Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4"><i class="fa fa-database" aria-hidden="true"></i> Nuevo Producto</h1>
                                
                                <hr />
                                <strong>Se recomienda subir imagenes hasta 100MB</strong>
                                <hr />
                                <p>Si Aparece una alerta llamada "REQUEST ENTITY TOO LARGE" </p>
                                <strong><a href ="https://www.iloveimg.com/es/comprimir-imagen/comprimir-jpg" target="_blank" rel="noreferrer noopener">Debes Comprimir imagen</a></strong>
                                <hr/>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Precio</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        min={990}
                                        max={15990}
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Breve Descripcion</label>
                                    <textarea  className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                        {categories.map(category => (
                                            <option key={category} value={category} >{category}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        required
                                    />
                                </div>


                                <div className='form-group'>
                                    <label>Imagenes</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                            required
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Selecciona una o mas imagenes
                                        </label>
                                    </div>

                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    // disabled={loading ? true : false}
                                >
                                    AGREGAR
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewProduct