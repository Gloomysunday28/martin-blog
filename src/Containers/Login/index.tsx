import React from 'react'
import { Card, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { GetLogin } from '../../server/api'

type IProps = {
  form: any,
}

type IState = {
  username: string,
  password: string
}

class Login extends React.Component<IProps, IState> {
  readonly state = {
    username: '',
    password: ''
  }

  SubmitLogin = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.form.validateFields(<T extends {username: string, password: string}>(err: any, fields: T) => {
      if (!err) {
        GetLogin(fields.username, fields.password).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            window.localStorage.setItem('token', res.data.token)
            window.location.href = '/#/my/chart'
            window.location.reload()
          } else {
            message.error(res.data.msg)
          }
        }).catch(_ => {
          message.error(_.response.data.message)
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    
    return <section className="c-login__container">
      <section style={{width: '100vw', height: '100vh', position: 'relative'}}>
        <Card bordered={false} className="c-login__box">
          <h3 className="c-login__title">登录Martin的博客</h3>
          <Form onSubmit={this.SubmitLogin} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入你的账号' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入你的账号"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入你的密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住账号</Checkbox>)}
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </section>
      <div className="c-login__jx">
        <Card title="恭喜您, 获得彩蛋" style={{textAlign:'center'}} bordered={false} bodyStyle={{display: 'flex'}}>
          <div style={{margin: 'auto'}}>
            <img src={require('../../assets/imgs/music.png')} alt=""/>
          </div>
          <div style={{margin: 'auto'}}>
            <img src={require('../../assets/imgs/houtai.png')} alt=""/>
          </div>
          <div style={{margin: 'auto'}}>
            <img src={require('../../assets/imgs/game.png')} alt=""/>
          </div>
        </Card>
      </div>
    </section>
  } 
}

export default Form.create({ name: 'normal_login' })(Login)
