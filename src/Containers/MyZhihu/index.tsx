import React from 'react'
import {withRouter} from 'react-router-dom'
import { GetZhiHuHot } from '../../server/api'
import { ApiInterface } from '../../interface/api'
import MasonryLayout from '../../hoc/MasonaryLayout'
import { Card } from 'antd'
import { RouterProps } from '../../interface/router'

interface ZhihuLists {
  news_id: number,
  thumbnail: string,
  title: string,
  url: string
}

interface DefaultProps {
  getChildRef: () => void,
  masonry?: React.Ref<Element>
}

class Zhihu extends React.Component<RouterProps & DefaultProps> {
  readonly state = {
    zhihuList: {
      recent: []
    }
  }

  componentWillMount() {
    GetZhiHuHot().then((res: ApiInterface) : any => {
      this.setState(() => ({
        zhihuList: res.data
      }), () => {
        this.props.getChildRef() // 瀑布流
      })
    })
  }

  ToDetail = (url: string, id: number) : void => {
    window.sessionStorage.setItem('zhde', url)
    this.props.history.push('/my/zhihu/' + id)
  }
  
  render() {
    return <div className="grid" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '0 auto'}}>
      {this.state.zhihuList.recent.map((_: ZhihuLists) => (
        <Card className="grid-item" key={_.news_id} hoverable style={{width: 150, margin: '10px 0px'}} cover={<img alt="example" src={_.thumbnail} />} onClick={() => this.ToDetail(_.url, _.news_id)}>
          <div className="c-text__overflow">
            标题: {_.title}
          </div>
        </Card>
      ))}
    </div>
  }
}

export default MasonryLayout(withRouter(Zhihu))