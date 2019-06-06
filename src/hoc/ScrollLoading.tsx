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
  next: boolean
}

const ScrollLoading = <T extends Partial<object>>( WrapperComponent: React.ComponentType<T> ) : React.ComponentType<T> => (
  class extends React.Component<T, Istate> {
    private childRef: any
    inputRef: any
    finish: boolean = false

    constructor(props: any) {
      super(props)
      this.inputRef = React.createRef()
      this.childRef = React.createRef()
    }

    state = {
      page: 1,
      next: true
    }

    getRef = (e: React.RefObject<HTMLInputElement>) => {
      let scrollEvent = throttle(this.scrollEvent, 1000)

      let OMain: any = document.querySelector('.g-main')
      OMain.addEventListener('scroll', () => {
        scrollEvent(OMain)
      }, {
        passive: true
      })
    }

    getNext = () => {
      this.setState(() => ({
        next: true
      }))
    }

    scrollEvent = (ref: any) => {
      const scrollHeight = ref.scrollHeight
      const scrollTop = ref.scrollTop
      const clientHeight = ref.clientHeight

      const {current} = this.childRef

      if (this.state.next) {
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

    render() {
      const commonProps = {getRef: this.getRef, getNext: this.getNext, ...this.props}
      return <div>
        <WrapperComponent ref={this.childRef} {...commonProps} />
        {!this.state.next && <Loading />}
      </div>
    }
  }
)

export default ScrollLoading
