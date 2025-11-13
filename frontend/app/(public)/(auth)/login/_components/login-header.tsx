import React from 'react'

const LoginHeader = () => {
  return (
    <header>
        <h1 className=" text-primary capitalize font-extrabold text-4xl ">
          ¡bienvenido 
          <br></br>
          <span className="text-black text-3xl">
            Intranet Asha!
          </span>
        </h1>
        <p className="font-normal text-sm pt-2 text-muted-foreground text-justify">Inicia sesión para conocer los beneficios de la empresa, hacer solicitudes de vacaciones, consultar cursos y más.</p>
    </header>
  )
}

export default LoginHeader