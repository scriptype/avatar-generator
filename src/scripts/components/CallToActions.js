import React from 'react'
import Button from '../modules/Button'

export default React.createClass({
  propTypes: {
    onRegenerate: React.PropTypes.func
  },

  render() {
    return (
      <div className='call-to-actions'>

        <div className='call-to-actions__action'>
          <Button
            className='call-to-actions__button'
            isBig={true}
            onClick={this.props.onRegenerate}>
            Regenerate
          </Button>
        </div>

        <div className='call-to-actions__action'>
          <Button
            className='call-to-actions__button'
            isBig={true}
            isPrimary={true}
            onClick={this.onClickDownloadAll}>
            Download All (.zip)
          </Button>
        </div>

      </div>
    )
  }
})
