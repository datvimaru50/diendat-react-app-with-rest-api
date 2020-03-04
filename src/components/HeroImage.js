import React from 'react';
import heroBackground from '../assets/black-board.jpg';

const HeroImage = () => {
    return (
        <section id="hero" className="bg-image">
            <img src={heroBackground} alt="" />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 txt-wrap">
                        <div className="txt-content">
                            <h2 className="title">Tìm về <br /><span className="highlight">Những giá trị căn bản</span></h2>
                            <div className="sub-title"><span className="highlight"></span> Blog chia sẻ những kiến thức căn bản</div>
                            <a className="button" href="#">Tìm hiểu ngay</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroImage;