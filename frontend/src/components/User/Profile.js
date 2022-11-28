import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Profile" />
          <div className="container container-fluid">
            <h2 className="mt-5 ml-5">Mi Perfil</h2>
            <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-3">
                <figure className="avatar avatar-profile">
                  <img
                    className="rounded-circle img-fluid"
                    src={user.avatar.url}
                    alt={user.name}
                  />
                  <hr />
                </figure>
                <Link
                  className="btn btn-primary btn-block my-5 rounded-bottom"
                  to="/me/update"
                  id="edit_profile"
                >
                  Editar Perfil
                </Link>
              </div>

              <div className="col-6 col-md-5">
                <h4>Nombre Completo</h4>
                <p>{user.nombre_completo}</p>
                <hr />
                <h4>Sexo</h4>
                <p>{user.sexo}</p> <hr />
                <h4>Rut</h4>
                <p>{user.run}</p>
                <hr />
                <h4>Fecha De Nacimiento</h4>
                <p>{user.fecha_nacimiento}</p>
                <hr />
                <h4>Numero de Telefono</h4>
                <p>{user.numero_telefono}</p>
                <hr />
                <h4>Email Address</h4>
                <p>{user.email}</p>
                <hr />
                <h4>Direccion</h4>
                <p>
                  {user.direccion} {user.comuna}
                </p>
                <hr />
                <h4>Joined On</h4>
                <p>{String(user.createAt).substring(0, 10)}</p>
                <hr />
                {user.role !== "admin" && (
                  <Link
                    to="/orders/me"
                    className="btn btn-danger btn-block mt-5"
                  >
                    My Orders
                  </Link>
                )}
                <Link
                  to="/password/update"
                  className="btn btn-primary btn-block mt-3"
                >
                  Cambiar Contraseña
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
