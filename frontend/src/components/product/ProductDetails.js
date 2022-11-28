import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Carousel } from "react-bootstrap";
import Loader from "../layout/Loader";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addItemToCart } from "../../actions/cartActions";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    dispatch(getProductDetails(params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, params.id]);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addtoCart = () => {
    dispatch(addItemToCart(params.id, quantity));
    alert.success("Producto Agregado al carrito");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around rounded-circle">
            <div
              className="col-12 col-lg-5 img-fluid rounded-circle"
              id="product_image"
            >
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100 rounded-circle"
                        src={image.url}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            {/* Product Details */}
            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Producto # {product._id}</p>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>

              {product.stock > 0 ? (
                <Fragment>
                  <hr />

                  <p>
                    Status:{" "}
                    <span
                      id="stock_status"
                      className={product.stock > 0 ? "greenColor" : "redColor"}
                    >
                      {product.stock > 0 ? "Disponible" : "No Disponible"}
                    </span>
                  </p>

                  <hr />

                  <h4 className="mt-2">Descripcion:</h4>
                  <p>{product.description}</p>
                  <hr />
                  <p id="product_seller mb-3">
                    Vendido Por: <strong>{product.seller}</strong>
                  </p>

                  <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ml-4"
                      
                    disabled={product.stock === 0}
                    onClick={addtoCart}
                  >
                    Añadir al carro
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <p>
                    Status:{" "}
                    <span
                      id="stock_status"
                      className={product.stock > 0 ? "greenColor" : "redColor"}
                    >
                      {product.stock > 0 ? "Disponible" : "No disponible"}
                    </span>
                  </p>

                  <hr />

                  <h4 className="mt-2">Descripcion:</h4>
                  <p>{product.description}</p>
                  <hr />
                  <p id="product_seller mb-3">
                    Vendido Por: <strong>{product.seller}</strong>
                  </p>

                
                </Fragment>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
