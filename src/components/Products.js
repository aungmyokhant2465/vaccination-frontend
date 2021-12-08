import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import productService from '../services/product'
import Moment from 'react-moment';
import AlertBox from "./AlertBox";

const Products = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery()
    let history = useHistory()

    const [ products, setProducts ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ alert, setAlert ] = useState(false)
    const [ confirmId, setConfirmId ] = useState(null)
    const [ noti, setNoti ] = useState(null)

    const updateProducts = (page) => {
        productService.products(page)
            .then(res => {
                setTotal(res.counts)
                setProducts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        updateProducts(query.get('pages'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAlert = (id) => {
        setConfirmId(id)
        setAlert(true)
    }

    const handleDelete = () => {
        if(confirmId !== null) {
            productService.deleteProduct(confirmId)
            .then(result => {
                setNoti(result.message)
                setTimeout(() => {
                    setNoti(null)
                }, 3000);
                setProducts(products.filter(p => p.id !== confirmId))
                setAlert(false)
                setConfirmId(null)
            })
        }
    }

    const prev = () => {
        updateProducts(Number(query.get('pages')) - 1)
        history.push(`/admin/products?pages=${Number(query.get('pages')) - 1}`)
    }

    const next = () => {
        updateProducts(Number(query.get('pages')) + 1)
        history.push(`/admin/products?pages=${Number(query.get('pages')) + 1}`)
    }

    return (
        <div className="container">
            <AlertBox show={alert} hide={() => setAlert(false)} confirm={handleDelete} />
            {
                !alert && <div className="product-container">
                {
                    !products && <div>Loading...</div>
                }
                {
                    products && <ul>
                    {
                        products.map(product => (
                            <li key={product.id}>
                                <div>
                                    <span>{product.model}</span>
                                    <time>
                                        <span className="material-icons md-36 time">history</span>
                                        <Moment className="date" date={product.createdAt} format="MMM-DD-YYYY" />
                                    </time>
                                </div>
                                <Link to={`/admin/products/${product.id}`} className="detail-edit-link">Detail</Link>
                                <div>
                                    <img src={product.qrcode} alt="qrcode"/>
                                </div>
                                <div>
                                    <a href={product.qrcode} download={`${product.model}.png`} className="download-btn">Download</a>
                                    <div>
                                        <Link to={`/admin/products/edit/${product.id}`} className="detail-edit-link">Edit</Link> | <button className="delete-btn" onClick={() => handleAlert(product.id)} >Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                    </ul>
                }
                <div>
                    {
                        (Number(query.get('pages')) > 0) && <button onClick={prev} className="pag-btn">Previous</button>
                    }
                    {
                        !(total <= ((Number(query.get('pages')) + 1) * 5)) &&  <button onClick={next} className="pag-btn">Next</button>
                    }
                </div>
            </div>
            }
            {
                noti && <p className="noti">{noti}</p>
            }
        </div>
    )
}

export default Products