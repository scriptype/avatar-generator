import React from 'react'
import Header from './Header'
import Content from './Content'
import EventEmitter from 'wolfy87-eventemitter'

var dispatcher = new EventEmitter()

export default React.createClass({
  childContextTypes: {
    dispatcher: React.PropTypes.object
  },

  getChildContext() {
    return { dispatcher }
  },

  getInitialState() {
    return {
      parameters: {
        quantity: 50,
        width: 100,
        height: 100,
        rotation1: 330,
        rotation2: 345,
        colors: [
          [ '#3c2e3d', '#fcad84', '#ecc7bf', '#8acbc7' ],
          [ '#183346', '#e8c77a', '#e2b49a', '#99abb9' ],
          [ '#4abbf3', '#61bfbe', '#baddd6', '#ffb5ba' ],
          [ '#fad6a6', '#f9b69c', '#866667', '#e25d6e' ],
          [ '#125488', '#2a93d4', '#3dd9d6', '#add9d8' ],
          [ '#6ed3cf', '#9068be', '#e1e8f0', '#e62739' ],
          [ '#6441a4', '#eaeaea', '#3a3335', '#454851' ],
          [ '#494747', '#21a8a3', '#f2e6e6', '#e2001a' ],
          [ '#00a6ed', '#f6ae2d', '#ff652d', '#1e1407' ],
          [ '#eeebd0', '#0fff95', '#f71735', '#fffbbd' ],
          [ '#ffc857', '#e9724c', '#f8f4e3', '#e5446d' ],
          [ '#4c6085', '#39a0ed', '#36f1cd', '#13c4a3' ],
          [ '#64a6bd', '#f5cb5c', '#cc2936', '#595959' ],
          [ '#2d2d33', '#d4d4d1', '#fefefe', '#385098' ],
          [ '#000000', '#ff534b', '#021542', '#0241e2' ]
        ]
      },
      shouldRegenerate: false
    }
  },

  onChangeParameter(parameter, value) {
    this.setState({
      parameters: Object.assign({}, this.state.parameters, {
        [parameter]: value
      })
    })
  },

  onRegenerate() {
    this.setState({ shouldRegenerate: true }, () => {
      this.setState({ shouldRegenerate: false })
    })
  },

  render() {
    return (
      <div className='main'>

        <Header
          onChange={this.onChangeParameter}
          onRegenerate={this.onRegenerate}
          parameters={this.state.parameters} />

        <Content
          parameters={this.state.parameters}
          shouldRegenerate={this.state.shouldRegenerate} />

      </div>
    )
  }
})
