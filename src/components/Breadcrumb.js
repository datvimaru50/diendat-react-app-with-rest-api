import React, { useState, useEffect } from 'react';
import _CONFIG from '../AppConfig';


const Breadcrumb = (props) => {
    // state hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});

    function fetchData(){
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.categories_router + `/${props.category}?_fields=slug,name`)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setResult(result);
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

    }, [props.category]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div id="mv-breadcrumb">
                <span className="br-item"><a href="/">Trang chủ</a> <span className="bor">\</span></span>
                <span className="br-item"><a href={`/categories/${result.slug}`}>{result.name}</a> <span className="bor">\</span></span>
            </div>
        );
    }

}
export default Breadcrumb;