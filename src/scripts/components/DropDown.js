import React from 'react'

export default React.createClass({
  propTypes: {
    title1: React.PropTypes.string,
    title2: React.PropTypes.string,
    items: React.PropTypes.array,
    itemDecorator: React.PropTypes.func,
    listDecorator: React.PropTypes.func,
    className: React.PropTypes.string
  },

  CONTENT_ENTER_LEAVE: 200,

  getInitialState() {
    return {
      isContentVisible: false,
      isContentEnteringView: false,
      isContentLeavingView: false
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

  makeContentLeaveView() {
    this.setState({ isContentLeavingView: true }, () => {
      setTimeout(() => {
        this.setState({
          isContentLeavingView: false,
          isContentVisible: false
        })
      }, this.CONTENT_ENTER_LEAVE)
    })
  },

  makeContentEnterView() {
    this.setState({
      isContentEnteringView: true,
      isContentVisible: true
    }, () => {
      setTimeout(() => {
        this.setState({ isContentEnteringView: false })
      }, this.CONTENT_ENTER_LEAVE)
    })
  },

  clickOutsideHandler(event) {
    if (!this.isElementOfDropDown(event.target)) {
      this.makeContentLeaveView()
    }
  },

  pressESCHandler(event) {
    if (event.keyCode === 27 || event.which === 27) {
      this.makeContentLeaveView()
    }
  },

  toggleContent() {
    if (this.state.isContentVisible) {
      this.makeContentLeaveView()
    } else {
      this.makeContentEnterView()
    }
  },

  componentDidMount() {
    document.body.addEventListener('click', this.clickOutsideHandler)
    document.body.addEventListener('keydown', this.pressESCHandler)
  },

  componentWillUnmount() {
    document.body.removeEventListener('click', this.clickOutsideHandler)
    document.body.removeEventListener('keydown', this.pressESCHandler)
  },

  getClassName(suffix) {
    var classNames = ['dropdown']
    if (this.props.className) {
      classNames.push(this.props.className)
    }
    return classNames.map(c => c + (suffix || '')).join(' ')
  },

  render() {
    var {
      title1, title2,
      className, items,
      itemDecorator, listDecorator
    } = this.props

    var {
      isContentVisible,
      isContentEnteringView,
      isContentLeavingView
    } = this.state

    var cx = this.getClassName

    var contentMods = []
    if (isContentEnteringView) { contentMods.push('--is-entering-view') }
    if (isContentLeavingView) { contentMods.push('--is-leaving-view') }
    var contentModifiers = ' ' + contentMods.map(m => 'dropdown__content' + m).join(' ') + ' '

    return (
      <div className={cx()} ref='container'>

        <button
          type="button"
          className={cx('__handle') + ` ${isContentVisible ? cx('__handle--active') : ''}`}
          onClick={this.toggleContent}>
          { !isContentVisible ?
            (title1 || 'Click to expand menu') :
            (title2 || 'Close menu') }
        </button>

        <div className={cx('__content') + contentModifiers + (!isContentVisible ? ' hidden' : '')}>
          <ul className={cx('__list')}>
            { listDecorator && (
              <li key={'dropdown-decorator'} className={cx('__item')}>
                { listDecorator() }
              </li>
            ) }
            { items.map((item, index) => (
                <li key={'dropdown-item-' + index} className={cx('__item')}>
                  { item }
                  { itemDecorator && itemDecorator(item, index) }
                </li>
            )) }
          </ul>
        </div>

      </div>
    )
  }
})
