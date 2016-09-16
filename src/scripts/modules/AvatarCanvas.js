import React from 'react'

export default React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    rotation: React.PropTypes.number.isRequired,
    colors: React.PropTypes.array.isRequired
  },

  getRandomColorset() {
    var colors = this.props.colors
    var colorset = colors[~~(Math.random() * colors.length)]
    return colorset.sort(c => Math.round(Math.random()))
  },

  getRandomPoint() {
    var { width, height } = this.props
    var xRange =  width / 3
    var yRange = height / 3
    return [
      width / 3 + ~~(Math.random() * xRange),
      height / 3 + ~~(Math.random() * yRange)
    ]
  },

  componentDidMount() {
    var { width, height, rotation, colors } = this.props
    var ctx = this.refs.canvas.getContext('2d')

    var [ X, Y ] = this.getRandomPoint()
    ctx.save()
    ctx.translate(X, Y)
    ctx.rotate(rotation * Math.PI / 180)
    ctx.translate(-(width / 2), -(height / 2))
    var [ W, H ] = [ width * 2, height * 2 ]

    var rectCoords = [
      [ -W, -H, X + W, Y + W ],
      [  X, -H, W,     Y + H ],
      [ -W,  Y, X + W, H ],
      [  X,  Y, W,     H ]
    ]

    var colors = this.getRandomColorset()
    colors.forEach((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(...rectCoords[i])
    })

    ctx.restore()
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
