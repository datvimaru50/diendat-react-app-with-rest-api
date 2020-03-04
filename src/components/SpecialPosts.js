import React from 'react';
import time from '../assets/time-bg.jpg';
import space from '../assets/space-bg.jpg';
import god from '../assets/god-bg.jpg';
import will from '../assets/will-bg.jpg';
import identity from '../assets/identity-bg.jpg';
import knowledge from '../assets/knowledge-bg.jpg';

const SpecialPosts = () => {
    return (
        <>
            <h2 className="section-title">
                <span>Bài viết chuyên sâu</span>
            </h2>
            <p className="section-desc">Nội dung đang được cập nhật</p>
            <div className="row">
                <div className="col-12 col-md-3">
                    <div className="sv-item">
                        <span className="label icon">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                        <span className="label price">
                            <div className="row">
                                <div className="col-6 col-md-12 dollar">> 2k từ</div>
                                <div className="col-6 col-md-12 one-set">Một bài viết</div>
                            </div>
                        </span>
                        <h3>Kiến thức tổng quát</h3>
                        <p className="txt">Là những chuyên đề nội dung được đầu tư chuyên sâu về nội dung và chất lượng hình ảnh minh họa</p>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="sv-item">
                        <div className="head">
                            <img className="img-bg" src={time} width="" alt="" />
                            <div className="opa-layer"></div>
                            <div className="symbol_wrap">
                                <i className="far fa-clock"></i>
                            </div>
                        </div>
                        <div className="body">
                            <h3><a href="/">Thời gian là gì?</a></h3>
                            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem fugit eaque aut non architecto debitis!</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="sv-item">
                        <div className="head">
                            <img className="img-bg" src={space} width="" alt="" />
                            <div className="opa-layer"></div>
                            <div className="symbol_wrap">
                                <i className="fas fa-cubes"></i>
                            </div>
                        </div>
                        <div className="body">
                            <h3>Không gian là gì</h3>
                            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem fugit eaque aut non architecto debitis!</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="sv-item">
                        <div className="head">
                            <img className="img-bg" src={god} width="" alt="" />
                            <div className="opa-layer"></div>
                            <div className="symbol_wrap">
                                <span className="god-icon"></span>
                            </div>
                        </div>
                        <div className="body">
                            <h3>Có Chúa không</h3>
                            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem fugit eaque aut non architecto debitis!</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="sv-item">
                        <div className="head">
                            <img className="img-bg" src={will} width="" alt="" />
                            <div className="opa-layer"></div>
                            <div className="symbol_wrap">
                                <i className="fas fa-arrows-alt-h"></i>
                            </div>
                        </div>
                        <div className="body">
                            <h3>Ý chí tự do có tồn tại</h3>
                            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem fugit eaque aut non architecto debitis!</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="sv-item">
                        <div className="head">
                            <img className="img-bg" src={identity} width="" alt="" />
                            <div className="opa-layer"></div>
                            <div className="symbol_wrap">
                                <i className="far fa-copy"></i>
                            </div>
                        </div>
                        <div className="body">
                            <h3>Bản thể cá nhân là gì?</h3>
                            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem fugit eaque aut non architecto debitis!</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="sv-item">
                        <div className="head">
                            <img className="img-bg" src={knowledge} width="" alt="" />
                            <div className="opa-layer"></div>
                            <div className="symbol_wrap">
                                <i className="fas fa-book"></i>
                            </div>
                        </div>
                        <div className="body">
                            <h3>Tri thức là gì</h3>
                            <p className="txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem fugit eaque aut non architecto debitis!</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="sv-item">
                        <div className="row">
                            <div className="col-3 col-md-12 col-more-num"><span className="more">+10</span></div>
                            <div className="col-9 col-md-12">
                                <p className="txt">
                                    Còn các nội dung như tư duy toán, tư duy trừu tượng đang chờ đón bạn.
                                </p>
                                <a href="/" className="button style2">Xem tất cả</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpecialPosts