import React, { Fragment, useState } from "react";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [direccion, setDireccion] = useState(shippingInfo.direccion);
  const [comuna, setComuna] = useState(shippingInfo.comuna);
  const [provincia, setProvincia] = useState(shippingInfo.Provincia);
  const [region, setRegion] = useState(shippingInfo.region);
  const [numero_telefono, setNumero_telefono] = useState(
    shippingInfo.numero_telefono
  );

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        direccion,
        comuna,
        provincia,
        region,
        numero_telefono,
      })
    );
    navigate(`/order/confirm`);
  };

  return (
    <Fragment>
      <MetaData title={"Informacion de Envio"} />

      <CheckoutSteps shipping />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-2">Direccion de envio</h1>
            <div className="form-group">
              <label htmlFor="address_field">Direccion</label>
              <input
                type="text"
                id="Direccion_field"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">Comuna</label>
              <input
                type="text"
                id="comuna_field"
                className="form-control"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Numero de telefono</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={numero_telefono}
                onChange={(e) => setNumero_telefono(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="provincia_field">Provincia</label>
              <input
                type="text"
                id="provincia_field"
                className="form-control"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Region</label>
              <input
                type="text"
                id="country_field"
                className="form-control"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
