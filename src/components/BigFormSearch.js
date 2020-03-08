import React from 'react';

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  connectStateResults,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';

import PropTypes from 'prop-types';
// import SearchResultLite from './SearchResultLite';

const searchClient = algoliasearch(
  'DJ34XDBF7V',
  '88f5d78a9430ad20cd4907b924180f95'
);

const Results = connectStateResults(
  ({ searchState, searchResults, children }) => {

    if (searchState && searchState.query) {
      if (searchResults && searchResults.nbHits !== 0) {
        return (
          <div className="Results_Pane">
            <p>Kết quả tìm kiếm cho từ khóa: <b>{searchState.query}</b></p>
            {children}
          </div>
        )
      } else {
        return (
          <div>Không tìm thấy kết quả cho từ khóa: <b>{searchState.query}</b>.</div>
        )
      }
    } else {
      return (
        <></>
      )
    }
  }
);


export default class BigFormSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        submit: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
      this.setState({
        input: event.target.value
      })
    }
    handleSubmit(event) {
      event.preventDefault()
      this.setState({
        submit: true
      });
    }
    render() {
      return (
        
          <section id="google-search">
              <div className="container">
                <div className="basic-text">Bạn muốn học: {this.state.input} {this.state.input === '' && <span className="sbj">ABC</span>} căn bản?</div>
                  {/* <form id="box-search" onSubmit={this.handleSubmit}>
                      <input placeholder="Excel, Tiếng Anh giao tiếp, Javascript, ..." className="left" type="text" onChange={this.handleChange} value={this.state.input} />
                      <button className="right" type="submit"><i className="fas fa-search"></i></button>
                  </form> */}
                  {
                    // this.state.submit &&
                    // <SearchResultLite query={this.state.input} fields={'title,url'} />
                  }
                  <InstantSearch searchClient={searchClient} indexName="React-Theme">

                    <SearchBox className="search-box" translations = {{placeholder:'Search Box'}}/>
                    <Results>
                      <Hits hitComponent={Hit} />
                    </Results>
                  </InstantSearch>
                  
              </div>
          </section>
      );
    }
  };

  function Hit(props) {
    return (
        <a href={`/${props.hit.slug}`}>
          <Highlight attribute="title.rendered" hit={props.hit} />
        </a>
    );
  }
  
  Hit.propTypes = {
    hit: PropTypes.object.isRequired,
  };
