import React, { Suspense, lazy } from 'react'
import { GetSmile } from '../../server/api'
import { ApiInterface } from '../../interface/api'
import { Card } from 'antd'
import { RouterProps } from '../../interface/router'
import MasonryLayout from '../../hoc/MasonaryLayout'
import ScrollLoading from '../../hoc/ScrollLoading'

const Loading = lazy(() => import('../../router/Loading'))

interface SmileApi extends ApiInterface {
  data: {
    data: {
      list: []
    }
  }
}

interface SmileLists {
  content: string,
  updateTime: string
}

interface DefaultProps {
  getChildRef: () => void,
  getNext: () => void,
  getRef: (e: React.RefObject<HTMLInputElement>) => void,
}

class Smile extends React.Component<RouterProps & DefaultProps> {
  readonly state = {
    smileList: []
  }

  componentWillMount() {
    Promise.all([
      this.getData(1),
      this.getData(2),
    ])
  }

  getData = (page: number) => {
    GetSmile(page).then((res: SmileApi) : any => {
      this.setState((state: any) => ({
        smileList: [...state.smileList, ...res.data.data.list]
      }), () => {
        this.props.getChildRef && this.props.getChildRef() // 瀑布流
        this.props.getNext && this.props.getNext() // 获取下一个
      })
    })
  }

  // 获取实例
  getRef = (e: any) => {
    this.props.getRef(e)
  }
  
  render() {
    return <Suspense fallback={<Loading />}>
      <div ref={this.getRef} className="grid" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '0 auto'}}>
        {this.state.smileList.map((_: SmileLists, index: number) => (
          <Card className="grid-item" key={index} hoverable bordered={false} style={{width: 200, margin: 20}} >
            <div style={{textAlign: 'left', fontSize: 12, marginBottom: 10, borderBottom: '1px solid #ccc'}}>
              更新时间: {_.updateTime}
            </div>
            <div className="c-text__overflow">
              {_.content}
            </div>
          </Card>
        ))}
      </div>
    </Suspense>
  }
}

export default MasonryLayout(ScrollLoading(Smile))