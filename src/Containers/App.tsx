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
              <Menu.Item key="1">
                <Link to={''}>
                  <Icon type="user" />
                  <span className="nav-text">nav 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={''}>
                  <Icon type="user" />
                  <span className="nav-text">nav 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={''}>
                  <Icon type="user" />
                  <span className="nav-text">nav 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={''}>
                  <Icon type="user" />
                  <span className="nav-text">nav 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to={''}>
                  <Icon type="user" />
                  <span className="nav-text">nav 1</span>
                </Link>
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
