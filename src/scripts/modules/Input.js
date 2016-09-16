import React from 'react'

export default React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    className: React.PropTypes.string,
    value: React.PropTypes.any,
    min: React.PropTypes.any,
    max: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired,
    isMini: React.PropTypes.bool
  },

  render() {
    var type = this.props.type || 'text'
    var { className, value, min, max, onChange, isMini } = this.props

    var classes = ['input-field']
    if (className) {
      classes.push(className)
    }

    var mods = [`--${type}`]
    if (isMini) {
      mods.push('--mini')
    }

    var _className = (
      classes.join(' ') + ' ' +
      mods.map(mod => classes[0] + mod).join(' ')
    )

    var props = {
      type: type,
      className: _className,
      value: value,
      onChange: onChange
    }
    if (min) { props.min = min }
    if (max) { props.max = max }

    return (
      <input {...props} />
    )
  }
})
