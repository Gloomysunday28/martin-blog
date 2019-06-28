import {observable, when} from 'mobx'
import { GetRecord } from '../../server/api'

const records = observable.array()

when (
  () => !records.length,
  () => {
    GetRecord(1).then((res: any) => {
      records.push(...res.data.items)
      // this.setState(() => ({
      //   records: res.data.items
      // }), () => {
      //   this.props.getRef && this.props.getRef()
      // })
    })
  }
)

export default records