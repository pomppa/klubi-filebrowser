import React from 'react';
import PropTypes from 'prop-types';
import { withAuth0 } from '@auth0/auth0-react';

import Random from './Random';
import Files from './Files';

class Storage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      s3Url: '',
    };
  }

  componentDidMount() {
    const { auth0 } = this.props;
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    auth0.getAccessTokenSilently().then((token) => {
      fetch(
        `${apiBaseUrl}/api/aws/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((res) => res.json())
        .then(
          (result) => {
            const s3 = result.pop();
            const fileKeys = result.map((obj) => s3.url + obj.Key);

            this.setState({
              isLoaded: true,
              items: fileKeys,
              s3Url: s3.url,
              result,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          },
        );
    });
  }

  render() {
    const {
      error, isLoaded, items, s3Url, result,
    } = this.state;

    if (error) {
      return (
        <div>
          Error:
          {' '}
          {error.message}
        </div>
      );
    } if (!isLoaded) {
      return <div className="h-[360px]" />;
    }
    return (
      <div>
        <Random isLoaded={isLoaded} items={items} s3Url={s3Url} result={result} />
        <Files isLoaded={isLoaded} items={items} s3Url={s3Url} result={result} />
      </div>
    );
  }
}

Storage.propTypes = {
  getAccessTokenSilently: PropTypes.func,
  auth0: PropTypes.objectOf(withAuth0),
};

Storage.defaultProps = {
  getAccessTokenSilently: () => {},
  auth0: {},
};

export default withAuth0(Storage);
