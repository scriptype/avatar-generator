import React from 'react'
import FormControl from './FormControl'
import DropDown from './DropDown'
import Input from '../modules/Input'
import ColorSet from '../modules/ColorSet'
import RemoveIcon from '../modules/RemoveIcon'
import Button from '../modules/Button'

export default React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    quantity: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    rotation1: React.PropTypes.number.isRequired,
    rotation2: React.PropTypes.number.isRequired,
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
    onChange('colors', Object.assign([], colors, { [colorSetIndex]: value }))
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
        onChange('colors', leftPart.concat(rightPart))
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
      onChange('colors', [newColor].concat(colors))
      setTimeout(() => {
        this.setState({ isAddingNewColor: false })
      })
    })
  },

  render() {
    var {
      onChange,
      quantity,
      width,
      height,
      rotation1,
      rotation2,
      colors
    } = this.props

    var {
      isAddingNewColor,
      isRemovingColor,
      removingColorIndex
    } = this.state

    var colorList = colors.map((colorSet, index) => (
        <ColorSet
          isEnteringView={isAddingNewColor && index === 0}
          isLeavingView={isRemovingColor && index === removingColorIndex}
          colors={colorSet}
          onChange={value => this.onChangeColorSet(index, value)} />
    ))

    var colorListItemDecorator = (item, index) => {
      return (
          <RemoveIcon
            className='remove-color-icon'
            onClick={e => this.onRemoveColorSet(index)} />
      )
    }

    var colorListDecorator = () => {
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
      <div className='parameters'>

        <FormControl title='Quantity' className='parameters__row'>
          <Input
            type='number'
            value={quantity}
            min='1'
            isMini={true}
            onChange={e => onChange('quantity', +e.target.value)} />
        </FormControl>

        <FormControl title='Size' className='parameters__row'>
          <Input
            type='number'
            value={width}
            min='1'
            isMini={true}
            onChange={e => onChange('width', +e.target.value)} />
          {' x '}
          <Input
            type='number'
            value={height}
            min='1'
            isMini={true}
            onChange={e => onChange('height', +e.target.value)} />
        </FormControl>

        <FormControl title='Rotation (deg)' className='parameters__row'>
          <Input
            type='number'
            value={rotation1}
            min='0'
            max='360'
            isMini={true}
            onChange={e => onChange('rotation1', +e.target.value)} />
          {' , '}
          <Input
            type='number'
            value={rotation2}
            min='0'
            max='360'
            isMini={true}
            onChange={e => onChange('rotation2', +e.target.value)} />
        </FormControl>

        <FormControl title='Colors' className='parameters__row'>
          <DropDown
            title1='Expand color list'
            title2='Close'
            className='color-dropdown'
            items={colorList}
            itemDecorator={colorListItemDecorator}
            listDecorator={colorListDecorator} />
        </FormControl>

      </div>
    )
  }
})
