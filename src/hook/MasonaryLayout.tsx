import React, {useEffect} from 'react'
import Masonry from 'masonry-layout'

const MasonryLayout = (WrapperComponent: React.ComponentType) => {
  useEffect(() => {
    new Masonry('.grid', {
      itemSelector: '.grid-item',
      columnWidth: 80,
      fitWidth: true
    })
  })

  return <WrapperComponent />
}

export default MasonryLayout