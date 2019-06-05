import React from 'react'
import { GetDouBanMovie } from '../../server/api'
import {
  Card
} from 'antd'

class MyMovie extends React.Component<{}, {
  movieList: any
}> {
  readonly state = {
    movieList: []
  }
  componentWillMount() {
    GetDouBanMovie().then((res: any) => {
      this.setState(() => ({
        movieList: res.data
      }))
    })
  }
  render() {
    return <div>
      {this.state.movieList.map((_: {url: string}) => (
        <Card style={{ width: 300 }} bordered={false} key={_.url}>
          <img src={_.url} alt=""/>
        </Card>
      ))}
    </div>
  }
}

export default MyMovie