import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import './App.css';

import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import Main from './components/Main'
import SecondaryLayout from './components/SecondaryLayout'
import ListPostsInCategory from './components/ListPostsInCategory'
import DetailArticle from './components/DetailArticle'
import HeroImage from './components/HeroImage'
import BigFormSearch from './components/BigFormSearch'
import MainSection from './components/MainSection';
import CategoryInfo from './components/CategoryInfo';
import SpecialPosts from './components/SpecialPosts';
import SectionBody from './components/SectionBody';
import Footer from './components/Footer';

import WidgetListCategories from './components/WidgetListCategories';
import WidgetListServices from './components/WidgetListServices';

import news from './assets/header_news_bg.jpg'
import think from './assets/header_think_bg.jpg'
import book from './assets/header_book_bg.jpg'
import science from './assets/header_science_bg.jpg'
import fun from './assets/header_fun_bg.jpg'
import stats from './assets/header_stats_bg.jpg'




/* 
  Các kiểu layout tin:
  1: Kiểu layout của META101x, dạng lưới 4x4 (default)
  2: Kiểu layout của Những bài đặc biệt
  3: Kiểu layout của Các category thường
*/
function App() {
  return (
    <Router>
      <Header />
      <Main>

        <Switch>

            {/* HOME */}
            <Route exact path="/">
              <HeroImage />
              <BigFormSearch />
            
              <MainSection id={"news"}>
                <CategoryInfo id={41} fields={"link,name,description"} />
              </MainSection>

              <MainSection id={"service"}>
                <SpecialPosts />
              </MainSection>

              <MainSection id={"fields"}>
                {React.createElement("h2", {className: "section-title"}, [
                    React.createElement('span', {key: 1}, 'Căn bản khác')
                ])}
                <SectionBody>
                    <CategoryInfo key={1} id={39} headerImage={news} layout={2} fields={"link,name"} />
                    <CategoryInfo key={2} id={42} headerImage={think} layout={2} fields={"link,name"} />
                    <CategoryInfo key={3} id={55} headerImage={science} layout={2} fields={"link,name"} />
                    <CategoryInfo key={4} id={52} headerImage={book} layout={2} fields={"link,name"} />
                    <CategoryInfo key={5} id={31} headerImage={stats} layout={2} fields={"link,name"} />
                    <CategoryInfo key={6} id={123} headerImage={fun} layout={2} fields={"link,name"} />
                </SectionBody>
              </MainSection>
            </Route>

            {/* LIST PAGE */}
            <Route path={"/categories/:slug/:pageBase?/:pageNo?"}>
              <SecondaryLayout 
                content={{'mainBar': <ListPostsInCategory key={1} layout={3} fields={"id,title,slug,excerpt,jetpack_featured_media_url,date_gmt"} />,
                          'sideBar': [<WidgetListCategories key={1} />, <WidgetListServices key={2} />]}} 
              />
            </Route>

            {/* DETAIL PAGE */}
            <Route path={'/:articleSlug'}>
              <SecondaryLayout 
                content={{'mainBar': <DetailArticle key={1} />,
                          'sideBar': [<WidgetListCategories key={1} />, <WidgetListServices key={2} />]}} 
              />
            </Route>
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;
