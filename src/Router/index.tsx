import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import loading from './Loading'
import Loadable from 'react-loadable'

import App from '../containers/App'
import Login from '../containers/Login'

const RouterList: {
  path: string,
  component: () => any,
  meta: string
}[] = [
  {
    component: () => import('../containers/MyMovie'),
    path: '/my/movie',
    meta: '豆瓣电影'
  },
  {
    component: () => import('../containers/MyZhihu'),
    path: '/my/zhihu',
    meta: '知乎日报'
  },
  {
    component: () => import('../containers/MyZhihu/detail'),
    path: '/my/zhihu/:id',
    meta: ''
  },
  {
    component: () => import('../containers/MySmile'),
    path: '/my/smile',
    meta: 'Man: 笑一个'
  },
  {
    component: () => import('../containers/MyCharts'),
    path: '/my/chart',
    meta: '图标统计'
  },
  {
    component: () => import('../containers/MyRecord'),
    path: '/my/record',
    meta: 'Martin: 笔记'
  },
  {
    component: () => import('../containers/MyRecord/detail'),
    path: '/my/record/:id',
    meta: ''
  },
  {
    component: () => import('../containers/MyMood'),
    path: '/my/mood',
    meta: ''
  },
]

const RouterMap = () => (
  <Router>
    {window.localStorage.token ? <App>
      <Switch>
        {RouterList.map(item => (
          <Route
            key={item.path}
            exact={true}
            path={item.path}
            component={Loadable({
              loader: item.component,
              loading
            })}
          />
        ))}
      </Switch>
    </App> : <Login />}
  </Router>
)

export default RouterMap