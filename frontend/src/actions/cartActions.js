import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM_CART} from "../constants/cartConstants";

export const addItemToCart = (id, quantity) => async (dispacth, getstate) => {
  let link = `/api/v1/product/${id}`;
  const { data } = await axios.get(link);

  dispacth({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));
};

export const RemoveItemFromCart = (id) => async (dispacth, getstate) => {
  let link = `/api/v1/product/${id}`;
  const { data } = await axios.get(link);

  dispacth({
    type: REMOVE_ITEM_CART,
    payload: id
  });
  localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));
};
