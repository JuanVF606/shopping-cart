import React, { Fragment } from "react";
import { numberFormat } from "./Format";

import { Link } from "react-router-dom";
function Product({ product, col }) {
  const price = `${product.price}`;
  return (
    <Fragment>
      <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
        <div className="card p-3 rounded">
          <img className="card-img-top mx-auto" src={product.images[0].url} />
          <div className="card-body d-flex flex-column">
            {product.stock > 0 ? (
              <Fragment>
                <h5 className="card-title">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h5>
                
                <p className="card-text" id="number">
                  {numberFormat(price)}
                </p>
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "Disponible" : "No disponible"}
                </span>
                <Link
                  to={`/product/${product._id}`}
                  id="view_btn"
                  className="btn btn-block"
                >
                  Ver Detalles
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <h5 className="card-title">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      style={{ width: `${(product.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span id="no_of_reviews">
                    ({product.numberOfReviews} Reviews)
                  </span>
                </div>

                <p className="card-text" id="number">
                  {numberFormat(price)}
                </p>
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "Disponible" : "No disponible"}
                </span>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Product;
