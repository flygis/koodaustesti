import './index.html';
import React from 'react';
import ReactDOM from 'react-dom';
import TableComponent from './Table/TableComponent';

ReactDOM.render(//All of this is just to demo the table.
  <TableComponent items={[{ content: 'Data: ', href: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m' }]} title='Table has run for this many seconds: ' />,
  document.getElementById('index')
);
