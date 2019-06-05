import { Spin } from 'antd'
import React from 'react'

const Loading = () => (
  <div className="spin" style={{background: "rgba(255, 255, 255, 1)", position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',display: 'flex'}}>
    <Spin size="large" style={{margin: 'auto'}}/>
  </div>
)

export default Loading