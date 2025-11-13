import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Iniciar sesión | ASHA Solution",
  description: "Inicio de sesión | ASHA Solution",
}

export default function Layout({
    children
}:Readonly<{
    children: React.ReactNode;
}>){
    return (
        <main>
            {children}
        </main>
    )
}