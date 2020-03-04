import React from 'react';
import _CONFIG from '../AppConfig';
import PropTypes from 'prop-types';

import {
  useParams
} from "react-router-dom";

import DemoImage from '../assets/News_sample_1.jpg';

class ListPosts extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          error:null,
          isLoaded: false,
          newsItems: [],
          visible : 8
      }
      this.LoadMoreMeta = this.LoadMoreMeta.bind(this);
    }

    LoadMoreMeta(){
        this.setState((prev) => {
            return {visible: prev.visible + 8};
        });
    }
    
    componentDidMount() {
      let options = `?categories=${this.props.category}&per_page=${this.props.perPage}&order=${this.props.order}&offset=${this.props.offset}&_fields=${this.props.fields}`;
      fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.posts_router + options)
      .then(res => res.json())
        .then(
          (result) => {
            // Vì sao không json() luôn ở đây?
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
      const { error, isLoaded, newsItems, visible } = this.state;
      if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {

          switch(this.props.layout) {
            case 2:
              return (
                  <ul className="list-news list-flx-col">
                    {newsItems.map((item, index) => (
                      <li key={index} className="item">
                          <a href={item.slug} className="title" dangerouslySetInnerHTML={{__html: item.title.rendered}} />
                      </li>
                    ))}
                </ul>
              );
              break;
            case 3:
              return (
                <section className="list-news">
                  {newsItems.map((item) => (
                    <div key={item.id} className="news-item row">
                        <div className="col-4 col-md-4">
                            <a href={item.slug} className="box-img">
                                <img src={DemoImage} alt="" />
                            </a>
                        </div>
                        <div className="col-8 col-md-8">
                            <h4 className="box-title">
                              <a href={item.slug} dangerouslySetInnerHTML={{__html: item.title.rendered}} />
                            </h4>
                            <p className="box-meta">
                                <span className="location">Định cư - Nhập cảnh</span>
                                <span className="pubtime">07/02/2020</span>
                            </p>
                            <p className="txt">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti voluptas iure ipsum, nulla, provident ab magnam harum cupiditate sequi illum nisi deserunt accusamus temporibus est facilis aperiam. Aspernatur, laboriosam nihil?<a className="read-more" href="#">Đọc tiếp</a></p>
                        </div>
                    </div>
                  ))}
                </section>
              );
              break;
            default:
              // code block
              return (
                <>
                  <div className="row section-body">
                    {newsItems.slice(0, visible).map((item, index) => (
                      <div key={index} className="col-md-3">
                          <div className="news-item">
                              <div className="row">
                                  <div className="col-5 col-md-12">
                                      <a href={item.slug} className="box-img"><img src={item.jetpack_featured_media_url} alt={item.title.rendered} /></a>
                                  </div>
                                  <div className="col-7 col-md-12">
                                      <div className="box-text">
                                          <div className="box-title"><a href={item.slug} dangerouslySetInnerHTML={{__html: item.title.rendered}} /></div>
                                          <div className="publish-time">{item.date_gmt}</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    ))}
                  </div>
                  {
                    visible < newsItems.length &&
                    <div className="box-button">
                        <span onClick={this.LoadMoreMeta} className="button style2">Tải thêm</span>
                    </div>
                  }
                </>
              );
          }
      }
    }
  };
  ListPosts.propTypes = { 
    category: PropTypes.number,
    perPage: PropTypes.number,
    order: PropTypes.string,
    layout: PropTypes.number,
    offset: PropTypes.number,
    fields: PropTypes.string.isRequired
  }
  ListPosts.defaultProps = {
    layout: 1,
    order: 'desc',
    perPage: 10,
    offset: 0,
    fields: 'title,link'
  };
  export default ListPosts;