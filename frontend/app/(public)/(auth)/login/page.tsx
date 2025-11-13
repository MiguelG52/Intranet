import LoginForm from "./_components/login-form"
import LoginHeader from "./_components/login-header"


const LoginPage = () => {
  return (
    <section className="page-container">
      <LoginHeader/>
      <LoginForm/>
    </section>
  )
}

export default LoginPage