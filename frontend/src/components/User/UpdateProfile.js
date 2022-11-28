import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [nombre_completo, setNombre_completo] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [direccion, setDireccion] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/defaul_user.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setNombre_completo(user.nombre_completo);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      setDireccion(user.direccion);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadUser());

      navigate("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [user,dispatch, alert, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre_completo", nombre_completo);
    formData.set("email", email);
    formData.set("direccion", direccion);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      <MetaData title={"Actualiza tu Perfil"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Actualizar Perfil</h1>

            <div className="form-group">
              <label htmlFor="nombre_completo_field">Nombre Completo</label>
              <input
                type="nombre_completo"
                id="nombre_completo_field"
                className="form-control"
                name="nombre_completo"
                value={nombre_completo}
                onChange={(e) => setNombre_completo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion_field">Direccion</label>
              <input
                type="direccion"
                id="direccion_field"
                className="form-control"
                name="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>


            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Escoger Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
