import { useState, useEffect } from 'react';
import _CONFIG from '../../AppConfig';

    /*  
        @name: useGetApi
        @description: A hook to get an array of items from a GET endpoint in WP-API
        @params router: the router of WP-API, default is posts (posts, pages, tags, comments, authors, menus...)
        @params queries: an object contain pair of query string
        @params identity: id of the item we want to retrieve the detai information
    */
export function useGetApi(router = 'posts', queries= {}, identity=''){
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [itemArr, SetItemArr] = useState([]);
    
        const {domain, api} = _CONFIG;
        let route;
    
        switch (router) {
            case 'categories':
                route = _CONFIG.categories_router;
                break;
            case 'tags':
                route = _CONFIG.tag_router;
                break;
            case 'users':
                route = _CONFIG.users_router;
                break;
            case 'search':
                route = _CONFIG.search_router;
                break;
            case 'comments':
                route = _CONFIG.comments_router;
                break;
            default:
                route = _CONFIG.posts_router;
        }
    
    
        // Tham số truyền vào là một object chứa tất cả các query string
        let queriesArr = [];
        for (let query in queries){
            queriesArr.push(`${query}=${queries[query]}`);
        }
        let queriesStr = queriesArr.join('&');

        let fetchUrl = '';

        if(identity !== '') {
            fetchUrl = domain + api + route + '/' + identity + '?' + queriesStr
        } else {
            fetchUrl = domain + api + route + identity + '?' + queriesStr
        }
          
    
        useEffect(()=>{
            // fetch data
            fetch(fetchUrl)
            .then(
                res => res.json()   
            )
            .then(
                (result) => {
                    setIsLoaded(true);
                    SetItemArr(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
            // other side effect here
        }, [fetchUrl])
    
        const result = {
            error: error,
            isLoaded: isLoaded,
            itemArr: itemArr
        }
    
        return result;
    }



