import React from 'react'

export default React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    rotation1: React.PropTypes.number.isRequired,
    rotation2: React.PropTypes.number.isRequired,
    colors: React.PropTypes.array.isRequired,
    shouldRegenerate: React.PropTypes.bool.isRequired
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

  colorsetToRandomAlpha(colorset) {
    return colorset.map(color => (
      'rgba(' + [
          color.slice(1, 3),
          color.slice(3, 5),
          color.slice(5)
        ].map(e => parseInt(e, 16)).join() + ',' + this.monteCarloMinimum() + ')'
    ))
  },

  getRandomColorset() {
    var colors = this.props.colors
    return colors[~~(Math.random() * colors.length)]
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
      [ -W,      -H,      X + W + .3, Y + H + .3 ],
      [  X,      -H,      W,          Y + H + .3 ],
      [ -W,       Y - .3, X + W + .3, H ],
      [  X - .3,  Y - .3, W,          H ]
    ]

    colors.forEach((color, i) => {
      ctx.fillStyle = color
      ctx.fillRect(...rectCoords[i])
    })

    ctx.restore()
  },

  reset() {
    this.colors = this.shuffle(this.getRandomColorset())
    var [ X, Y ] = this.getRandomPoint()
    this.X = X
    this.Y = Y

    this.RGBAColors = this.shuffle(this.colorsetToRandomAlpha(this.colors))
    var [ AX, AY ] = this.getAlternativePoint(X, Y)
    this.AX = AX
    this.AY = AY
  },

  update() {
    requestAnimationFrame(() => {
      this.refs.canvas.width = this.props.width
      this.refs.canvas.height = this.props.height

      this.drawRects([this.X, this.Y], this.colors, this.props.rotation1)
      this.drawRects([this.AX, this.AY], this.RGBAColors, this.props.rotation2)
    })
  },

  componentDidMount() {
    this.reset()
    this.update()
  },

  componentDidUpdate(prevProps) {
    var isWidthChanged = prevProps.width !== this.props.width
    var isHeightChanged = prevProps.height !== this.props.height
    var { shouldRegenerate } = this.props
    if (isWidthChanged || isHeightChanged || shouldRegenerate) {
      this.reset()
    }
    this.update()
  },

  render() {
    return (
      <div className='avatar-canvas__wrapper'>
        <canvas
          className='avatar-canvas'
          ref='canvas'>
        </canvas>
      </div>
    )
  }
})
