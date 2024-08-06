import './login.less';

import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Typography
} from '@arco-design/web-react';
import {
  IconFile,
  IconGithub,
  IconSafe,
  IconUser,
  IconWechat
} from '@arco-design/web-react/icon';

import { accessTokenActions } from '@/store/reducers/user-slice'
import { setRouters } from '@/store/reducers/router'
import store from '../../store/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (formItem: any) => {
    store.dispatch(accessTokenActions.setAccessToken("abcdefg001"));

    const { data } = {
      data: [
        {
          path: '/dashboard',
          key: 'dashboard',
          element: 'requirePublicLayout',
          meta: {
            name: 'menu.dashboard',
            title: '仪表盘',
          },
          children: [
            {
              path: 'workplace',
              key: '/dashboard/workplace',
              element: '/dashboard/workplace',
              meta: {
                name: 'menu.dashboard.workplace',
                title: '工作台'
              }
            },
            {
              path: 'testPage',
              key: '/dashboard/test',
              element: '/dashboard/test',
              meta: {
                name: 'menu.dashboard.test',
                title: '测试页面'
              }
            }
          ]
        },
      ]
    };
    console.log('data:', data)
    dispatch(setRouters(data));
    navigate('/dashboard/workplace');

  };
  return (
    <div className="login-wrap">
      <div className="login-left">
        <div className="login-left-content">
          <Typography.Title className="login-text">ARCO ADMIN TEMPLATE</Typography.Title>
          <Typography.Title className="login-text" heading={5}>
            开箱即用中后台管理系统
          </Typography.Title>
          <Typography.Text className="login-text">点击右侧登录即可体验</Typography.Text>
          <div className="btn">
            <Space size={16}>
              <Button shape="round" type="primary" icon={<IconGithub />}>
                Github
              </Button>
              <Button shape="round" type="primary" icon={<IconFile />}>
                文档
              </Button>
              <Button shape="round" type="primary" icon={<IconWechat />}>
                微信交流群
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <div className="login-form">
        <div className="form-warp">
          <Typography.Title>您好！</Typography.Title>
          <Typography.Title heading={5}>欢迎登录Arco Admin</Typography.Title>
          <Form
            form={form}
            wrapperCol={{
              span: 24
            }}
            initialValues={{
              username: 'admin',
              password: 123456
            }}
            onSubmit={handleSubmit}
          >
            <Space direction="vertical" size={10}>
              <Form.Item
                field="username"
                rules={[
                  {
                    required: true,
                    message: '用户名不能为空'
                  }
                ]}
              >
                <Input prefix={<IconUser />} placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                field="password"
                rules={[
                  {
                    required: true,
                    message: '密码不能为空'
                  }
                ]}
              >
                <Input.Password prefix={<IconSafe />} placeholder="请输入密码" />
              </Form.Item>
              <Form.Item className="forget-pwd">
                <Checkbox>记住密码</Checkbox>
                <Button type="text">忘记密码</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" shape="round" htmlType="submit" long>
                  登 录
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </div>
      {/* <div className="login-bg">
        <div className="logo-bg-img"></div>
      </div>
      */}
    </div>
  );
}
