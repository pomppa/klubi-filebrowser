import React from 'react'
import Random from './Random'
import FileList from './FileList'
import { withAuth0 } from '@auth0/auth0-react'

class Storage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount () {
    const { getAccessTokenSilently } = this.props.auth0
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

    getAccessTokenSilently().then(token => {
      fetch(`${apiBaseUrl}/api/aws/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then(res => res.json())
        .then(
          (result) => {
            // s3 url stored elegantly as last so we can pop it ¯\_(ツ)_/¯
            const s3 = result.pop()

            const fileKeys = result.map(function (obj) {
              return s3.url + obj.Key
            })

            this.setState({
              isLoaded: true,
              items: fileKeys,
              result: result,
              s3Url: s3.url
            })
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            })
          }
        )
    })
  }

  render () {
    const { error, isLoaded } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div className="h-[360px]"></div>
    } else {
      return (
        <div>
            <Random {... this.state}></Random>
            <FileList {... this.state }></FileList>
        </div>
      )
    }
  }
}

export default withAuth0(Storage)
