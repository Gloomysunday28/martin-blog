import React from 'react';
import './App.css';
import { NavLink, withRouter } from 'react-router-dom'
import HeaderLogo from '../assets/imgs/header.webp'
import {
  Layout,
  Menu,
  Icon,
  Card
} from 'antd'

const { Header, Footer, Sider, Content } = Layout;

type defaultState = {
  collapsed: boolean
}

const MenuItems: {}[] = [
  {
    key: '/my/echart',
    icon: 'bar-chart',
    item: '图标统计',
    url: '/my/echart'
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
    key: '/my/record',
    icon: 'form',
    item: '我的笔记',
    url: '/my/record'
  },
  {
    key: '/my/zhihu',
    icon: 'zhihu',
    item: '知乎日报',
    url: '/my/zhihu'
  },
]

class App extends React.Component<{
  location: any,
  match: any,
  history: any
}, defaultState> {
  state = {
    collapsed: false
  }

  componentDidMount() {
    console.log(this.props.location.pathname);
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname]}>
              {MenuItems.map((_: any) => (
                <Menu.Item key={_.key}>
                  <NavLink to={_.url}>
                    {/* <Icon type="bar-chart" /> */}
                    <Icon type={_.icon} />
                    <span className="nav-text">{_.item}</span>
                  </NavLink>
                </Menu.Item>
              ))}
              <Menu.Item key="myBlob">
                <a href="https://github.com/Gloomysunday28/martin-blog" target="_blank" rel="noopener noreferrer">
                  <Icon type="github" />
                  <span className="nav-text">我的项目</span>
                </a>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ height: '100vh' }}>
            <Header style={{ background: '#fff', padding: '0 20px', textAlign: 'left' }}>
              <Icon
                className="c-trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => { this.onCollapse(!this.state.collapsed) }}
              />
            </Header>
            <Content style={{ margin: '24px 16px', flex: 1, background: "#fff", overflowY: 'auto' }}>
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
