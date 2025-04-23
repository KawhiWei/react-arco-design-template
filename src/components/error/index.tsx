import { Button, Result } from "@arco-design/web-react"

import { Link } from "react-router-dom"

const ErrorPage = () => {
  return <div><Result
    status="404"
    title="404"
    subTitle="对不起，你访问的页面不存在。"
    extra={(
      <Button type="primary">
        <Link to="/">首页</Link>
      </Button>
    )}
  /></div>
}
export default ErrorPage