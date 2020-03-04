import React from 'react';
import _CONFIG from '../AppConfig';
// import PropTypes from 'prop-types';

export default class SearchResultLite extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          error:null,
          isLoaded: false,
          newsItems: [],
      }
    }

    componentDidMount() {
        let options = `?search=${this.props.query}&_fields=${this.props.fields}`;
      fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.search_router + options)
      .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              newsItems: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    render() {
      const { error, isLoaded, newsItems } = this.state;
      if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
                <div className="search-result">
                    {newsItems.map((item, index) => (
                        <a key={index} href={item.url} dangerouslySetInnerHTML={{__html: item.title}} />
                    ))}
               </div>
            );
          
      }
    }
  };
 