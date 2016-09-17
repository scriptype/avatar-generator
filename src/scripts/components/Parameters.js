import React from 'react'
import FormControl from './FormControl'
import DropDown from './DropDown'
import Input from '../modules/Input'
import ColorSet from '../modules/ColorSet'

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

  onChangeColor(colorSetIndex, value) {
    var { onChange, colors } = this.props
    this.props.onChange('colors', Object.assign([], colors, { [colorSetIndex]: value }))
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

    var colorList = colors.map((colorSet, index) => (
        <ColorSet
          colors={colorSet}
          key={'colorset-' + index}
          onChange={value => this.onChangeColor(index, value)} />
    ))

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

        <FormControl title='Rotation (°)' className='parameters__row'>
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
            items={colorList} />
        </FormControl>

      </div>
    )
  }
})
