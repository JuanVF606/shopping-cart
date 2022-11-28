import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { numberFormat } from '../product/Format'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {
    const params = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.direccion}, ${shippingInfo.comuna}, ${shippingInfo.Provincia}, ${shippingInfo.region}`

      const isPaid = paymentInfo && paymentInfo.status === "Pagado" ? true : false;

    return (
        <Fragment>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Orden # {order._id}</h2>

                  <h4 className="mb-4">Informacion de envio:</h4>
                  <p>
                    <b>Nombre:</b> {user && user.nombre_completo}
                  </p>
                  <p>
                    <b>Numero De Telefono:</b>{" "}
                    {shippingInfo && shippingInfo.numero_telefono}
                  </p>
                  <p className="mb-4">
                    <b>Direccion:</b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Precio Total:</b> ${totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Estado de Pago</h4>
                  <p className={isPaid ? "greenColor" : "redColor"}>
                    <b>{isPaid ? "PAGADO" : "NO PAGADO"}</b>
                  </p>

                  <h4 className="my-4">Estado de Orden:</h4>
                  <p
                    className={
                      order.orderStatus &&
                      String(order.orderStatus).includes("Entregado")
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>{orderStatus}</b>
                  </p>

                  <h4 className="my-4">Detalle de la Orden:</h4>

                  <hr />
                  <div className="cart-item my-1">
                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>{numberFormat(item.price)}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>Cantidad : {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails