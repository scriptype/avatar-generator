import React from 'react'

export default React.createClass({
  propTypes: {
    parameters: React.PropTypes.object.isRequired
  },

  render() {
    console.log('Content.props', this.props)
    return (
      <div className='content'>
        Content
      </div>
    )
  }
})
