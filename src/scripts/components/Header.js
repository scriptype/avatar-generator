import React from 'react'
import Title from '../modules/Title'

export default React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    parameters: React.PropTypes.object.isRequired
  },

  render() {
    console.log('Header.props', this.props)
    return (
      <div className='header'>
        <Title className='header__title'>
          Avatar Generator
        </Title>
      </div>
    )
  }
})
