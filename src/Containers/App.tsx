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
  Dropdown,
  Breadcrumb
} from 'antd'
import weather from '../utils/weather'
import {GetWeather} from '../server/api'
import {Provider } from 'mobx-react'
import { appState } from '../store'

const { Header, Footer, Sider, Content } = Layout;

// const { SubMenu }  = Menu;

type defaultState = {
  collapsed: boolean,
  heart: string,
  weather: any,
  breadPages: string[]
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
  {
    key: '/my/mood',
    icon: 'medium',
    item: 'Martin: 心情',
    url: '/my/mood'
  },
  {
    key: '/my/record',
    icon: 'form',
    item: 'Martin: 笔记',
    url: '/my/record'
  },
]

interface Breadcrumbs {
  url?: string
}

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
    },
    breadPages: []
  }

  componentWillMount() {
    this.menu = (<Menu>
      <Menu.Item>
        <span onClick={this.LogOut}>退出登录</span>
      </Menu.Item>
    </Menu>)

    this.getBread()
    GetWeather().then((res: IWeather) => {
      this.setState(() => ({
        weather: (res.data.results || [1])[0]
      }))
    })
  }

  getBread = () => { // 获取面包屑
    const breadPages: any = MenuItems.find(<T extends Breadcrumbs>(v: T): boolean => v!.url === this.props.location.pathname)

    if (breadPages) {
      this.setState(() => ({
        breadPages: [breadPages.item || '']
      }))
    }
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
    const {breadPages} = this.state

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
              {/* <SubMenu
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
              </SubMenu> */}
              <Menu.Item key="myBlob">
                <a href="https://github.com/Gloomysunday28/martin-blog" target="_blank" rel="noopener noreferrer">
                  <Icon type="github" />
                  <span className="nav-text">我的项目</span>
                </a>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ height: '100vh' }}>
            <Header style={{ background: '#001529', padding: '0 20px', textAlign: 'left' , display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Icon
                className="c-trigger"
                style={{color: '#fff'}}
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
                    style={{color: '#fff'}}
                    className="c-trigger"
                    type={this.state.heart}
                  />
                </Dropdown>
              </section>
            </Header>
            <Breadcrumb style={{textAlign: 'left', padding: '20px 0 0 20px'}}>
              {breadPages.map(bread => {
                return <Breadcrumb.Item key={bread}>
                  <NavLink to={this.props.location.pathname}>
                    {bread}
                  </NavLink>
                </Breadcrumb.Item>
              })}
            </Breadcrumb>
            <Content className="g-main" style={{ margin: '12px 16px 24px', flex: 1, background: "#fff", overflowY: 'auto' }}>
              <Card bordered={false} bodyStyle={{ padding: 12 }}>
                <Provider appState={appState}>
                  {this.props.children}
                </Provider>
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
