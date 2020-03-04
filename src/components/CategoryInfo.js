import React from 'react';
import _CONFIG from '../AppConfig';
import PropTypes from 'prop-types';
import ListPosts from './ListPosts';

class CategoryInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaded: false,
            category: []
        }
    }
   
    componentDidMount() {
        let options = `/${this.props.id}?_fields=${this.props.fields}`;
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.categories_router + options)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    category: result
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
        const { error, isLoaded, category } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            switch(this.props.layout) {
                case 2:
                  return (
                    <div className="col-12 col-md-4">
                        <div className="flx-item">
                            <a href={category.link} className="cat-head">
                                <img src={this.props.headerImage} alt="" />
                                <span className="mask"></span>
                                <span className="cat-name">{category.name}</span>
                            </a>
                            <ListPosts layout={2} category={this.props.id} perPage={5} fields={'title,slug'} />
                            <div className="bx-enter">
                                <a href={category.link} className="enter">Xem thêm <i className="fas fa-angle-double-right"></i></a>
                            </div>
                        </div>
                    </div>
                  );
                  break;
                default:
                    return (
                    <>
                        <h2 className="section-title"><a href={category.link}>{category.name}</a></h2>
                        <p className="section-desc">{category.description}</p>
                        <ListPosts category={this.props.id} perPage={50} offset={1} order={"asc"} fields={"title,slug,jetpack_featured_media_url,date_gmt"}/>
                    </>
                );
            }
        }
    }
};

CategoryInfo.propTypes = {
    id: PropTypes.number.isRequired,
    fields: PropTypes.string.isRequired,
    layout: PropTypes.number 
}
CategoryInfo.defaultProps = {
    layout: 1,
  };

export default CategoryInfo