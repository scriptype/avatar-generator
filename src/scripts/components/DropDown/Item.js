import React from 'react'

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },

  render() {
    return (
      <li className={this.props.className}>
        { this.props.children }
      </li>
    )
  }
})
