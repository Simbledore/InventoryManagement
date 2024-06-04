import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Article } from './components/article/Article';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/article" element={<Article />} />
      </Routes>
    </Fragment>
  );
}

export default App;
