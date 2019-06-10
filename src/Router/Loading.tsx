import { Spin } from 'antd'
import React from 'react'

const Loading = () => (
  <div className="spin" style={{position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', display: 'flex'}}>
    <Spin size="large" style={{margin: 'auto'}}/>
  </div>
)

export default Loading