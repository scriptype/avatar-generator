import React from 'react'
import BlockList from '../components/BlockList'
import AvatarCanvas from '../modules/AvatarCanvas'

export default React.createClass({
  propTypes: {
    parameters: React.PropTypes.object.isRequired,
    shouldRegenerate: React.PropTypes.bool.isRequired
  },

  render() {
    var {
      parameters: {
        quantity,
        width,
        height,
        rotation1,
        rotation2,
        colors
      },
      shouldRegenerate
    } = this.props

    var items = new Array(quantity)
      .join(' ')
      .split(' ')
      .map(e => (
          <AvatarCanvas {...{
            width, height,
            rotation1, rotation2,
            colors,
            shouldRegenerate
          }} />
      ))

    return <BlockList items={items} className='canvas-list' />
  }
})
