import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { numberFormat } from '../product/Format'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.19 * itemsPrice).toFixed(0))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }


    return (
        <Fragment>

            <MetaData title={'Confirm Order'} />

            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Nombre:</b> {user && user.nombre_completo}</p>
                    <p><b>Phone:</b> {user.numero_telefono}</p>
                    <p className="mb-4"><b>Direccion:</b> {`${shippingInfo.direccion}, ${shippingInfo.comuna}, ${shippingInfo.provincia}, Region ${shippingInfo.region}`}</p>

                    <hr />
                    <h4 className="mt-4"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Tu carrito:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="" height="95" width="115" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">

                                        <p>{item.quantity} x {numberFormat(item.price)} = <b> {numberFormat((item.quantity * item.price))}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">{numberFormat(itemsPrice)}</span></p>
                        <p>Costo De envio: <span className="order-summary-values">{numberFormat(shippingPrice)}</span></p>
                        <p>IVA 19%:  <span className="order-summary-values">{numberFormat(taxPrice)}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">{numberFormat(totalPrice)}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceder al Pago</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder