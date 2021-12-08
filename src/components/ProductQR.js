import React, { useEffect, useState } from "react";
import productService from "../services/product";
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constant'

const ProductQR = () => {
    const [ product, setProduct ] = useState(null)
    const params = useParams()

    useEffect(() => {
        productService.product(params.id)
            .then(res => {
                setProduct(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [params.id])

    if(!product) {
        return (
            <div>
                <em>Loading...</em>
            </div>
        )
    }

    return (
        <div className="landing-container">
            <div className="detail-container">
                <div>
                    <h2>Product Detail</h2>
                </div>
                <div className="img-rounded-container">
                    <img className="img-rounded" src={`${BACKEND_URL}/${product.photo}`} alt="a product" />
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Model</th>
                                <td>{product.model}</td>
                            </tr>
                            <tr>
                                <th>Width</th>
                                <td>{product.width} inches</td>
                            </tr>
                            <tr>
                                <th>Height</th>
                                <td>{product.height} inches</td>
                            </tr>
                            <tr>
                                <th>Weight</th>
                                <td>{product.weight} pounds</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{product.price} USD</td>
                            </tr>
                            <tr>
                                <th>Brand</th>
                                <td>{product.brand}</td>
                            </tr>
                            <tr>
                                <th>Detail</th>
                                <td>{product.details}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <img src={product.qrcode} alt="qrcode" />
                </div>
            </div>
        </div>
    )
}

export default ProductQR