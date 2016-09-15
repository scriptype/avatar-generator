import React from 'react'

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },

  render() {
    var classNames = ['block-list']
    if (this.props.className) {
      classNames.push(this.props.className)
    }

    return (
      <li className={classNames.map(c => c + '__item').join(' ')}>
        { this.props.children }
      </li>
    )
  }
})
