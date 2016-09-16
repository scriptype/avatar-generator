import React from 'react'
import Header from './Header'
import Content from './Content'

export default React.createClass({
  getInitialState() {
    return {
      parameters: {
        quantity: 50,
        width: 100,
        height: 100,
        rotation1: -30,
        rotation2: -15,
        colors: [
          [ '#3c2e3d', '#fcad84', '#ecc7bf', '#8acbc7' ],
          [ '#183346', '#e8c77a', '#e2b49a', '#99abb9' ],
          [ '#4abbf3', '#61bfbe', '#baddd6', '#ffb5ba' ],
          [ '#fad6a6', '#f9b69c', '#866667', '#e25d6e' ],
          [ '#125488', '#2a93d4', '#3dd9d6', '#add9d8' ],
          [ '#6ed3cf', '#9068be', '#e1e8f0', '#e62739' ],
          [ '#6441A4', '#EAEAEA', '#3A3335', '#454851' ],
          [ '#494747', '#21A8A3', '#F2E6E6', '#E2001A' ],
          [ '#00A6ED', '#F6AE2D', '#FF652D', '#1E1407' ],
          [ '#EEEBD0', '#0FFF95', '#F71735', '#FFFBBD' ],
          [ '#FFC857', '#E9724C', '#F8F4E3', '#E5446D' ],
          [ '#4C6085', '#39A0ED', '#36F1CD', '#13C4A3' ],
          [ '#64A6BD', '#F5CB5C', '#CC2936', '#595959' ],
          [ '#2d2d33', '#d4d4d1', '#fefefe', '#385098' ],
          [ '#000000', '#ff534b', '#021542', '#0241e2' ]
        ]
      }
    }
  },

  onChangeParameter(parameter, value) {
    this.setState({
      parameters: Object.assign({}, this.state.parameters, {
        [parameter]: value
      })
    })
  },

  render() {
    return (
      <div className='main'>

        <Header
          onChange={this.onChangeParameter}
          parameters={this.state.parameters} />

        <Content
          parameters={this.state.parameters} />

      </div>
    )
  }
})
