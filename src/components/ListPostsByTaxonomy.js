import React, { useState, useEffect } from 'react';
import _CONFIG from '../AppConfig';
import PropTypes from 'prop-types';

import {
    BrowserRouter as Router,
    Link,
    useParams
} from "react-router-dom";

import Breadcrumb from './Breadcrumb';

const ListPostsByTaxonomy = (props) => {
    // State hook !
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsItems, setNewsItems] = useState([]);

    const [taxonomyId, setTaxonomyId] = useState(1);

    const [totalPages, setTotalPages] = useState(0);

    let { taxonomy, slug, pageNo } = useParams();
    // Nếu mới vào trang liệt kê, chưa bấm phân trang thì mặc định pageNo = 1

    if(!pageNo) pageNo = 1;

    function fetchData() {
        // Gọi API theo slug của chuyên mục để lấy ID & tên chuyên mục
        fetch(_CONFIG.domain + _CONFIG.api + `${taxonomy}?slug=${slug}&_fields=name,id`)
        .then(
            res => res.json()
        ).then((result) => {
            if (result.length === 0){
                document.location.pathname = 'error'
            } else {
                setTaxonomyId(result[0]['id']);
                document.title = result[0]['name'];
                let options = `?page=${pageNo}&${taxonomy}=${result[0]['id']}&order=${props.order}&_fields=${props.fields}`;
    
                return fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.posts_router + options)
            }
        }
        )
        .then(
            (res) => {
                for (var pair of res.headers.entries()) {
                    // if(pair[0] == "x-wp-total") {
                    //     setTotalItems(pair[1]);
                    // }
                    if(pair[0] === "x-wp-totalpages") {
                        setTotalPages(pair[1]);
                    }
                }
                return res.json();
            }
            )
            .then(
            (result) => {
                setIsLoaded(true);
                setNewsItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }
    // Effect hook!
    useEffect(() => {
        fetchData();
    }, [taxonomy, slug, pageNo]);
   
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        let pageNumArr = [];
        for (let i=1; i<= totalPages; i++){
            pageNumArr.push(i)
        };
        return(
            <>
                <Breadcrumb 
                    identity={taxonomyId} 
                    routerName={taxonomy} 
                    queries = {{
                        '_fields': 'slug,name'
                    }} 
                />
                <section className="list-news">
                    {newsItems.map((item) => (
                    <div key={item.id} className="news-item row">
                        <div className="col-4 col-md-4">
                            <a href={item.slug} className="box-img">
                                <img src={item.jetpack_featured_media_url} alt="" />
                            </a>
                        </div>
                        <div className="col-8 col-md-8">
                            <h4 className="box-title">
                                <Link to={`/${item.slug}`} dangerouslySetInnerHTML={{__html: item.title.rendered}} />
                            </h4>
                            <p className="box-meta">
                                <span className="pubtime">{item.date_gmt}</span>
                            </p>
                            <p className="txt" dangerouslySetInnerHTML={{__html: item.excerpt.rendered}} />
                        </div>
                    </div>
                    ))}
                </section>
                {/* phân trang */}
                <div className="pagination">
                    {pageNo > 1 && <a href={`/${taxonomy}/${slug}/page/${parseInt(pageNo) - 1}`}>Prev</a>}
                    
                    {pageNumArr.map((pageNumber, index) => (
                        <Link key={index} className={`pageNumber${pageNumber == pageNo ? ' current' : ''}`} to={`/${taxonomy}/${slug}/page/${pageNumber}`}>{pageNumber}</Link>
                    ))}
                    
                    {pageNo < totalPages && <a href={`/${taxonomy}/${slug}/page/${parseInt(pageNo) + 1}`}>Next</a>}
                </div>
            </>
        );
    }
}
ListPostsByTaxonomy.propTypes = { 
    category: PropTypes.number,
    perPage: PropTypes.number,
    order: PropTypes.string,
    layout: PropTypes.number,
    fields: PropTypes.string.isRequired
  }
  ListPostsByTaxonomy.defaultProps = {
    layout: 1,
    order: 'desc',
    perPage: 10,
    fields: 'title,link'
  };

  export default ListPostsByTaxonomy;