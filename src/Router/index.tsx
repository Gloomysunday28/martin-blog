import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from '../Containers/App'

const Routers: React.SFC = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
    </div>
  </Router>
)

export default Routers