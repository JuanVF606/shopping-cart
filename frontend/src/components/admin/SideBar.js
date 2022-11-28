import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="row">
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
                <Link to="/admin/products">
                <i className="fa fa-product-hunt"></i> Productos
                </Link>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Pedidos
            </Link>
          </li>

          <li>
            <a
              href="#Usersubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-user"></i> Usuarios
            </a>
            <ul className="collapse list-unstyled" id="Usersubmenu">
                           <li>
                <Link to="/admin/register">
                  <i className="fa fa-plus"></i> Añadir
                </Link>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
    </div>
    </div>
  );
};

export default SideBar;
