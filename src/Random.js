import React from 'react'
import ReactPlayer from 'react-player'

class Random extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      resource: null,
      isVideo: false,
      copied: false
    }
  }

  shouldComponentUpdate () {
    return !!this.props.isLoaded
  }

  componentDidMount () {
    const items = this.props.items
    const resource = items[Math.floor(Math.random() * items.length)]

    fetch(resource)
      .then(data => {
        this.setState({
          resource: resource,
          isVideo: !!data.headers.get('content-type').includes('video')
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    const { error, isLoading } = this.props
    const { resource, isVideo } = this.state
    const btnStyle = this.state.copied
      ? 'text-sm bg-gray-300 hover:bg-gray-300 text-white-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow m-5 w-48'
      : 'text-sm bg-white hover:bg-gray-100 text-white-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow m-5 w-48'

    if (error) {
      return <div>Error: {error.message}</div>
    }
    if (isLoading) {
      return <div></div>
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl text-center m-5">Random</h1>

            <div>

            {isVideo
              ? (
                <div className="flex flex-col justify-center items-center">
                <ReactPlayer
                    url={resource}
                    playing={true}
                    loop={true}
                    controls={true}
                    muted={true}
                />
            </div>
                )
              : (
            <img className="flex flex-col justify-center items-center h-[360px] max-h-[360px]" alt='' src={resource}></img>
                )}
        </div>
        <div className="flex flex-col justify-center items-center m-5" style={{ paddingBottom: '25px' }}>
              <button className="text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => this.componentDidMount()}>Refresh</button>
              <button className={btnStyle}
              onClick={() => {
                navigator.clipboard.writeText(this.state.resource).then(() => {
                  this.setState({
                    copied: true
                  })
                  console.log(this.state.copied)

                  setTimeout(() => {
                    this.setState({
                      copied: false
                    })
                    console.log(this.state.copied)
                  }, 2000)
                },
                () => {
                })
              }}>
                { this.state.copied ? 'Copied ✓' : 'Copy URL to clipboard' }
              </button>
            </div>

        </div>
    )
  }
}

export default Random
