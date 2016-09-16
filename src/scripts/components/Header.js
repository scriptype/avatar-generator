import React from 'react'
import Title from '../modules/Title'
import Parameters from './Parameters'

export default React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    parameters: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className='header'>

        <Title className='header__title'>
          Avatar Generator
        </Title>

        <Parameters
          onChange={this.props.onChange}
          {...this.props.parameters} />

      </div>
    )
  }
})
