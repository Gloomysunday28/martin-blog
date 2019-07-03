import {observable, when} from 'mobx'
import { GetRecord } from '../../server/api'

// const recordObj = observable.object({
//   next: true,
//   records: []
// }, {
//   next: observable,
//   records: observable
// })

// console.log(Object.prototype.toString.call(recordObj.records)

const records = observable.array()

// 当records为空时就会执行
when (
  () => !records.length,
  () => {
    GetRecord(1).then((res: any) => {
      records.push(...res.data.items)
    })
  }
)

export default records