import React from 'react'
import BlockList from '../modules/BlockList'

export default React.createClass({
  propTypes: {
    parameters: React.PropTypes.object.isRequired
  },

  render() {
    console.log('Content.props', this.props)
    return (
      <div className='content'>
        <BlockList
          items={[]}
          className='canvas-list' />
      </div>
    )
  }
})
