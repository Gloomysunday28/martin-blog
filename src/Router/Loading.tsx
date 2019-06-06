import { Spin } from 'antd'
import React from 'react'

const Loading = () => (
  <div className="spin" style={{background: "rgba(255, 255, 255, .3)", position: 'fixed', left: 0, top: 0, right: 0, bottom: 0,display: 'flex'}}>
    <Spin size="large" style={{margin: 'auto'}}/>
  </div>
)

export default Loading