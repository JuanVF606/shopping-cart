import React, { Fragment, useEffect } from "react"

import UserRegister from "./../admin/UserRegister"  
import MetaData from "../layout/MetaData"
import SideBar from "../admin/SideBar"
const FixedPages = () => {
    return (
        <Fragment>
            <MetaData title={"Ver Productos"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>
                <div className="col-12 col-md-10">
                        <h1>Pagina en ARREGLO</h1>
                </div>
            </div>
        </Fragment>
    )
}

export default FixedPages