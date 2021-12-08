import React, { useState } from 'react'
import productService from '../services/product'

const ProductForm = () => {

    const [ model, setModel ] = useState('')
    const [ details, setDetails ] = useState('')
    const [ width, setWidth ] = useState('')
    const [ height, setHeight ] = useState('')
    const [ weight, setWeight ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ brand, setBrand ] = useState('')
    const [ photo, setPhoto ] = useState('')
    const [ progress, setProgress ] = useState(false)
    const [ noti, setNoti ] = useState({})

    const handleForm = async (e) => {
        e.preventDefault()
        let newProduct = {
            model, details, width, height, weight, price, brand, photo: null
        }
        setProgress(true)
        try {
            if(photo) {
                const formData = new FormData()
                formData.append('file', photo)
                const uploadedFile = await productService.imageUpload(formData)
                if(uploadedFile.error === true) {
                    setTimeout(() => {
                        setNoti({})
                    }, 3000);
                    setNoti(uploadedFile)
                    return
                }
                newProduct= { ...newProduct, photo: uploadedFile.file.filename }
            }
            const result = await productService.createProduct(newProduct)
            setTimeout(() => {
                setNoti({})
            }, 3000);
            setNoti({message: result.message, error: false})
            setModel('')
            setWidth('')
            setHeight('')
            setWeight('')
            setPrice('')
            setBrand('')
            setPhoto('')
            setDetails('')
        } catch (err) {
            console.error(err)
        }
        setProgress(false)
    }

    return (
        <div className="container">
            <div className="form-header">
                <span><span className="material-icons md-36">add_circle_outline</span><h2>Create New Product</h2></span>
            </div>
            <div className="form-main">
                <section>
                    <h3><span className="material-icons md-36 info">info</span> Enter information</h3>
                    <form onSubmit={handleForm} id="product-form" encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="photo">Photo :</label>
                            <input id="photo" name="photo" type="file" placeholder="Enter your image"
                            onChange={({target}) => setPhoto(target.files[0])} accept="image/*"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="model">Model :</label>
                            <input id="model" name="model" type="text" placeholder="Enter product model"
                            value={model} onChange={({target}) => setModel(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="width">Width :</label>
                            <input id="width" name="width" type="number" placeholder="Enter product width in inches"
                            value={width} onChange={({target}) => setWidth(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="height">Height :</label>
                            <input id="height" name="height" type="number" placeholder="Enter product height in inches"
                            value={height} onChange={({target}) => setHeight(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight">Weight :</label>
                            <input id="weight" name="weight" type="number" placeholder="Enter product wight in pound"
                            value={weight} onChange={({target}) => setWeight(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price :</label>
                            <input id="price" name="price" type="number" placeholder="Enter price in dollar"
                            value={price} onChange={({target}) => setPrice(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="brand">Brand :</label>
                            <input id="brand" name="brand" type="text" placeholder="Enter product brand"
                            value={brand} onChange={({target}) => setBrand(target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="detail">Detail</label>
                            <textarea id="detail" value={details} onChange={({target}) => setDetails(target.value)}>
                            </textarea>
                        </div>
                    </form>
                    <div className="generator-group">
                        <span className="material-icons md-36 form">qr_code_2</span>
                        <button disabled={progress} type="submit" form="product-form" className="btn">
                            {
                                !progress ? 'QR Generate': 'Processing...'
                            }
                        </button>
                    </div>
                </section>
            </div>
            {
                noti.error === false && <p className="noti">{noti.message}</p>
            }
            {
                noti.error === true && <p className="noti err">{noti.message}</p>
            }
        </div>
    )
}

export default ProductForm
