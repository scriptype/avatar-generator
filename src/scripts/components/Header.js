import React from 'react'

export default React.createClass({
  render() {
    console.log('Header.props', this.props)
    return (
      <div className='header'>
        Header 
      </div>
    )
  }
})
