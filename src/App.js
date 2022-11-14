// This project is for test





import { useEffect, useRef, useState } from 'react';
import './App.css';
import React from 'react';
import { Button,Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Tooltip } from '@material-ui/core';


function App() {

  const [todos, setTodos] = useState([]);
  const todoText = useRef();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  }, []);

  function addTodo(event) {
    event.preventDefault();

    if (String(todoText.current.value).replace(/ /g, '') === "") {
    } else {
      const next = [...todos, todoText.current.value];
      setTodos(next);
      localStorage.setItem('todos', JSON.stringify(next));
      document.getElementsByName("todo-input")[0].value = "";
    }

    var scrollLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    window.scrollTo(0, scrollLimit + 10000);
    setTimeout(function(){window.scrollTo(0, scrollLimit)}, 1);
  }


  const my_css = `
      #clear-button {
        top:0;
        right:0;
        position:fixed;
        background-color:#a8c0e2;
        /* background-color:#ef3520; */
        color: #fff;
        border:none; 
        border-radius:10px; 
        padding:0px;
        min-height:3rem; 
        min-width:3rem;
        font-size:2rem;
        margin:0.3rem;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
      }
      #clear-button:hover {
        background-color:#6888b3;
        transition: 0.3s;
      }
      #clear-button:not(:hover) {
        background-color:#a8c0e2;
        transition: 0.3s;
      }
      #clear-button:active {
        background-color:#526887;
        transition: 0.3s;
      }
      .__react_component_tooltip {
      transition: all 0.3s ease-in-out !important;
      opacity: 0 !important;
      visibility: visible;
      }
      
      .__react_component_tooltip.show {
      visibility: visible;
      opacity: 1 !important;
      }

      .clear-button-data-class {
        font-weight: bold !important;
        padding:0.3rem;
      }      

      .todos {
        align-items: center;
        display: flex;
        font-size: 18px;
        padding-top: 3px;
      }
      .app {
        padding: 3px;
        background-color: floralwhite;
      }
  
    }
  `

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <style>{my_css}</style>
      <Tooltip title="Clear the list">
        <button type="button" id="clear-button" onClick={function(event){handleClickOpen();}}>🆑</button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to clear ALL items in the list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={function(event){handleClose();}}>Cancel</Button>

          <Button onClick={function(event){ setTodos([]); localStorage.setItem('todos', JSON.stringify([])); handleClose();}}>YES</Button>
        </DialogActions>
      </Dialog>
  

      <form onSubmit={addTodo}>
        <input type="text" placeholder="Add todo" name="todo-input" ref={todoText} />
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {todos.map(todo => (<li key={todo}>{todo}</li>))}  
      </ul>
    </div>
  );
}

export default App;
