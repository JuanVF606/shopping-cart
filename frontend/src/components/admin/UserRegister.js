import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

import { AdminUserregister, clearErrors } from "../../actions/userActions";
import SideBar from "./SideBar";

const UserRegister = () => {
    const [user, setUser] = useState({
        run: "",
        nombre_completo: "",
        direccion: "",
        comuna: "",
        provincia: "",
        region: "",
        fecha_nacimiento: "",
        sexo: "",
        email: "",
        numero_telefono: "",
        password: "",
      });

      const {
        run,
        nombre_completo,
        direccion,
        comuna,
        provincia,
        region,
        fecha_nacimiento,
        sexo,
        email,
        numero_telefono,
        password,
      } = user;

     const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_user.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    

  }, [dispatch, alert, error, navigate]);


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("run", run);
    formData.set("nombre_completo", nombre_completo);
    formData.set("direccion", direccion);
    formData.set("comuna", comuna);
    formData.set("provincia", provincia);
    formData.set("region", region);
    formData.set("fecha_nacimiento", fecha_nacimiento);
    formData.set("sexo", sexo);
    formData.set("email", email);
    formData.set("numero_telefono", numero_telefono);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(AdminUserregister(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

    return (
        <Fragment>
            <MetaData title={"Añadir Producto"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Añadir usuario</h1>
                        <div class="wrapper my-5">
                        <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            {/* TITLE FORM */}
            <h1 className="mb-3">Register</h1>
            {/* RUN USER */}
            <div className="form-group">
              <label htmlFor="run_field">Rut</label>
              <input
                type="run"
                id="name_field"
                className="form-control"
                name="run"
                value={run}
                onChange={onChange}
              />
            </div>
            {/* NAME USER */}
            <div className="form-group">
              <label htmlFor="nombre_completo_field">Nombre completo</label>
              <input
                type="nombre_completo"
                id="nombre_completo_field"
                className="form-control"
                name="nombre_completo"
                value={nombre_completo}
                onChange={onChange}
              />
            </div>
            {/* Direccion USER */}
            <div className="form-group">
              <label htmlFor="direccion_field">Direccion</label>
              <input
                type="direccion"
                id="direccion_field"
                className="form-control"
                name="direccion"
                value={direccion}
                onChange={onChange}
              />
            </div>
            {/* Comuna USER */}
            <div className="form-group">
              <label htmlFor="comuna_field">Comuna</label>
              <input
                type="comuna"
                id="comuna_field"
                className="form-control"
                name="comuna"
                value={comuna}
                onChange={onChange}
              />
            </div>
            {/* Provincia  User*/}
            <div className="form-group">
              <label htmlFor="provincia_field">Provincia</label>
              <input
                type="provincia"
                id="provincia_field"
                className="form-control"
                name="provincia"
                value={provincia}
                onChange={onChange}
              />
            </div>
            {/* Region USER */}
            <div className="form-group">
              <label htmlFor="region_field">region</label>
              <input
                type="region"
                id="region_field"
                className="form-control"
                name="region"
                value={region}
                onChange={onChange}
              />
            </div>
            {/* Fecha Nacimiento USER */}
            <div className="form-group">
              <label htmlFor="fecha_nacimiento_field">
                Fecha De Nacimiento
              </label>
              <input
                type="fecha_nacimiento"
                id="fecha_nacimiento_field"
                className="form-control"
                name="fecha_nacimiento"
                value={fecha_nacimiento}
                onChange={onChange}
              />
            </div>
            {/* SEXO USER */}
            <div className="form-group">
              <label htmlFor="sexo_field">sexo</label>
              <input
                type="sexo"
                id="sexo_field"
                className="form-control"
                name="sexo"
                value={sexo}
                onChange={onChange}
              />
            </div>
            {/* EMAIL USER*/}

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            {/* NUMERO TELEFONO */}
            <div className="form-group">
              <label htmlFor="numero_telefono_field">Numero De Telefono</label>
              <input
                type="numero_telefono"
                id="numero_telefono_field"
                className="form-control"
                name="numero_telefono"
                value={numero_telefono}
                onChange={onChange}
              />
            </div>
            {/* PASSWORD USER */}
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            {/* AVATAR USER*/}
            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-1 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="avatar preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Añade Una Foto
                  </label>
                </div>
              </div>
            </div>
            {/* BUTTON TO REGISTER USER */}
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              CREAR CUENTA
            </button>
          </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default UserRegister;
