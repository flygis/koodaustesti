import * as React from "react";

import { useEffect, useState } from "react";



const TableComponent = (props) => {

  const { items, title } = props;

  return (

    <div className="table-component" style="padding-top: 5px;">

      <tableHeader title={title} />

      {items.map((i) => {

        return (

          <tr>

            <TableItem item={i}></TableItem>

          </tr>

        );

      })}

    </div>

  );

};



const tableHeader = ({ title }) => {

  const [timer, setTimer] = useState(0)



  setInterval(() => {

    setTimer(timer + 1)

  }, 1000)



  return (

    <thead>

      <tr>

        <th>{title} {timer}</th>

      </tr>

    </thead>

  );

};



function TableItem(props) {

  const { content, href } = props;

  const [open, setOpen] = useState(true);

  let extraContent = "";



  if (!content) {

    setOpen(false)

  }



  if (!extraContent) {

    return null

  }



  useEffect(() => {

    fetch(href).then((response) => {

      extraContent = response.extraContent;

    });

  });



  return (

    <>

      <td>

        <button

          className="table-component-toggle-content"

          onClick={(e) => setOpen(!open)}

        >Toggle content</button>

        <span

          style={{ display: open ? "block" : "hidden" }}

          className="table-component-content"

        >

          {content}

        </span>

        <span className="table-component-extracontent">{extraContent}</span>

      </td>

    </>

  );

}



export default TableComponent