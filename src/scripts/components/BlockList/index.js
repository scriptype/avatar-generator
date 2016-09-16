import React from 'react'
import Item from './Item'

export default React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    className: React.PropTypes.string
  },

  render() {
    var classNames = ['block-list']
    if (this.props.className) {
      classNames.push(this.props.className)
    }

    if (!this.props.items.length) {
      return (
        <p className={classNames.map(c => c + '--empty').join(' ')}>
          No items are found to list here.
        </p>
      )
    }

    return (
      <ul className={classNames.join(' ')}>
        { this.props.items.map((item, index) => (
            <Item
              key={index}
              className={this.props.className}>
              { item }
            </Item>
        )) }
      </ul>
    )
  }
})
