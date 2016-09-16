import React from 'react'
import AvatarCanvas from '../modules/Input'

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    className: React.PropTypes.string
  },

  render() {
    var { title, className } = this.props

    var classes = ['form-control']
    var labelClasses = ['form-control__label']
    var innerClasses = ['form-control__inner']

    if (className) {
      classes.push(className)
      labelClasses.push(`${className}-label`)
      innerClasses.push(`${className}-inner`)
    }

    var _className = classes.join(' ')
    var _labelClassName = labelClasses.join(' ')
    var _innerClassName = innerClasses.join(' ')

    return (
      <div className={_className}>
        <label className={_labelClassName}>
          { `${title}: ` }
        </label>
        <div className={_innerClassName}>
          { this.props.children }
        </div>
      </div>
    )
  }
})
