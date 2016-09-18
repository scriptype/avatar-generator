import React from 'react'
import CanvasList from './CanvasList'

export default React.createClass({
  propTypes: {
    parameters: React.PropTypes.object.isRequired,
    shouldRegenerate: React.PropTypes.bool.isRequired
  },

  render() {
    return (
      <div className='content'>

        <CanvasList
          parameters={this.props.parameters}
          shouldRegenerate={this.props.shouldRegenerate} />

      </div>
    )
  }
})
