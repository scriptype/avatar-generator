import React from 'react'

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    isEnteringView: React.PropTypes.bool,
    isLeavingView: React.PropTypes.bool,
    colors: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
  },

  onChange(colorIndex, value) {
    var { onChange, colors, index } = this.props
    onChange(Object.assign([], colors, { [colorIndex]: value }))
  },

  shouldComponentUpdate(nextProps) {
    return (
      this.props.colors.some(c => nextProps.colors.indexOf(c) < 0) ||
      this.props.isEnteringView !== nextProps.isEnteringView ||
      this.props.isLeavingView !== nextProps.isLeavingView
    )
  },

  render() {
    var {
      className,
      isEnteringView,
      isLeavingView,
      colors,
      onChange
    } = this.props

    var classes = ['colorset']
    if (className) { classes.push(className) }
    var classNames = classes.join(' ')

    var mods = []
    if (isEnteringView) { mods.push('--is-entering-view') }
    if (isLeavingView) { mods.push('--is-leaving-view') }
    var modifiers = mods.map(m => classes[0] + m).join(' ')

    return (
      <div className={`${classNames} ${modifiers}`}>
        { colors.map((color, index) => (
            <input
              key={'color-' + index}
              className={classes.map(c => c + '__item').join(' ')}
              type='color'
              value={color}
              onChange={e => this.onChange(index, e.target.value)} />
        )) }
      </div>
    )
  }
})
