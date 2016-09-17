import React from 'react'
import Item from './Item'

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    items: React.PropTypes.array,
    className: React.PropTypes.string
  },

  getInitialState() {
    return {
      isContentVisible: false
    }
  },

  isElementOfDropDown(target) {
    var parentNode = target.parentNode
    if (parentNode === document.body) {
      return false
    } else if (parentNode === this.refs.container) {
      return true
    }
    return this.isElementOfDropDown(parentNode)
  },

  clickOutsideHandler(event) {
    if (!this.isElementOfDropDown(event.target)) {
      this.setState({
        isContentVisible: false
      })
    }
  },

  componentDidMount() {
    document.body.addEventListener('click', this.clickOutsideHandler)
  },

  componentWillUnmount() {
    document.body.removeEventListener('click', this.clickOutsideHandler)
  },

  toggleContent() {
    this.setState({
      isContentVisible: !this.state.isContentVisible
    })
  },

  getClassName(suffix) {
    var classNames = ['dropdown']
    if (this.props.className) {
      classNames.push(this.props.className)
    }
    return classNames.map(c => c + (suffix || '')).join(' ')
  },

  render() {
    var { title, items, className } = this.props
    var { isContentVisible } = this.state
    var cx = this.getClassName

    return (
      <div className={cx()} ref='container'>

        <button
          className={cx('__handle') + ` ${isContentVisible ? cx('__handle--active') : ''}`}
          onClick={this.toggleContent}>
          { title || 'Click to expand menu' }
        </button>

        <div className={cx('__content') + (!isContentVisible ? ' hidden' : '')}>
          <ul className={cx('__list')}>
            { items.map((item, index) => (
                <Item key={index} className={cx('__item')}>
                  { item }
                </Item>
            )) }
          </ul>
        </div>

      </div>
    )
  }
})
