import React from 'react'

export default React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    isPrimary: React.PropTypes.bool,
    isBig: React.PropTypes.bool
  },

  render() {
    var { type, className, onClick, isPrimary, isBig } = this.props

    var classes = ['button']
    if (className) { classes.push(className) }
    var classNames = classes.join(' ')

    var mods = []
    if (isPrimary) { mods.push('--primary') }
    if (isBig) { mods.push('--big') }
    var modifiers = mods.map(m => classes[0] + m).join(' ')

    var _className = classNames + ' ' + modifiers

    return (
        <button
          type={type || 'button'}
          className={_className}
          onClick={onClick}>
          { this.props.children }
        </button>
    )
  }
})
