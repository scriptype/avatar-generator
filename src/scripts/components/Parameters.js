import React from 'react'

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

        <label>
          Quantity:
          <input
            type='number'
            value={quantity}
            onChange={e => onChange('quantity', +e.target.value)} />
        </label>

        <br />

        <label>
          Size:
          <input
            type='number'
            value={width}
            onChange={e => onChange('width', +e.target.value)} />
          x
          <input
            type='number'
            value={height}
            onChange={e => onChange('height', +e.target.value)} />
        </label>

        <br />

        <label>
          Rotation (°):
          <input
            type='number'
            value={rotation1}
            onChange={e => onChange('rotation1', +e.target.value)} />
          ,
          <input
            type='number'
            value={rotation2}
            onChange={e => onChange('rotation2', +e.target.value)} />
        </label>

      </div>
    )
  }
})
