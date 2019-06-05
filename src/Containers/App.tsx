import React from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import HeaderLogo from '../assets/imgs/header.webp'
import {
  Layout,
  Menu,
  Icon
} from 'antd'

const { Header, Footer, Sider, Content } = Layout;

type defaultState = {
  collapsed: boolean
}

class App extends React.Component<{}, defaultState> {
  state = {
    collapsed: false
  }

  onCollapse = (collapsed: boolean) : void => {
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
              <img src={HeaderLogo} alt=""/>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="myEchart">
                <Link to={''}>
                  <Icon type="bar-chart" />
                  <span className="nav-text">图标统计</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="myMovie">
                <Link to={'/mymovie'}>
                  <Icon type="video-camera" />
                  <span className="nav-text">豆瓣电影</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="myRead">
                <Link to={''}>
                  <Icon type="read" />
                  <span className="nav-text">豆瓣读书</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="myRecord">
                <Link to={''}>
                  <Icon type="form" />
                  <span className="nav-text">我的笔记</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="myBlob">
                <a href="https://github.com/Gloomysunday28/martin-blog" target="_blank" rel="noopener noreferrer">
                  <Icon type="github" />
                  <span className="nav-text">我的项目</span>
                </a>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 20px', textAlign: 'left'}}>
              <Icon
                className="c-trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => { this.onCollapse(!this.state.collapsed) }}
              />
            </Header>
            <Content style={{ margin: '24px 16px', flex: 1, background: "#fff"}}>
              {this.props.children}
            </Content>
            <Footer style={{ background: '#fff'}}>
              Mr.Martin's Blog
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
