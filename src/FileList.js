import React from 'react';
import PropTypes from 'prop-types';

class Files extends React.Component {
  openInNewTab(url) {
    const newWindow = this.window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }

  render() {
    const { error, isLoaded, result } = this.props;
    const s3Url = this.props;

    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      );
    } if (!isLoaded) {
      return <div />;
    }

    return (
      <div className="flex flex-col">
        <h1 className="text-3xl text-center m-5">Files</h1>
        <table className="table-fixed w-full divide-y divide-gray-200">
          <thead className="border-b">
            <tr>
              <th scope="col" className="max-w-xs text-sm font-medium px-6 py-4 text-left">File</th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Last Modified</th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Size</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item) => (
              <tr className="border-b break-all" key={item.Key}>
                <td className="break-all cursor-pointer max-w-xs px-6 py-4 text-sm font-medium text-blue-600 hover:text-blue-800 visited:text-purple-600">
                  <a href={(s3Url) + (item.Key)}>{item.Key.split('/').pop()}</a>
                </td>
                <td className="break-all text-sm text-gray-900 font-light px-6 py-4 ">{ item.LastModified }</td>
                <td className="break-all text-sm text-gray-900 font-light px-6 py-4 ">{ item.Size }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Files.propTypes = {
  error: PropTypes.string,
  isLoaded: PropTypes.bool,
  result: PropTypes.arrayOf,
};

Files.defaultProps = {
  error: false,
  isLoaded: false,
  result: [],
};

export default Files;
