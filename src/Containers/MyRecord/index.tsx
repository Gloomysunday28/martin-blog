import React from 'react'
import {NavLink} from 'react-router-dom'
import {
  Card
} from 'antd'
import ScrollLoading from '../../hoc/ScrollLoading'
import records from '../../store/MyRecord'
import {observer} from 'mobx-react'

@observer
class MyRecord extends React.Component<{getRef: () => void}, {}> {
  render() {
    return <div>
      {records.map(<T extends Partial<{[propsName: string]: any}>>(_: T) => (
        <NavLink to={`/my/record/${_._id}`} key={_._id}>
          <Card hoverable bordered={false} title={_.title} style={{marginBottom: 10, textAlign: 'left'}}>
            更新时间 {_.createOn.split(/[T|]/)[0]}
            {_.isTop && <span style={{color: 'red', textAlign: 'right', float: 'right', fontWeight: 'bold'}}>置顶</span>}
          </Card>
        </NavLink>
      ))}
    </div>
  }
}

export default ScrollLoading(MyRecord)