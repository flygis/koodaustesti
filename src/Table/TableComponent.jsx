import React, { useEffect, useState } from 'react';//No need for several imports from 'react' or to import React as

//Optmized the arrow function by removing extra syntax
const TableComponent = props =>
  <table className='table-component'>{/*The component is a table so used table instead of div. Also added some bootstap styles so it looks nicer*/}
    <TableHeader title={props.title} />{/*Renamed the header since custom components should alway be capitalized*/}
    <tbody>{/**Added tbody element since tr shouldn't be a child of just a table. */}
      {//Optimized the mapping of the props and added a mandatory key attribute for the map function
        props.items.map((i, index) =>
          <tr key={index}>{/*array index is not the best index to be used, but some unique value must be added.*/}
            <TableItem content={i.content} href={i.href} />{/*TableItem expects content and href as props, so changed the props to match that*/}
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
    return () => clearInterval(interval);//After the interval is started it is cleared to prevent a memory leak
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
  const [extraContent, setExtraContent] = useState('');//extraContent variable should be stored to state

  useEffect(() => {
    //useEffect hook should be used to assign the response to a state hooked variable, and run only once (using the second param for the function)
    fetch(href).then(response => {
      response.json().then((data) => {
        setExtraContent('Latitude: ' + data.latitude);//extraContent is set using a state hook setter instead of just directly assigning the value.
      });
    });
  }, [extraContent]);//Without assigning the value just once the code would create an infinite loopt that would prevent rendering

  if (!content) {
    setOpen(false);
  }

  if (!extraContent) {
    return null;
  }

  function handleOpenState(state) {//Added a handler to the button onClick event trigger to change open state.
    //The state determines if the span with content coming as a prop from TableComponent is shown or not.
    setOpen(state);
  }

  return (//Removed the extra wrapping element since <td> is enough. Also refactored the elements to be more readable. 
    <td>
      <button
        className='table-component-toggle-content'
        onClick={(/*Removed the extra event parameter since it was not used.*/) => handleOpenState(!open)}>
        Toggle content
      </button>
      <span
        className='table-component-content'
        style={{ display: open ? 'block' : 'none' }}>
        {content}
      </span>
      <span className='table-component-extracontent'>
        {extraContent}
      </span>
    </td>
  );
}