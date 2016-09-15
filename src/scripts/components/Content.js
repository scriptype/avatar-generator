import React from 'react'

export default React.createClass({
  render() {
    console.log('Content.props', this.props)
    return (
      <div className='content'>
        Content
      </div>
    )
  }
})
