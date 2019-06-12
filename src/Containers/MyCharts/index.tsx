import React from 'react'
import { 
  Chart,
  Geom,
  Tooltip,
  Coord,
  Legend,
  Axis
} from 'bizcharts';
import {
  Card,
  Button,
  message
} from 'antd'
import { ApiInterface } from '../../interface/api'
import { GetZhiHuHot } from '../../server/api'

// 数据源
const data = [
  {
    year: "2001",
    population: 41.8
  },
  {
    year: "2002",
    population: 38
  },
  {
    year: "2003",
    population: 33.7
  },
  {
    year: "2004",
    population: 30.7
  },
  {
    year: "2005",
    population: 25.8
  },
  {
    year: "2006",
    population: 31.7
  },
  {
    year: "2007",
    population: 33
  },
  {
    year: "2008",
    population: 46
  },
  {
    year: "2009",
    population: 38.3
  },
  {
    year: "2010",
    population: 28
  },
  {
    year: "2011",
    population: 42.5
  },
  {
    year: "2012",
    population: 30.3
  }
];

interface ZhiHuIApi extends ApiInterface {
  data: {
    recent?: []
  }
}

interface ZhiHuRecent {
  [propName: string]: string
}

class MyCharts extends React.Component<{}, {
  zhihuList: any,
  isCheckIn: boolean
}> {
  readonly state = {
    zhihuList: {
      recent: []
    },
    isCheckIn: false
  }
  componentDidMount() {
    GetZhiHuHot().then((res: ZhiHuIApi) : any => {
      this.setState(() => ({
        zhihuList: {
          recent: (res.data.recent || []).map((_: ZhiHuRecent) => {
            return {
              x: _.title.slice(0, 3),
              y: [+_.news_id / 10000, +_.news_id / 1000]
            }
          })
        }
      }))
    })

    this.CheckIsCheckIn()
  }

  CheckIn = () => {
    message.success('签到成功')
    window.localStorage.setItem('checkIn', new Date().toLocaleDateString())
    this.CheckIsCheckIn()
  }

  CheckIsCheckIn = () => {
    const checkIn = localStorage.checkIn
    const now = new Date().toLocaleDateString()

    this.setState(() => ({
      isCheckIn: !!(checkIn === now)
    }))

    if (checkIn !== now) {
      window.localStorage.removeItem('checkIn')
    }
  }

  render() {
    return <Card bordered={false}>
      <Button style={{float: 'right'}} disabled={this.state.isCheckIn} type="dashed" icon="heart" onClick={this.CheckIn}>打卡签到</Button>
      <Card title="每年的幸福指数占比" style={{width: '85%'}} bordered={false}>
        {/* 饼状图 */}
        <Chart height={500} data={data} pixelRatio={window.devicePixelRatio*2} > 
          <Coord type="polar" innerRadius={0.2} />
          <Tooltip />
          <Legend />
          <Geom
            type="interval"
            color="year"
            position="year*population"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          />
        </Chart>
      </Card>
      <Card title="知乎日报阅读" style={{width: '85%'}} bordered={false}>
        <Chart height={400} data={this.state.zhihuList.recent} forceFit>
          <Axis name="x" />
          <Axis name="y" />
          <Tooltip />
          <Geom type="interval" position="x*y" />
        </Chart>
      </Card>
    </Card>
  }
}

export default MyCharts