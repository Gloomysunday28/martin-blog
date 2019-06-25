import React, { Suspense, lazy } from 'react'
import { RouterProps }from '../../interface/router'
import { GetArticleDetail } from '../../server/api'
import './detail.css'

const Loading = lazy(() => import('../../router/Loading'))

class RecordDetail extends React.Component<RouterProps, {
  detail: {}
}> {
  readonly state = {
    detail: {
      content: '',
      title: '',
      username: '',
      isTop: false,
      createOn: ''
    }
  }

  componentWillMount() {
    const detail = this.props.match.params.id
    GetArticleDetail(detail).then((res) => {
      this.setState(() => ({
        detail: res.data
      }))
    })
  }
  
  render() {
    const { detail } = this.state

    return <Suspense fallback={<Loading />}>
      <div style={{textAlign: 'left'}}>
        <div className="c-record__detail--title">
          <h3>{detail.title}</h3>
          <span className="c-record__detail--author">作者: {detail.username}</span>
          <span>创作时间: {detail.createOn.split('T')[0]}</span>
          {detail.isTop && <strong style={{float: 'right', color: '#F23545'}}>置顶</strong>}
        </div>
        <div style={{padding: 10}} dangerouslySetInnerHTML={{__html: detail.content}}>
        </div>
      </div>
    </Suspense> 
  }
}

export default RecordDetail