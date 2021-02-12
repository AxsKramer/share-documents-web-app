import Layout from "../../components/Layout";
import axios from  'axios';
import React, { useState, useContext } from "react";
import appContext from "../../context/app/appContext";
import Alert from "../../components/Alert";
import {useRouter} from 'next/router';

export async function getServerSideProps({ params }) {
  const { link } = params;
  const resultado = await axios.get(`http://localhost:4000/api/links/${link}`);
  return {
    props: {
      link: resultado.data,
    },
  };
}

export async function getServerSidePaths() {
  const links = await axios.get("http://localhost:4000/api/links");
  return {
    paths: links.data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

const Link = ({ link }) => {
  const AppContext = useContext(appContext);
  const { mostrarAlerta, mensaje_archivo } = AppContext;

  const [tienePassword, setTienePassword] = useState(link.password);
  const [password, setPassword] = useState("");

  const router = useRouter();

  const verificarPassword = async (e) => {
    e.preventDefault();

    const data = {password};

    try {
      const resultado = await axios.post(`http://localhost:4000/api/links/${link.link}`,data);
      setTienePassword(resultado.data.password);
    } catch (error) {
      mostrarAlerta(error.response.data.message);
    }
  };

  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className="text-center">
            Este link esta protegido por un password, colocalo a continuación
          </p>

          {mensaje_archivo && <Alert />}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Password del enlace"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Validar Password..."
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`http://localhost:4000/api/files/${link.file}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
              download
              onClick={() => {
                setTimeout(() => {
                  router.push('/');
                }, 2000);
              }}
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Link;
