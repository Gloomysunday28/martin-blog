import React from 'react'
import {
  GetZhiHuHot
} from '../../server/api'
import {
  ApiInterface
} from '../../interface/api'
import {
  Card
} from 'antd'

interface ZhihuLists {
  news_id: number,
  thumbnail: string,
  title: string,
  url: string
}

class Zhihu extends React.Component {
  readonly state = {
    zhihuList: {
      recent: []
    }
  }

  componentWillMount() {
    GetZhiHuHot().then((res: ApiInterface) : any => {
      this.setState(() => ({
        zhihuList: res.data
      }))
    })
  }
  
  render() {
    return <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {this.state.zhihuList.recent.map((_: ZhihuLists) => (
        <Card key={_.news_id} hoverable bordered={false} style={{width: 150, margin: 10}} cover={<img alt="example" src={_.thumbnail} />}>
          <div className="c-text__overflow">
            标题: {_.title}
          </div>
        </Card>
      ))}
    </div>
  }
}

export default Zhihu