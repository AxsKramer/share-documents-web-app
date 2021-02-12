import React, { useReducer } from "react";
import axios from  'axios';
import authContext from "./authContext";
import authReducer from "./authReducer";
import tokenAuth from "../../config/tokenAuth";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OCULTAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from "../../types";

const AuthState = ({ children }) => {
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    authenticated: null,
    user: null,
    message: null,
    isLoading: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await axios.post("http://localhost:4000/api/users", datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }
    setTimeout(() => dispatch({type: OCULTAR_ALERTA,}), 3000);
  };

  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await axios.post("http://localhost:4000/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.message,
      });
    }
    setTimeout(() => dispatch({type: OCULTAR_ALERTA}), 3000);
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await axios.get("http://localhost:4000/api/auth");
      if (respuesta.data.user) {
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: respuesta.data.user,
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.message,
      });
      console.log(error)
    }
  };

  const cerrarSesion = () => dispatch({type: CERRAR_SESION});

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        isLoading: state.isLoading,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
