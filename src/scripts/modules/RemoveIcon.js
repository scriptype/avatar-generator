import React from 'react'

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  render() {
    var { className, onClick } = this.props

    var classes = ['remove-icon']
    if (className) {
      classes.push(className)
    }

    return (
      <button
        type="button"
        className={classes.join(' ')}
        title='remove'
        onClick={onClick}>
        Remove
      </button>
    )
  }
})
