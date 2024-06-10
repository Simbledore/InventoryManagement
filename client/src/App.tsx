import React, { Fragment } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Article } from "./components/article/Article";
import { ArticleEdit } from "./components/article/ArticleEdit";
import { Booking } from "./components/bookings/Booking";
import { Box } from "@mui/material";

function App() {
  return (
    <Fragment>
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<Article />} />
          <Route path="/article" element={<Article />} />
          <Route path="/article/edit/:id" element={<ArticleEdit />} />
          <Route
            path="/bookings"
            element={<Booking key={"bookin"} book_in={true} />}
          />
          <Route
            path="/bookings/out"
            element={<Booking key={"bookout"} book_in={false} />}
          />
        </Routes>
      </Box>
    </Fragment>
  );
}

export default App;
