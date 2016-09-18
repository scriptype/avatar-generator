import React from 'react'
import DropDown from './DropDown'
import ColorSet from '../modules/ColorSet'
import RemoveIcon from '../modules/RemoveIcon'
import Button from '../modules/Button'

export default React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    colors: React.PropTypes.array.isRequired
  },

  COLOR_ENTER_LEAVE: 200,

  getInitialState() {
    return {
      isAddingNewColor: false,
      isRemovingColor: false
    }
  },

  onChangeColorSet(colorSetIndex, value) {
    var { onChange, colors } = this.props
    onChange(Object.assign([], colors, { [colorSetIndex]: value }))
  },

  onRemoveColorSet(colorSetIndex) {
    var { onChange, colors } = this.props
    var leftPart = colors.slice(0, colorSetIndex)
    var rightPart = colors.slice(colorSetIndex + 1)
    this.setState({
      isRemovingColor: true,
      removingColorIndex: colorSetIndex
    }, () => {
      setTimeout(() => {
        onChange(leftPart.concat(rightPart))
        this.setState({
          isRemovingColor: false,
          removingColorIndex: -1
        })
      }, this.COLOR_ENTER_LEAVE)
    })
  },

  onAddColorSet() {
    var { onChange, colors } = this.props
    var newColor = ['#ffffff', '#ffffff', '#ffffff', '#ffffff']
    this.setState({ isAddingNewColor: true }, () => {
      onChange([newColor].concat(colors))
      setTimeout(() => {
        this.setState({ isAddingNewColor: false })
      })
    })
  },

  render() {
    var { onChange, colors } = this.props

    var {
      isAddingNewColor,
      isRemovingColor,
      removingColorIndex
    } = this.state

    var items = colors.map((colorSet, index) => (
        <ColorSet
          isEnteringView={isAddingNewColor && index === 0}
          isLeavingView={isRemovingColor && index === removingColorIndex}
          colors={colorSet}
          onChange={value => this.onChangeColorSet(index, value)} />
    ))

    var itemDecorator = (item, index) => {
      return colors.length > 1 && (
          <RemoveIcon
            className='remove-color-icon'
            onClick={e => this.onRemoveColorSet(index)} />
      )
    }

    var listDecorator = () => {
      return (
          <Button
            className='add-color-row'
            isPrimary={true}
            onClick={this.onAddColorSet}>
            Add new colorset
          </Button>
      )
    }

    return (
        <DropDown
          title1='Expand color list'
          title2='Close'
          className='color-list'
          items={items}
          itemDecorator={itemDecorator}
          listDecorator={listDecorator} />
    )
  }
})
