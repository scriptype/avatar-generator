import React from 'react'
import BlockList from '../modules/BlockList'
import AvatarCanvas from '../modules/AvatarCanvas'

export default React.createClass({
  propTypes: {
    parameters: React.PropTypes.object.isRequired
  },

  generateItems() {
    var {
      quantity,
      width,
      height,
      rotation,
      colors
    } = this.props.parameters

    return new Array(quantity)
      .join(' ')
      .split(' ')
      .map(e => (
          <AvatarCanvas {...{ width, height, rotation, colors }} />
      ))
  },

  render() {
    console.log('Content.props', this.props)
    var items = this.generateItems()
    return (
      <div className='content'>
        <BlockList
          items={items}
          className='canvas-list' />
      </div>
    )
  }
})
