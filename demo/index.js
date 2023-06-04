import './index.html';
import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import TableComponent from '../SourceTableComponent';

ReactDOM.render(
  <TableComponent items={[{ todo: '' }]} />,
  document.getElementById("index")
);
