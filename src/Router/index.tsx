import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import loading from './Loading'
import Loadable from 'react-loadable'

import App from '../containers/App'

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
]

const RouterMap = () => (
  <Router>
    <App>
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
    </App>
  </Router>
)

export default RouterMap