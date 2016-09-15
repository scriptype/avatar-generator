import React from 'react'

export default React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    rotation: React.PropTypes.number.isRequired,
    colors: React.PropTypes.array.isRequired
  },

  getRandomColor() {
    var colors = this.props.colors
    return colors[~~(Math.random() * colors.length)]
  },

  componentDidMount() {
    var { width, height, rotation, colors } = this.props
    var ctx = this.refs.canvas.getContext('2d')
    ctx.fillStyle = this.getRandomColor()
    ctx.fillRect(0, 0, width, height)
  },

  render() {
    return (
      <div className='avatar-canvas__wrapper'>
        <canvas
          className='avatar-canvas'
          ref='canvas'
          width={this.props.width}
          height={this.props.height}>
        </canvas>
      </div>
    )
  }
})
