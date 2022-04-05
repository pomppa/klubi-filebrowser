import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

class Random extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: null,
      isVideo: false,
      copied: false,
    };
  }

  componentDidMount() {
    this.fetchRandomMedia();
  }

  shouldComponentUpdate() {
    const { isLoaded } = this.props;
    return isLoaded;
  }

  fetchRandomMedia() {
    const { items } = this.props;
    const resource = items[Math.floor(Math.random() * items.length)];

    fetch(resource)
      .then((data) => {
        this.setState({
          resource,
          isVideo: data.headers.get('content-type').includes('video'),
        });
        return resource;
      });
  }

  render() {
    const { error, isLoading } = this.props;
    const errorMessage = error.message;

    const { resource, isVideo } = this.state;
    const { copied } = this.state;

    const btnStyle = copied
      ? 'text-sm bg-gray-300 hover:bg-gray-300 text-white-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow m-5 w-48'
      : 'text-sm bg-white hover:bg-gray-100 text-white-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow m-5 w-48';

    if (error && errorMessage) {
      return (
        <div>
          Error:
          {' '}
          {errorMessage}
        </div>
      );
    }
    if (isLoading) {
      return <div />;
    }

    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center m-5">Random</h1>
        <div>
          {isVideo
            ? (
              <div className="md:w-640 h-[360px] flex flex-col justify-center items-center">
                <ReactPlayer
                  url={resource}
                  playing
                  loop
                  controls
                  muted
                  width="100%"
                  height="100%"
                />
              </div>
            )
            : (
              <img className="flex flex-col justify-center items-center h-[360px] max-h-[360px]" alt="" src={resource} />
            )}
        </div>
        <div className="flex flex-col justify-center items-center m-5" style={{ paddingBottom: '25px' }}>
          <button
            type="button"
            className="text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => this.fetchRandomMedia()}
          >
            Refresh
          </button>
          <button
            type="button"
            className={btnStyle}
            onClick={() => {
              navigator.clipboard.writeText(resource).then(
                () => {
                  this.setState({
                    copied: true,
                  });

                  setTimeout(() => {
                    this.setState({
                      copied: false,
                    });
                  }, 2000);
                },
                () => {
                },
              );
            }}
          >
            { copied ? 'Copied ✓' : 'Copy URL to clipboard' }
          </button>
        </div>
      </div>
    );
  }
}

Random.propTypes = {
  error: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
};

Random.defaultProps = {
  error: '',
  items: [''],
  isLoading: false,
  isLoaded: false,
};

export default Random;
