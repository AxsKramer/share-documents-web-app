import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS,
} from "../../types";

const appReducer =  (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        file_message: action.payload,
      };
    case OCULTAR_ALERTA:
      return {
        ...state,
        file_message: null,
      };
    case SUBIR_ARCHIVO:
      return {
        ...state,
        isLoading: true,
      };
    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        name: action.payload.name,
        original_name: action.payload.original_name,
        isLoading: null,
      };
    case SUBIR_ARCHIVO_ERROR:
      return {
        ...state,
        file_message: action.payload,
        isLoading: null,
      };
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };
    case LIMPIAR_STATE:
      return {
        ...state,
        file_message: null,
        name: "",
        original_name: "",
        isLoading: null,
        uploads: 1,
        password: "",
        author: null,
        url: "",
      };
    case AGREGAR_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case AGREGAR_DESCARGAS:
      return {
        ...state,
        uploads: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
