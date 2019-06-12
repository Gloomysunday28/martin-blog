import React from 'react';
import './App.css';
import { NavLink, withRouter } from 'react-router-dom'
import HeaderLogo from '../assets/imgs/header.webp'
import { ApiInterface } from '../interface/api'
import {
  Layout,
  Menu,
  Icon,
  Card,
  Popover,
  Dropdown
} from 'antd'
import weather from '../utils/weather'
import {GetWeather} from '../server/api'

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu }  = Menu;

type defaultState = {
  collapsed: boolean,
  heart: string,
  weather: any
}

const MenuItems: {}[] = [
  {
    key: '/my/chart',
    icon: 'bar-chart',
    item: '图标统计',
    url: '/my/chart'
  },
  {
    key: '/my/movie',
    icon: 'video-camera',
    item: '豆瓣电影',
    url: '/my/movie'
  },
  {
    key: '/my/read',
    icon: 'read',
    item: '豆瓣读书',
    url: '/my/read'
  },
  {
    key: '/my/zhihu',
    icon: 'zhihu',
    item: '知乎日报',
    url: '/my/zhihu'
  },
  {
    key: '/my/smile',
    icon: 'smile',
    item: 'Man: 笑一个',
    url: '/my/smile'
  },
]

interface IWeather extends ApiInterface {
  data: {
    results: [{
      now: object,
      location: object,
      last_update: string
    }]
  }
}

class App extends React.Component<{
  location: any,
  match: any,
  history: any
}, defaultState> {
  private menu: React.ReactNode
  readonly state = {
    collapsed: false,
    heart: 'frown',
    weather: {
      now: {
        code: 99,
        temperature: '',
        text: ''
      },
      location: {
        name: ''
      },
      last_update: ''
    }
  }

  componentWillMount() {
    this.menu = (<Menu>
      <Menu.Item>
        <p onClick={this.LogOut}>退出登录</p>
      </Menu.Item>
    </Menu>)
    
    GetWeather().then((res: IWeather) => {
      this.setState(() => ({
        weather: (res.data.results || [1])[0]
      }))
    })
  }

  LogOut = () => {
    window.localStorage.removeItem('token')
    window.location.href = '/#/login'
    window.location.reload()
  }

  onCollapse = (collapsed: boolean): void => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={{
              height: '100vh',
            }}
          >
            <div className={`c-martin__logo ${this.state.collapsed && "c-martin__collapsed"}`}>
              <img src={HeaderLogo} alt="" />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname]} defaultOpenKeys={[this.props.location.pathname]}>
              {MenuItems.map((_: any) => (
                <Menu.Item key={_.key}>
                  <NavLink to={_.url}>
                    {/* <Icon type="bar-chart" /> */}
                    <Icon type={_.icon} />
                    <span className="nav-text">{_.item}</span>
                  </NavLink>
                </Menu.Item>
              ))}
              <SubMenu
                key="/my/record"
                title={
                  <span>
                    <Icon type='medium' />
                    <span>Martin的心情</span>
                  </span>
                }
              >
                <Menu.Item key="/my/record">
                  <NavLink to="/my/record">
                    <Icon type="form" />
                    <span className="nav-text">我的笔记</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="blog-mood">
                  <NavLink to="/my/mood">
                    <Icon type="medium" />
                    <span className="nav-text">我的心情</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="myBlob">
                <a href="https://github.com/Gloomysunday28/martin-blog" target="_blank" rel="noopener noreferrer">
                  <Icon type="github" />
                  <span className="nav-text">我的项目</span>
                </a>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ height: '100vh' }}>
            <Header style={{ background: '#fff', padding: '0 20px', textAlign: 'left' , display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Icon
                className="c-trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => { this.onCollapse(!this.state.collapsed) }}
              />
              <section style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Popover placement="topLeft" content={
                  <Card bordered={false} bodyStyle={{padding: 0}} style={{padding: 0, background: 'none', color: '#fff'}}>
                    <div>
                      <p style={{margin: '10px 0 !important'}}>
                        {this.state.weather.location.name}
                        <span className="c-weather__update">{this.state.weather.last_update.split(/[T|+]/)[1]}更新</span>
                      </p>
                      <section className="c-weather__info">
                        <img className="c-weather" src={weather[this.state.weather.now.code]} alt=""/>
                        <div className="c-weather__tempture">
                          <span className="c-weather__temp">{this.state.weather.now.temperature}<span style={{fontSize: 25, marginLeft: 5}}>℃</span></span>
                          <span className="c-weather__msg">{this.state.weather.now.text}</span>
                        </div>
                      </section>
                    </div>
                  </Card>
                }>
                  <img className="c-weather" src={weather[this.state.weather.now.code]} alt=""/>
                </Popover>
                <Dropdown placement="bottomLeft" overlay={this.menu} className="c-logout">
                  <Icon
                    className="c-trigger"
                    type={this.state.heart}
                  />
                </Dropdown>
              </section>
            </Header>
            <Content className="g-main" style={{ margin: '24px 16px', flex: 1, background: "#fff", overflowY: 'auto' }}>
              <Card bordered={false} bodyStyle={{ padding: 12 }}>
                {this.props.children}
              </Card>
            </Content>
            <Footer style={{ background: '#fff' }}>
              Mr.Martin's Blog
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
