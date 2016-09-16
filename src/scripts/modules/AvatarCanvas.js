import React from 'react'

export default React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    rotation1: React.PropTypes.number.isRequired,
    rotation2: React.PropTypes.number.isRequired,
    colors: React.PropTypes.array.isRequired
  },

  shuffle(arr) {
    return arr.sort(c => Math.round(Math.random()))
  },

  monteCarloMinimum() {
    var r1 = Math.random()
    var r2 = Math.random()
    if (r1 < r2 && r2 < Math.random()) {
      return r1
    }
    return this.monteCarloMinimum()
  },

  getRandomColorset() {
    var colors = this.props.colors
    return colors[~~(Math.random() * colors.length)]
  },

  colorsetToRandomAlpha(colorset) {
    return colorset.map(color => (
      'rgba(' + [
          color.slice(1, 3),
          color.slice(3, 5),
          color.slice(5)
        ].map(e => parseInt(e, 16)).join() + ',' + this.monteCarloMinimum() + ')'
    ))
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

  getAlternativePoint(x, y) {
    var { width, height } = this.props
    var minDiff = 10
    return [
      x + (Math.random() * width / 6 + minDiff) * (Math.random() > .5 ? 1 : -1),
      y + (Math.random() * height / 6 + minDiff) * (Math.random() > .5 ? 1 : -1)
    ]
  },

  drawRects(point, colors, rotation) {
    var [ X, Y ] = point
    var { width, height } = this.props
    var ctx = this.refs.canvas.getContext('2d')

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

    this.shuffle(colors).forEach((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(...rectCoords[i])
    })

    ctx.restore()
  },

  componentDidMount() {
    var colors = this.getRandomColorset()
    var [ X, Y ] = this.getRandomPoint()
    this.drawRects([X, Y], colors, this.props.rotation1)

    var RGBAColors = this.colorsetToRandomAlpha(colors)
    var [ AX, AY ] = this.getAlternativePoint(X, Y)
    this.drawRects([AX, AY], RGBAColors, this.props.rotation2)
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
