import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

import { register, clearErrors } from "../../actions/userActions";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    run: "",
    sex: "",
    email: "",
    password: "",
  });

  const { name, run, sex, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_user.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("run", run);
    formData.set("sex", sex);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(register(formData));
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
    <>
      {/* TITLE PAGE */}
      <MetaData title={"Register User"} />
      {/* INIT DIV FORM */}
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          {/* INIT FORM */}
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            {/* TITLE FORM */}
            <h1 className="mb-3">Register</h1>
            {/* NAME USER */}
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
            {/* RUN USER */}
            <div className="form-group">
              <label htmlFor="run_field">Run</label>
              <input
                type="run"
                id="run_field"
                className="form-control"
                name="run"
                value={run}
                onChange={onChange}
              />
            </div>
             {/* RUN USER */}
             <div className="form-group">
              <label htmlFor="sex_field">Sex</label>
              <input
                type="sex"
                id="sex_field"
                className="form-control"
                placeholder="Masculino/femenino"
                name="sex"
                value={sex}
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
                  <figure className="avatar mr-3 item-rtl">
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
                    Choose Avatar
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
              REGISTER
            </button>
          </form>
          {/* END FORM */}
        </div>
      </div>
      {/* END DIV FORM */}
    </>
  );
};

export default Register;
