import React, { useState, useEffect } from 'react';
import _CONFIG from '../AppConfig';
import { useGetApi } from './Hooks/CustomHooks'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Prompt,
    useParams,
    useLocation
  } from "react-router-dom";

import Breadcrumb from './Breadcrumb';

const DetailArticle = (props) => {
    // state hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [article, setArticle] = useState([]);

    const [cateId, setCateId] = useState(1);
    const [viewCount, setViewCount] = useState(0);

    let { articleSlug } = useParams();

    function handleCount(){
        setViewCount(viewCount + 1);
    }

    // Effect hook!
    useEffect(() => {
        // Lấy chi tiết bài viết theo slug, trả về 1 kết quả duy nhất
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.posts_router + `?slug=${articleSlug}&_fields=id,date,title,content,author,tags,categories`)
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                if(result.length === 0) {
                    document.location.pathname = 'error'
                } else {
                    setCateId(result[0]['categories'][0]);
                    setIsLoaded(true);
                    setArticle(result);
                    document.title = result[0].title.rendered;
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [articleSlug]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        // console.log(article);
        return (
            <>
                <Breadcrumb 
                    identity={cateId} 
                    routerName='categories' // hard code
                    queries = {{
                        '_fields': 'slug,name'
                    }} 
                />
                { 
                    article.map((article) => (
                        <article key={article.id} id="article-detail">
                            <h1 className="detail-title" dangerouslySetInnerHTML={{__html: article.title.rendered}} />
                            <p className="box-meta">
                                <span className="pubtime">{article.date}</span>
                                <span className="viewcount" onClick={handleCount}>{viewCount}</span>
                            </p>
                            
                            <div className='row'>
                                <div className='col-md-2'>
                                    <div className='info_wrap'>
                                        <Author
                                            routerName = 'users' 
                                            queries = {{
                                                '_fields': 'name,link,avatar_urls'
                                            }} 
                                            identity={article.author} 

                                        />
                                        
                                        <ul id='list-social'>
                                            <li className='facebook'><a href='#'>Facebook</a></li>
                                            <li className='zalo'><a href='#'>Zalo</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-md-10'>
                                    <div id="the-content" className="txt" dangerouslySetInnerHTML={{__html: article.content.rendered}} />
                                </div>
                            </div>
                            

                            <Tagline 
                                routerName = 'tags'
                                queries = {{
                                    'post': article.id,
                                    '_fields': 'id,slug,name'
                                }} 
                            />
                            <Comment 
                                nickName='Ý kiến bạn đọc'
                                routerName = 'comments'
                                postId = {article.id} // Need this for Post Comment 
                                queries = {{
                                    'post': article.id,
                                    'order': 'asc',
                                    'parent': 0,
                                    '_fields': 'id,date,author,author_name,content,author_avatar_urls'
                                }}
                                // articleAuthor = {article.author}
                            />
                            {/* Comment cho bài viết, không có parentId */}
                            <PostComment nickName='Gửi ý kiến của bạn' postId={article.id} />

                            <ListNewsNewer 
                                nickName = 'Tin mới hơn'
                                queries = {{
                                    'after': article.date,
                                    'per_page': 3,
                                    'categories': article.categories,
                                    '_fields': 'id,slug,title,jetpack_featured_media_url'
                                }} 
                            />
                            <ListNewsOlder 
                                nickName='Tin cũ hơn' 
                                queries = {{
                                    'before': article.date,
                                    'per_page': 10,
                                    'categories': article.categories
                                }}  
                            />  
                        </article>
                    ))
                }
            </>
            
        );
    }
}
export default DetailArticle;

function Tagline(props) {
    const {error, isLoaded, itemArr} = useGetApi(props.routerName, props.queries);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if(itemArr.length === 0) return(<></>)
        return(
            <>
                <p className='tagline'>
                    <b className='tag-title'>Tags:</b>
                    {itemArr.map((tag) => 
                        (<a key={tag.id} href={`/tags/${tag.slug}`}>#{tag.name}</a>)
                    )}
                </p>

                <ListNewsRelated nickName='Có liên quan' excludeId={props.queries.post} quantity={3} criteria={itemArr} />
            </>
        );
    }
}

function ListNewsRelated(props) {
    // state hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsItems, setNewsItems] = useState([]);

    const fields = 'id,slug,title,jetpack_featured_media_url';

    // Tạo mảng gồm các ID của tag bài viết được truyền xuống
    const tagNumArr = [];
    for (let tag of props.criteria){
        tagNumArr.push(tag.id)
    }

    function fetchData(){
        // Lần lượt fetch api để lấy bài viết theo tag trong mảng ID vừa tạo, đến khi nào đạt đủ số lượng yêu cầu thì thôi;
        for (let tagID of tagNumArr){
            fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.posts_router + `?tags=${tagID}&exclude=${props.excludeId}&_fields=${fields}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setNewsItems(newsItems.concat(result));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }
    }

    // Effect hook!
    useEffect(() => {
        fetchData();

    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if(newsItems.length === 0) return (<></>)
        return(
            <section className='sub-section'>
                <h2 className='section-title'><span>{props.nickName}</span></h2>
                <div className="row section-body">
                    {
                        newsItems.map((item) => (
                            <div key={item.id} className="col-md-4">
                                <div className="news-item">
                                    <div className="row">
                                        <div className="col-5 col-md-12">
                                            <a href={item.slug} className="box-img"><img src={item.jetpack_featured_media_url} alt="" /></a>
                                        </div>
                                        <div className="col-7 col-md-12">
                                            <div className="box-text">
                                                <div className="box-title">
                                                    <a href={item.slug} className="title" dangerouslySetInnerHTML={{__html: item.title ? item.title.rendered : ''}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        );
    }
}


// TIN MỚI HƠN
function ListNewsNewer(props) {
    const {error, isLoaded, itemArr} = useGetApi(props.routerName, props.queries);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if(itemArr.length === 0) return(<></>)
        return(
            <section className='sub-section'>
                <h2 className='section-title'><span>{props.nickName}</span></h2>
                <div className="row section-body">
                    {
                        itemArr.map((item) => (
                            <div key={item.id} className="col-md-4">
                                <div className="news-item">
                                    <div className="row">
                                        <div className="col-5 col-md-12">
                                            <a href={item.slug} className="box-img"><img src={item.jetpack_featured_media_url} alt="" /></a>
                                        </div>
                                        <div className="col-7 col-md-12">
                                            <div className="box-text">
                                                <div className="box-title">
                                                    <a href={item.slug} className="title" dangerouslySetInnerHTML={{__html: item.title.rendered}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        );
    }
}

// TIN CŨ HƠN
function ListNewsOlder(props) {
    const {error, isLoaded, itemArr} = useGetApi(props.routerName, props.queries);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if(itemArr.length === 0) return(<></>)
        return(
            <section className='sub-section'>
                <h2 className='section-title'><span>{props.nickName}</span></h2>
                <ul className="section-body">
                    {
                        itemArr.map((item) => (
                            <li key={item.id} className='box-title'>
                                <a href={item.slug} className="title" dangerouslySetInnerHTML={{__html: item.title.rendered}} />
                            </li>
                        ))
                    }
                </ul>
            </section>
        );
    }
}

// LIỆT KÊ COMMENTS
function Comment(props) {
    const {error, isLoaded, itemArr} = useGetApi(props.routerName, props.queries);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (itemArr.length === 0) return(<></>)
        return(
            <section id='comment' className='sub-section'>
                <h2 className='section-title'><span>{props.nickName}</span></h2>
                <div className="section-body">
                    {
                        itemArr.map((item) => (
                            <CommentItem
                                key = {item.id}
                                commentId = {item.id}
                                authorImg = {item.author_avatar_urls['48']}
                                authorName = {item.author_name}
                                commentDate = {item.date}
                                commentContent = {item.content.rendered}
                                postId = {props.postId}
                                authorId={item.author}
                            />
                        ))
                    }
                    
                </div>
            </section>
        );
    }
}

function CommentItem(props) {
    const [showRepForm, setShowRepForm] = useState(false);

    function showReplyForm(){
        setShowRepForm(!showRepForm);
    }
    return (
        <div className='comment-item'>
            <div className='cm-head'>
                <span className='cm-author-img'><img src={props.authorImg} alt='comment-author-avatar' /></span>
                <span className='cm-author-name'>{props.authorName} {props.authorId === 1 ? 'Tác giả' : ''}</span>
                <span className='cm-date'>{props.commentDate}</span>
            </div>
            <div className="cm-body" dangerouslySetInnerHTML={{__html: props.commentContent}} />

            <div className='box-reply'>
                <button className='button-reply' onClick={showReplyForm}><i className="fas fa-reply"></i> Trả lời</button>
            </div>

            {   // Trả lời comment, phải có ParentId
                showRepForm &&
                <PostComment nickName={`Trả lời: ${props.authorName}`} parentId={props.commentId} postId={props.postId} />
            }

            <SubComment 
                routerName = 'comments'
                queries = {{
                    'parent': props.commentId,
                    'order': 'asc',
                    '_fields': 'id,date,author,author_name,content,author_avatar_urls'
                }}
            />
        </div>
    );
}

function SubComment(props) {
    const {error, isLoaded, itemArr} = useGetApi(props.routerName, props.queries);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if(itemArr.length === 0) return(<></>)
        return(
            <div className="sub-comment">
                {
                    itemArr.map((item) => (
                        <div key={item.id} className='comment-item'>
                            <div className='cm-head'>
                                <span className='cm-author-img'><img src={item.author_avatar_urls['48']} alt='author-comment-avatar' /></span>
                                <span className='cm-author-name'>{item.author_name} {item.author === 1 ? <span style={{fontSize: '12px', color: 'green'}}>- Tác giả</span> : ''}</span>
                                <span className='cm-date'>{item.date}</span>
                            </div>
                            <div className="cm-body" dangerouslySetInnerHTML={{__html: item.content.rendered}} />
                        </div>
                    ))
                }
                
            </div>
        );
    }
}

function PostComment(props){
    let [isBlocking, setIsBlocking] = useState(false);

    const [postSuccess, setPostSuccess] = useState(false);
    const [sendingText, SetSendingText] = useState('');

    
    function handleSubmit (event){
        event.preventDefault();
        setIsBlocking(false);
        const formId = event.target.getAttribute("form");

        const getName = document.querySelector(`#${formId} input[name="name"]`).value;
        const getEmail = document.querySelector(`#${formId} input[name="email"]`).value;
        const getContent = document.querySelector(`#${formId} textarea[name="content"]`).value;

        if((getName === '' || getEmail === '' || getContent === '')) {
            alert('Bạn phải nhập đầy đủ thông tin!');
            return false;
        } else {
            if (window.confirm('Bạn có chắc chắn muốn gửi ý kiến cho chúng tôi? Mọi ý kiến chúng tôi giữ toàn quyền biên tập lại trước khi đăng tải.')) {
                const data = {
                    'author_name': getName, 
                    'author_email': getEmail, 
                    'content': getContent, 
                    'date': (new Date()).toISOString(),
                    'parent': props.parentId ? props.parentId : 0, 
                    'post': props.postId
                };

                SetSendingText('Đang gửi...');
        
                fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.comments_router, {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body:  JSON.stringify(data)
                })
                .then(
                    res => res.json()
                )
                .then(
                    (result) => {
                        console.log(`A new comment has been created at ${result.date}`);
                        setPostSuccess(true);
                        SetSendingText('');
                        document.querySelector(`#${formId} input[name="name"]`).value = '';
                        document.querySelector(`#${formId} input[name="email"]`).value = '';
                        document.querySelector(`#${formId} textarea[name="content"]`).value = '';
                       

                        setTimeout(()=>{setPostSuccess(false);},5000)
                    },
                    (error) => {
                        console.log(error.message);
                    }
                )
            } else {
                alert('Bạn đã từ chối gửi ý kiến!');
                return false;
            }
            
        }

    }
    return (
        <div id={props.parentId ? `form-${props.parentId}` : `form-${props.postId}`} className="comment-form form-contact">
            <h3>{props.nickName}</h3>
            <form>
                <Prompt
                    when={isBlocking}
                    message={location =>
                    `Are you sure you want to go to ${location.pathname}`
                    }
                />
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputName4">Họ và tên (*)</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputName4" 
                            name='name' placeholder=""
                            onChange={event => {
                                setIsBlocking(event.target.value.length > 0);
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Địa chỉa email (*)</label>
                        <input type="email" className="form-control" id="inputEmail4" name='email' placeholder="Email" />
                    </div>
                </div>
                
               
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Nội dung (*)</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" name='content' rows="3"></textarea>
                </div>

                <div>{sendingText}</div>

                {
                    postSuccess &&
                    <div className="alert alert-success" role="alert">
                        Cảm ơn bạn, chúng tôi đã nhận được ý kiến của bạn.
                    </div>
                }
                
                <span className="button style2" onClick={handleSubmit} type="submit" form={props.parentId ? `form-${props.parentId}` : `form-${props.postId}`}>Gửi ý kiến</span>
            </form>

            
        </div>
    );
}

function Author(props){
    // Lưu ý, khi có tham số identity, itemArr sẽ là một {} duy nhất
    const {error, isLoaded, itemArr} = useGetApi(props.routerName, props.queries, props.identity);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='box-author'>
                <span className='author-avar'><img src={itemArr.avatar_urls ? itemArr.avatar_urls['96'] : ''} alt='author avatar' /></span>
                <p className='author-name'><a href={itemArr.link}>{itemArr.name}</a></p>
            </div>
              
        );
    }

}

