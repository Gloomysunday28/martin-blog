import {observable, when, reaction} from 'mobx'
import { GetRecord } from '../../server/api'

const recordObj = observable.object({
  next: true,
  page: 1,
  total: 0
}, {
  next: observable,
  page: observable,
  total: observable
})

// autorun(() => {console.log(1, recordObj)})
// recordObj.page = 3

const records = observable.array()

function getData() {
  recordObj.next = false
  GetRecord(recordObj.page).then((res: any) => {
    records.push(...res.data.items)
    recordObj.total = res.data.page.total
  })
}

// 初始化
when (
  () => !!recordObj.next,
  getData
)

reaction (
  () => recordObj.next,
  getData
)

export {
  recordObj,
  records
}