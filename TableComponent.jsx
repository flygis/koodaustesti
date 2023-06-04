import React, { useEffect, useState } from "react";//No need for several imports from "react" or to import React as

//Optmized the arrow function by removing extra syntax
const TableComponent = props =>
  <table className="table-component">{/*The component is a table so used table instead of div*/}
    <TableHeader title={props.title} />{/*Renamed the header since custom components should alway be capitalized*/}
    <tbody>{/**Added tbody element since tr shouldn't be a child of just a table. */}
      {//Optimized the mapping of the props and added a mandatory key attribute for the map function
        props.items.map((i, index) =>
          <tr key={index}>
            <TableItem content={i.content} href={i.href} />{/*TableItem excepts content and href as props, so changed the props to match that*/}
          </tr>
        )
      }
    </tbody>
  </table>

export default TableComponent;

const TableHeader = ({ title }) => {//Renamed the header since custom components should alway be capitalized
  const [timer, setTimer] = useState(0);

  useEffect(() => {//Fixed the interval by wrapping it into a useEffect function so it can be cleaned after the state changes
    const interval = setInterval(() => {//const interval gets clearIntervalled after it has started
      setTimer(timer + 1)//the state variable timer is updated once a second since the function starts only once and keeps running and updating the value
    }, 1000);
    return () => clearInterval(interval);
  });

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
  const [extraContent, setExtraContent] = useState("");//extraContent variable should be stored to state

  useEffect(() => {
    fetch(href).then(response => {
      response.json().then((data) => {
        setExtraContent("I am always visible: " + data.latitude);
      });
    });
  }, [extraContent]);

  if (!content) {
    setOpen(false);
  }

  if (!extraContent) {
    return null;
  }

  return (
    <td>
      <button
        className="table-component-toggle-content"
        onClick={(e) => setOpen(!open)}>Toggle content
      </button>
      <span
        style={{ display: open ? "block" : "none" }}
        className="table-component-content">
        {content}
      </span>
      <span className="table-component-extracontent">
        {extraContent}
      </span>
    </td>
  );
}