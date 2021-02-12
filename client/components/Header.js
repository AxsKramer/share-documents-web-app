import React, { useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const AuthContext = useContext(authContext);
  const { user, usuarioAutenticado, cerrarSesion } = AuthContext;

  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;

  useEffect(() => usuarioAutenticado(), []);

  const redireccionar = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img
        onClick={() => redireccionar()}
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg"
      />

      <div>
        {user ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {user.name}</p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                Iniciar Sesión
              </a>
            </Link>
            <Link href="/new_account">
              <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
