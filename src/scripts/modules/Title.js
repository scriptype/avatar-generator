import React from 'react'

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },

  render() {
    var className = 'title ' + this.props.className || ''
    return (
      <h1 className={className}>
        {this.props.children}
      </h1>
    )
  }
})
