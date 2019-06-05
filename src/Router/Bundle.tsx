import React from 'react'

type defaultProps = {
  load: (mode: any) => void,
  children: (mode: any) => React.ReactNode,
}

type defaultState = {
  mode: React.ReactNode
}

export default class Bundle extends React.Component<defaultProps, defaultState> {
  static defaultProps = {
    load: () => {}
  }
  readonly state: defaultState = {
    mode: null,
  };
  componentWillMount() {
    this.load(this.props)
  }
  componentWillReceiveProps(nextProps: defaultProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  load = (props: defaultProps) => {
    this.setState({
      mode: null
    })
    props.load((modes: {default: any}) => {
      this.setState({
        mode: modes.default ? modes.default : modes
      })
    })
  }
  render() {
    return this.props.children(this.state.mode)
  }
}
