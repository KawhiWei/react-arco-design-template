import { Button, Typography, } from "@arco-design/web-react"

import { router } from "../../router"

const Login = () => {
debugger
  const handleSubmit = async () => {

    router.navigate('/');
  };

  return (
    <div>
      <Typography style={{ marginTop: -40 }}>
        <Typography.Title>Logi收到佛i卢卡库神魔大陆阿萨德阿是</Typography.Title>
      </Typography>
      <Button type='primary' onClick={handleSubmit}>Primary</Button>
    </div>
  )
}
export default Login