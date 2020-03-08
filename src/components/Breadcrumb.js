import React from 'react';
import { useGetApi } from './Hooks/CustomHooks'

const Breadcrumb = (props) => {
    const {error, isLoaded, itemArr} = useGetApi(props.routerName, props.queries, props.identity);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div id="mv-breadcrumb">
                <span className="br-item"><a href="/">Trang chủ</a> <span className="bor">\</span></span>
                <span className="br-item"><a href={`/${props.routerName}/${itemArr.slug}`}>{itemArr.name}</a> <span className="bor">\</span></span>
            </div>
        );
    }

}
export default Breadcrumb;