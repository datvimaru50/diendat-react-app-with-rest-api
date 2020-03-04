import React from 'react';

const WidgetListCategories = () => {
    return (
        <div id="list-cate" className="widget">
            <div className="widget-title">Chuyên mục bài viết</div>
            <div className="widget-body">
                <ul>
                    <li><a href="/test-slug">Định cư - Nhập cảnh</a></li>
                    <li><a href="#">Tài chính</a></li>
                    <li className="active"><a href="#">Hàng hóa, giao thương</a></li>
                    <li><a href="#">Công nghệ thông tin</a></li>
                    <li><a href="#">Ẩm thực tinh hoa</a></li>
                    <li><a href="#">Kiến trúc công trình</a></li>
                    <li><a href="#">Tiêu dùng gia đình</a></li>
                </ul>
            </div>
        </div>
    );
}

export default WidgetListCategories;