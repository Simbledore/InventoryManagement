import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Article } from './components/article/Article';
import { ArticleEdit } from './components/article/ArticleEdit';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/article" element={<Article />} />
        <Route path="/article/edit/:id" element={<ArticleEdit />} />
      </Routes>
    </Fragment>
  );
}

export default App;
