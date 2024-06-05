import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Article } from './components/article/Article';
import { ArticleEdit } from './components/article/ArticleEdit';
import { Bookings } from './components/bookings/Bookings';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/article" element={<Article />} />
        <Route path="/article/edit/:id" element={<ArticleEdit />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Fragment>
  );
}

export default App;
