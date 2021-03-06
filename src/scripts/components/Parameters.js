import React from 'react'
import FormControl from './FormControl'
import ColorList from './ColorList'
import Input from '../modules/Input'

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
          <ColorList
            colors={colors}
            onChange={value => onChange('colors', value)} />
        </FormControl>

      </div>
    )
  }
})
