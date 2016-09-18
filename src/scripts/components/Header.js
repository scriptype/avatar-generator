import React from 'react'
import Title from '../modules/Title'
import Parameters from './Parameters'
import CallToActions from './CallToActions'

export default React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    onRegenerate: React.PropTypes.func.isRequired,
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

        <CallToActions
          onRegenerate={this.props.onRegenerate} />

      </div>
    )
  }
})
