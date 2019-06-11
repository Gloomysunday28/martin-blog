import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import loading from './Loading'
import Loadable from 'react-loadable'

import App from '../containers/App'
import Login from '../containers/Login'

const RouterList: any[] = [
  {
    component: () => import('../containers/MyMovie'),
    path: '/my/movie'
  },
  {
    component: () => import('../containers/MyZhihu'),
    path: '/my/zhihu'
  },
  {
    component: () => import('../containers/MyZhihu/detail'),
    path: '/my/zhihu/:id'
  },
  {
    component: () => import('../containers/MySmile'),
    path: '/my/smile'
  },
  {
    component: () => import('../containers/MyCharts'),
    path: '/my/chart'
  },
  {
    component: () => import('../containers/MyRecord'),
    path: '/my/record'
  },
  {
    component: () => import('../containers/MyRecord/detail'),
    path: '/my/record/:id'
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