import React, { useEffect, useState } from "react";
/*No need for several imports from "react".
Also only React, useEffect and useState are used in the components,
so no need to import anything as *.
*/

{/*Optmized the arrow function by removing extra syntax*/ }
const TableComponent = props =>
<table className="table-component">{/*The component is a table so used table instead of div*/}
  <TableHeader title={props.title} />{/*Renamed the header since custom components should alway be capitalized*/}
  {//Optimized the mapping of the props and added a mandatory key attribute for the map function
    props.items.map((i, index) =>
      <tr key={index}><TableItem item={i}></TableItem></tr>
    )
  }
</table>

export default TableComponent;

const TableHeader = ({ title }) => {
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
          onClick={(e) => setOpen(!open)}>
          Toggle content
        </button>
        <span
          className={{ display: open ? "table-component-content" : "hide-table-component" }}>
          {content}
        </span>
        <span className="table-component-extracontent">{extraContent}</span>
      </td>
    </>
  );
}