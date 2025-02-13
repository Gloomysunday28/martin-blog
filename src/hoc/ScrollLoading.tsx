import React from 'react'
import Loading from '../router/Loading'

interface Ithrottle {
  (fn: (...arg: any[]) => void,  wait: number): (...arg: any[]) => void
}

let throttle: Ithrottle = function(fn, wait) { // 函数节流
  let timer: any = null
  let oldDate = +new Date()

  return function(...arg: any[]) {
    let nowDate = +new Date()
    
    if (timer) clearTimeout(timer)
    if (nowDate - oldDate < wait) {
      timer = setTimeout(_ => {
        timer = null
        fn && fn.apply(null, arg)
      }, wait)

      const canApply = !timer

      if (canApply) fn && fn.apply(null, arg)
    } else {
      fn && fn.apply(null, arg)
      oldDate = nowDate
    }
  }
}

type Istate = {
  page: number,
  next: boolean,
  total: number
}

const ScrollLoading = <T extends Partial<object>>( WrapperComponent: React.ComponentType<T> ) : React.ComponentType<T> => (
  class extends React.Component<T, Istate> {
    private childRef: any
    private OMain: any
    inputRef: any
    finish: boolean = false

    constructor(props: any) {
      super(props)
      this.inputRef = React.createRef()
      this.childRef = React.createRef()
    }

    readonly state = {
      page: 1,
      next: true,
      total: 0
    }

    getRef = (e: React.RefObject<HTMLInputElement>) => {
      this.OMain = document.querySelector('.g-main')
      this.OMain.addEventListener('scroll', this.getThrottleEvent, {
        passive: true
      })
    }

    getThrottleEvent = () => {
      let scrollEvent = throttle(this.scrollEvent, 1000)

      scrollEvent(this.OMain)
    }

    getNext = () => {
      if (this.state.page * 10 > this.state.total) this.finish = true
      this.setState(() => ({
        next: true
      }))
    }

    getTotal = (total: number) => {
      if (this.state.page * 10 > this.state.total) this.finish = true
      this.setState(() => ({
        total
      }))
    }

    scrollEvent = (ref: any) => {
      const scrollHeight = ref.scrollHeight
      const scrollTop = ref.scrollTop
      const clientHeight = ref.clientHeight

      const {current} = this.childRef

      if (this.state.next && current &&current.getData) {
        if (clientHeight + scrollTop + 200 > scrollHeight) {
          if (this.finish) {
          } else {
            this.setState((state: Istate) => ({
              next: false,
              page: ++state.page
            }), () => {
              current.getData(this.state.page)
            })
          }
        }
      }
    }

    componentWillUnmount() {
      if (this.OMain) {
        this.OMain.removeEventListener('scroll', this.getThrottleEvent)
      }
    }

    render() {
      const commonProps = {getTotal: this.getTotal, getRef: this.getRef, getNext: this.getNext, ...this.props}
      return <div>
        <WrapperComponent ref={this.childRef} {...commonProps} />
        {!this.state.next && <Loading />}
      </div>
    }
  }
)

export default ScrollLoading
