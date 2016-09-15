import React from 'react'
import Header from './Header'
import Content from './Content'

export default React.createClass({
  getInitialState() {
    return {
      parameters: {
        width: 160,
        height: 160,
        rotation: 0,
        colors: [
          'hotpink',
          'cyan',
          'springgreen',
          'orangered',
          'salmon',
          'rebeccapurple',
          'yellow',
          'magenta',
          'royalblue',
          'skyblue'
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
