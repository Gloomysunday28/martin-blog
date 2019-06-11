import React, { Suspense, lazy } from 'react'
import { GetZhiHuHotDetail } from '../../server/api'

const Loading = lazy(() => import('../../router/Loading'))

class RecordDetail extends React.Component {
  readonly state = {
    detail: {
      body: '',
      css: []
    }
  }

  componentWillMount() {
    const detail = window.sessionStorage.zhde
    GetZhiHuHotDetail(detail).then((res) => {
      this.setState(() => ({
        detail: res.data
      }))
    })
  }
  
  render() {
    return <Suspense fallback={<Loading />}>
      <div dangerouslySetInnerHTML={{__html: this.state.detail.body}}>
      </div>
    </Suspense> 
  }
}

export default RecordDetail