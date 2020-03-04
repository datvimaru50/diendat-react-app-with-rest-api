import React, { useState, useEffect } from 'react';
import _CONFIG from '../AppConfig';

import {
    useParams
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
                setCateId(result[0]['categories'][0]);
                setIsLoaded(true);
                setArticle(result);
                
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
        (function(){
            if (article.length > 0) {
                document.title = article[0].title.rendered;
            } 
        })()
        
        return (
            <>
                <Breadcrumb category={cateId} />
                { // Vì sao phải dùng map ở đây mà không dùng trực tiếp article[0].title.rendered ????
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
                                        <Author authorId={article.author} />
                                        
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
                            

                            <Tagline postId={article.id} />
                            <Comment nickName='Ý kiến bạn đọc' postId={article.id} />
                            <PostComment nickName='Gửi ý kiến của bạn' postId={article.id} />
                            <ListNewsNewer nickName='Tin mới hơn' datePoint={article.date} category={article.categories} quantity={3} />
                            <ListNewsOlder nickName='Tin cũ hơn' datePoint={article.date} category={article.categories} quantity={10} />
                        </article>
                    ))
                }
            </>
            
        );
    }
}
export default DetailArticle;

function Tagline(props) {
    // state hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tagItems, setTagItems] = useState([]);

    function fetchData(){
        // Lấy chi tiết bài viết theo slug, trả về 1 kết quả duy nhất
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.tag_router + `?post=${props.postId}&_fields=name,link,id`)
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                setIsLoaded(true);
                setTagItems(result);

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

    }, [props.postId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return(
            <>
                {
                    tagItems.length > 0 &&

                    <>
                        <p className='tagline'>
                            <b className='tag-title'>Tags:</b>
                            {tagItems.map((tag) => 
                                // Render ra các thẻ a kèm tên tag
                                (<a key={tag.id} href={tag.link}>#{tag.name}</a>)
                                // Đồng thời tạo mảng các ID của tag để truyền xuống cho khối tin liên quan
                                // crti.push(tag.id);
                            )}
                        </p>

                        <ListNewsRelated nickName='Có liên quan' excludeId={props.postId} quantity={3} criteria={tagItems} />
                    </>
                }
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


// TIN MỚI HƠN
function ListNewsNewer(props) {
    // state hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsItems, setNewsItems] = useState([]);

    const fields = 'id,slug,title,jetpack_featured_media_url';
    function fetchData(){
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.posts_router + `?before=${props.datePoint}&per_page=${props.quantity}&categories=${props.category[0]}&_fields=${fields}`)
        .then(res => res.json())
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

    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return(
            <>
                {
                    newsItems.length > 0 &&
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
                }
            </>
        );
    }
}

// TIN CŨ HƠN
function ListNewsOlder(props) {
    // state hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsItems, setNewsItems] = useState([]);

    const fields = 'id,slug,title';
    function fetchData(){
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.posts_router + `?after=${props.datePoint}&categories=${props.category[0]}&per_page=${props.quantity}&_fields=${fields}`)
        .then(res => res.json())
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

    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return(
            <>
                {
                    newsItems.length > 0 &&
                    <section className='sub-section'>
                        <h2 className='section-title'><span>{props.nickName}</span></h2>
                        <ul className="section-body">
                            {
                                newsItems.map((item) => (
                                    <li key={item.id} className='box-title'>
                                       <a href={item.slug} className="title" dangerouslySetInnerHTML={{__html: item.title.rendered}} />
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                }
            </>
        );
    }
}

function Comment(props) {
    // state hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsItems, setNewsItems] = useState([]);

    const fields = 'id,date,author_name,content,author_avatar_urls';

    function fetchData(){
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.comments_router + `?post=${props.postId}&order=asc&parent=0&_fields=${fields}`)
        .then(res => res.json())
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

    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return(
            <>

                {
                    newsItems.length > 0 &&
                    <section id='comment' className='sub-section'>
                        <h2 className='section-title'><span>{props.nickName}</span></h2>
                        <div className="section-body">
                            {
                                newsItems.map((item) => (
                                    <CommentItem
                                        key = {item.id}
                                        commentId = {item.id}
                                        authorImg = {item.author_avatar_urls['48']}
                                        authorName = {item.author_name}
                                        commentDate = {item.date}
                                        commentContent = {item.content.rendered}
                                        postId = {props.postId}

                                    />
                                ))
                            }
                            
                        </div>
                    </section>
                }
            </>
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
                <span className='cm-author-name'>{props.authorName}</span>
                <span className='cm-date'>{props.commentDate}</span>
            </div>
            <div className="cm-body" dangerouslySetInnerHTML={{__html: props.commentContent}} />

            <div className='box-reply'>
                <button className='button-reply' onClick={showReplyForm}><i className="fas fa-reply"></i> Trả lời</button>
            </div>

            {
                showRepForm &&
                <PostComment nickName={`Trả lời: ${props.authorName}`} parentId={props.commentId} postId={props.postId} />
            }

            <SubComment parentId={props.commentId} />
        </div>
    );
}

function SubComment(props) {
    // state hook
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsItems, setNewsItems] = useState([]);

    const fields = 'id,date,author_name,content,author_avatar_urls';
    function fetchData(){
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.comments_router + `?parent=${props.parentId}&order=asc&_fields=${fields}`)
        .then(res => res.json())
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

    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return(
            <>
                {
                    newsItems.length > 0 &&
                    <div className="sub-comment">
                        {
                            newsItems.map((item) => (
                                <div key={item.id} className='comment-item'>
                                    <div className='cm-head'>
                                        <span className='cm-author-img'><img src={item.author_avatar_urls['48']} alt='author-comment-avatar' /></span>
                                        <span className='cm-author-name'>{item.author_name}</span>
                                        <span className='cm-date'>{item.date}</span>
                                    </div>
                                    <div className="cm-body" dangerouslySetInnerHTML={{__html: item.content.rendered}} />
                                </div>
                            ))
                        }
                        
                    </div>
                }
            </>
        );
    }
}

function PostComment(props){
    const [postSuccess, setPostSuccess] = useState(false);
    const [sendingText, SetSendingText] = useState('');

    function handleSubmit (event){
        event.preventDefault();

        const getName = document.querySelector('.comment-form input[name="name"]').value;
        const getEmail = document.querySelector('.comment-form input[name="email"]').value;
        const getContent = document.querySelector('.comment-form textarea[name="content"]').value;

        if((getName == '' || getEmail == '' || getContent == '')) {
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
                        document.querySelector('.comment-form input[name="name"]').value = '';
                        document.querySelector('.comment-form input[name="email"]').value = '';
                        document.querySelector('.comment-form textarea[name="content"]').value = '';

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
        <div className="comment-form form-contact">
            <h3>{props.nickName}</h3>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputName4">Họ và tên (*)</label>
                        <input type="text" className="form-control" id="inputName4" name='name' placeholder="" />
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
                
                <a className="button style2" onClick={handleSubmit} type="submit">Gửi ý kiến</a>
            </form>
        </div>
    );
}

function Author(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [authorInfo, setAuthorInfo] = useState([]);

    function fetchData(){
        // Retrieve author information of the article
        fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.users_router + `/${props.authorId}?_fields=name,link,avatar_urls`)
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                setIsLoaded(true);
                setAuthorInfo(result);
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

    }, [props.authorId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        // console.log(authorInfo);
        return (
               
            <div className='box-author'>
                <span className='author-avar'><img src={authorInfo.avatar_urls} alt='author avatar' /></span>
                <p className='author-name'><a href={authorInfo.link}>{authorInfo.name}</a></p>
            </div>
              
        );
    }

}