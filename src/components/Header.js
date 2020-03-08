// SITE HEADER
import React from 'react';
import _CONFIG from '../AppConfig';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
  

import logo from '../assets/cogito-logo.png';
import en from '../assets/lang_1_en.png';
import vi from '../assets/lang_2_vi.png';
import fi from '../assets/lang_3_fi.png';

class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
            error:null,
            isLoaded: false,
            menu: null,
            fixedTop: false,
            mobileLangOpened: false // check trạng thái ẩn hiện của language mobile
        }
        // binding 'this' to class methods
        this.showMobileMenu = this.showMobileMenu.bind(this);  
        this.showMobileLang = this.showMobileLang.bind(this);  
    }

    showMobileMenu() {
        this.props.onMobileMenuOpened();
    }
    showMobileLang() {
        this.setState(state => ({
            mobileLangOpened: !state.mobileLangOpened
        }))
    }
    componentDidMount() {
      fetch(_CONFIG.domain + _CONFIG.api + _CONFIG.categories_router + '?_fields=id,slug,name&exclude=1,41')
      .then(res => res.json())
      .then(
          (result) => {
              this.setState({
                  isLoaded: true,
                  menu: result
              });
          },
          (error) => {
              this.setState({
                  isLoaded: true,
                  error
              });
          }
      )
  }
  render() {
    const { error, isLoaded, menu } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // if (this.state.menu === null) return null
            // sticky header
            
            return (
                <header className={this.props.mobileMenuOpened ? "show_main_menu" : ""}>
                        <div className="hidden_menu d-md-none">
                            <div className="menu-body">
                                <ul className="mobile-menu-list">
                                    {menu.map((item) => (
                                        <li key={item.id}>
                                            <Link to={`/categories/${item.slug}`}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                                <div onClick={this.showMobileLang} className={this.state.mobileLangOpened ? "language opened" : "language"}>
                                    <a href="#"><img src={en} alt="" />EN</a>
                                    <ul className="language-list">
                                        <li><a href="#"><img src={en} alt="" />English</a></li>
                                        <li><a href="#"><img src={vi} alt="" />Tiếng Việt</a></li>
                                        <li><a href="#"><img src={fi} alt="" />Finland</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="container menu-bar">
                            <div className="row">
                                <div className="col-5 col-md-2 order-md-1">
                                    <a href="/" className="site-logo"><img src={logo} height="60" alt=""/></a>
                                </div>
                                <div className="col-5 col-md-2 order-md-3 flx-content-right">
                                    <a className="button" href="#">META</a>
                                </div>
                                <div className="col-2 col-md-7 order-md-2">

                                    <span onClick={this.showMobileMenu} className={this.props.mobileMenuOpened ? "mobile-menu d-md-none opened" : "mobile-menu d-md-none"}></span>

                                    {/* NAVIGATION MENU */}
                                    <nav className="site-menu main-menu d-none d-md-block">
                                        {menu.map((item) => (
                                            <span key={item.id} className="menu-item">
                                                <NavLink activeClassName="active" className="menu-link" to={`/categories/${item.slug}`}>{item.name}</NavLink>
                                            </span>
                                        ))}
                                    </nav>

                                </div>
                                <div className="col-md-1 order-md-4 flx-content-center">
                                    <div className="language">
                                        <a href="#"><img src={en} alt=""/>EN</a>
                                        <ul className="language-list">
                                            <li><a href="#"><img src={en} alt=""/>English</a></li>
                                            <li><a href="#"><img src={vi} alt=""/>Tiếng Việt</a></li>
                                            <li><a href="#"><img src={fi} alt=""/>Finland</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
            );
        }
    }
  }
  
  
export default Header;