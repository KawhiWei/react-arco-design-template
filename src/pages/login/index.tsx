import { Button } from "tdesign-react"
import { router } from "../../router"

const Login = () => {
  const handleSubmit = async () => {
    router.navigate('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Logi收到佛i卢卡库神魔大陆阿萨德阿是</p>
      <Button theme='primary' onClick={handleSubmit}>Primary</Button>
    </div>
  )
}
export default Login
