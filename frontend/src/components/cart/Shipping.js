import React, { Fragment, useState } from 'react'
import Link from "react-router-dom"
import MetaData from "../layout/MetaData"

import { useDispatch, useSelector } from "react-redux"
import { saveShippingInfo } from '../../actions/cartActions'

const Shipping = () => {

    const {shippinginfo} = useSelector(state => state.cart)

    return (
        <div>

        </div>
    )
}

export default Shipping