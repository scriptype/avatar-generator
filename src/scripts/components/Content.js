import React from 'react'
import BlockList from '../components/BlockList'
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
      rotation1,
      rotation2,
      colors
    } = this.props.parameters

    return new Array(quantity)
      .join(' ')
      .split(' ')
      .map(e => (
          <AvatarCanvas {...{ width, height, rotation1, rotation2, colors }} />
      ))
  },

  render() {
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
