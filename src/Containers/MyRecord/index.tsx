import React from 'react'
import { GetRecord } from '../../server/api'
import {NavLink} from 'react-router-dom'
import {
  Card
} from 'antd'
import ScrollLoading from '../../hoc/ScrollLoading'

class MyRecord extends React.Component<{getRef: () => void}, {
  records: any
}> {
  readonly state = {
    records: []
  }
  componentWillMount() {
    GetRecord(1).then((res: any) => {
      this.setState(() => ({
        records: res.data.items
      }), () => {
        this.props.getRef && this.props.getRef()
      })
    })
  }
  render() {
    return <div>
      {this.state.records.map(<T extends Partial<{[propsName: string]: any}>>(_: T) => (
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