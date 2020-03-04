// SITE HEADER
import React from 'react';

import QuoteStore from './QuoteStore';
import FacebookPage from './FacebookPage';
// import phone_ico from '../assets/footer_contact_ico_phone.png';
import mail_ico from '../assets/footer_contact_ico_mail.png';
import fb_ico from '../assets/footer_contact_ico_fb.png';
import logo from '../assets/cogito-logo.png';

const Footer = (props) => {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let randAuthorIndex = getRandomInt(0, QuoteStore.length - 1);
    let randQuoteIndex = getRandomInt(0, QuoteStore[randAuthorIndex].quotes.length - 1);
    return (
        <footer>
        <div className="upper">
            <div className="mask"></div>
            <div className="container">
                <div className="row">
                    <div className="col-3 col-md-1">
                        <img src={logo} height="74" alt="site logo" />
                    </div>
                    <div className="col-9 col-md-3">
                        <span className="ft-slogan">Tìm về những giá trị căn bản</span>
                    </div>
                    <div className="col-12 col-md-8 flx-content-right">
                        <nav>
                            <a href="#">Giới thiệu</a>
                            <a href="#">Sơ đồ trang web</a>
                            <a href="#">Chính sách riêng tư</a>
                            <a href="#">Liên hệ quảng cáo</a>
                            <a href="#">Hợp tác viết bài</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="under">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-3">
                        <div className="ft-item">
                            <div className="ft-title">Danh ngôn hay</div>
                            <div className="ft-txt">
                                {QuoteStore[randAuthorIndex].quotes[randQuoteIndex]} 
                                <i><b>- {QuoteStore[randAuthorIndex].author}</b></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="ft-item">
                            <div className="ft-title">About</div>
                            <div className="ft-txt">Trang web vẫn đang trong quá trình thử nghiệm, một số tính năng vẫn chưa hoàn thiện, rất mong độc giả thông cảm.</div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="ft-item">
                            <div className="ft-title">Liên hệ</div>
                            <div className="ft-txt">
                                <p><img src={mail_ico} alt="" /> <a style={{color: 'inherit'}} href="mailto:datvimaru50@gmail.com">datvimaru50@gmail.com</a></p>
                                <p><img src={fb_ico} alt="" /> <a style={{color: 'inherit'}} href="https://www.facebook.com/vuquocdat1991">Đạt Xanh</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="ft-item">
                            <div className="ft-title">Theo dõi trên facebook</div>
                            <div className="ft-txt">
                                <FacebookPage />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
}

export default Footer