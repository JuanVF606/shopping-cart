import React, { Fragment, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";

import { useNavigate } from "react-router-dom";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(createOrder(order));
    dispatch(clearCart(cartItems));
    navigate("/success");
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Informacion de la tarjeta</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Numero</label>
              <input
                type="text"
                id="card_num_field"
                className="form-control"
                              required
                              placeholder="5584331842817076"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Fecha de expiracion</label>
              <input
                type="text"
                id="card_exp_field"
                className="form-control"
                              required
                              placeholder="10/2027"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">CVC</label>
              <input
                type="text"
                id="card_cvc_field"
                              className="form-control"
                              placeholder="650"
                              
                required
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pagar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
