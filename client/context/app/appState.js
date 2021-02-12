import React, {useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from '../../types';
import axios from  'axios'

const AppState = ({children}) => {

    const initialState = {
        file_message: null,
        name: '',
        original_name:'',
        isLoading: null,
        uploads: 1,
        password: '',
        author: null,
        url: ''
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(appReducer, initialState);

    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => dispatch({ type: OCULTAR_ALERTA }), 3000);
    }

    const subirArchivo = async (formData, nombreArchivo) => {
        
        dispatch({ type: SUBIR_ARCHIVO})

        try {
            const resultado = await axios.post('http://localhost:4000/api/files', formData);
            console.log(resultado.data);            

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    name: resultado.data.file,
                    original_name: nombreArchivo
                }
            })

        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.message
            })
        }
    }

    const crearEnlace = async () => {
        const data = {
            name: state.name,
            original_name: state.original_name,
            uploads: state.uploads,
            password: state.password,
            author: state.author
        }

        try {
            const resultado = await axios.post('http://localhost:4000/api/links', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            });
        } catch (error) {
            console.log(error);
        }
    }

    const limpiarState = () => dispatch({type: LIMPIAR_STATE});

    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }

    return (
        <appContext.Provider
            value={{
                file_message: state.file_message,
                name: state.name,
                original_name: state.original_name,
                isLoading: state.isLoading,
                uploads: state.uploads,
                password: state.password,
                author: state.author,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState;