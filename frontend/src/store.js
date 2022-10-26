import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productsReducer } from "./reducers/productReducers"

const reducer = combineReducers({
    productsReducer: productsReducer
})

let inititalState = {}

const middleware = [thunk]
const store = createStore(reducer,inititalState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
