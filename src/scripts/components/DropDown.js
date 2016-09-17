import React from 'react'

export default React.createClass({
  propTypes: {
    title1: React.PropTypes.string,
    title2: React.PropTypes.string,
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
    var { title1, title2, items, className } = this.props
    var { isContentVisible } = this.state
    var cx = this.getClassName

    return (
      <div className={cx()} ref='container'>

        <button
          className={cx('__handle') + ` ${isContentVisible ? cx('__handle--active') : ''}`}
          onClick={this.toggleContent}>
          { !isContentVisible ?
            (title1 || 'Click to expand menu') :
            (title2 || 'Close menu') }
        </button>

        <div className={cx('__content') + (!isContentVisible ? ' hidden' : '')}>
          <ul className={cx('__list')}>
            { items.map((item, index) => (
                <li key={'dropdown-item-' + index} className={cx('__item')}>
                  { item }
                </li>
            )) }
          </ul>
        </div>

      </div>
    )
  }
})
