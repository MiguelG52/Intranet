import LoginForm from "./_components/login-form"
import LoginHeader from "./_components/login-header"


const LoginPage = () => {
  return (
    <section className="page-container">
      <div className="w-full max-w-[400px] md:px-5 md:py-10 md:border md:rounded-lg md:shadow-lg flex flex-col items-center">
        <LoginHeader/>
        <LoginForm/>
      </div>
    </section>
  )
}

export default LoginPage