import React from 'react'

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    colors: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
  },

  onChange(colorIndex, value) {
    var { onChange, colors, index } = this.props
    onChange(Object.assign([], colors, { [colorIndex]: value }))
  },

  shouldComponentUpdate(nextProps) {
    return this.props.colors.some(c => nextProps.colors.indexOf(c) < 0)
  },

  render() {
    var { className, colors, onChange } = this.props

    var classes = ['colorset']
    if (className) {
      classes.push(className)
    }

    return (
      <div className={classes.join(' ')}>
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
