import React, { Fragment } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Article } from './components/article/Article';
import { ArticleEdit } from './components/article/ArticleEdit';
import { Booking } from './components/bookings/Booking';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/article" element={<Article />} />
        <Route path="/article/edit/:id" element={<ArticleEdit />} />
        <Route path="/bookings" element={<Booking book_in={true}/>} />
        <Route path="/bookings/out" element={<Booking book_in={false}/>} />
      </Routes>
    </Fragment>
  );
}

export default App;
