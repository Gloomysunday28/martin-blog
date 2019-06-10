import React from 'react'
import Masonry from 'masonry-layout'

const MasonryLayout = <T extends object>(WrapperComponent: React.ComponentType<T>): React.ComponentType<T> => (
  class extends React.Component<T> {
    getChildRef() {
      new Masonry('.grid', {
        itemSelector: '.grid-item',
        columnWidth: 80,
        fitWidth: true
      })
    }
    
    render() {
      const commonProps = {getChildRef: this.getChildRef, ...this.state, ...this.props}
      return <WrapperComponent {...commonProps}/>
    }
  }
)

export default MasonryLayout