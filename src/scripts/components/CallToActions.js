import React from 'react'
import JSZip from 'jszip'
import Button from '../modules/Button'

export default React.createClass({
  propTypes: {
    onRegenerate: React.PropTypes.func.isRequired,
    parameters: React.PropTypes.object.isRequired
  },

  contextTypes: {
    dispatcher: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    this.context.dispatcher.addListener('file-ready', this.onDataUrlReady)
  },

  componentWillUnmount() {
    this.context.dispatcher.removeListener('file-ready', this.onDataUrlReady)
  },

  onClickDownloadAll() {
    this.files = []
    this.context.dispatcher.emitEvent('download-all')
  },

  onDataUrlReady(dataUrl) {
    var { width, height, quantity } = this.props.parameters
    this.files.push({
      name: width + 'x' + height + '-' + this.files.length + '.png',
      dataUrl: dataUrl.replace('data:image/png;base64,', '')
    })

    if (this.files.length === quantity) {
      var zip = new JSZip()
      var folder = zip.folder('avatars')

      this.files.forEach(file => {
        folder.file(file.name, file.dataUrl, { base64: true })
      })

      zip.generateAsync({ type: 'base64' }).then(zip64 => {
        document.location.href = 'data:application/zip;base64,' + zip64
      })
    }
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
