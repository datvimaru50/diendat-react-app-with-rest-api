import React from 'react';

import { useGetApi } from './Hooks/CustomHooks'

const WidgetListCategories = (props) => {
    const {error, isLoaded, itemArr} = useGetApi(props.routerName, props.queries);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (itemArr === null) return null
        return (
            <div id="list-cate" className="widget">
                <div className="widget-title">Chuyên mục bài viết</div>
                <div className="widget-body">
                    <ul>
                        {itemArr.map((item, idx) => (
                            <li key={idx}><a href={`/categories/${item.slug}`}>{item.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default WidgetListCategories;