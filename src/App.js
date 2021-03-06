import "./App.css";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  thunk_action_creator,
  thunk_action_creator2,
  thunk_action_creator3,
} from "./actions/fetchAction";
import axios from "axios";

function App(props) {
  const [arr, setArr] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [fisrtTime, setfisrtTime] = useState(0);
  const listItems2 = arr.map((action, index) => <p key={index}>{action} </p>);

  const [list, setlist] = useState([]);
  const [listHistory, setlistHistory] = useState([]);

  const listItemsHistory = listHistory.map((log, index) => (
    <p key={index}> {log}</p>
  ));
  const [nowIndex, setNowIndex] = useState(null);
  const listItems = list.map((todo, index) => (
    <p className="pleaseClickMe" onClick={() => clickToEdit(todo, index)}>
      {todo}
    </p>
  ));

  const [input, setInput] = useState("");

  function onChangeInput(event) {
    const text = event.target.value;
    setInput(text);
  }

  function clickToEdit(title, index) {
    setNowIndex(index);
    setInput(title);
  }
  function addList() {
    if (input) {
      if (nowIndex != null) {
        list[nowIndex] = input;
        setInput("");
      } else {
        setlist([...list, input]);
        setInput("");
      }
      /////// if select the value to Edit
      if (nowIndex != null) {
        props.dispatch(thunk_action_creator2());
        if (props.data === undefined) {
          console.log("no");
        } else {
          setArr([...arr, props.data.data]);
        }
        //////////////////////////////////
      } else {
        props.dispatch(thunk_action_creator());
        if (props.data === undefined) {
          console.log("no");
        } else {
          setArr([...arr, props.data.data]);
        }
        setInput("");
      }

      setInput("");
      setNowIndex(null);
      setlistHistory([...listHistory, input]);
      setToggle(!toggle);
    }
  }

  function deleteList() {
    if (nowIndex != null) {
      const delettthis = list.splice(nowIndex, 1);

      if (nowIndex != null) {
        props.dispatch(thunk_action_creator3());
        if (props.data === undefined) {
          console.log("nah");
        } else {
          setArr([...arr, props.data.data]);
        }
      }
      setInput("");
      setNowIndex(null);
      setlistHistory([...listHistory, delettthis]);
      setToggle(!toggle);
    }
  }

  const blurHandler = () => {
    document.getElementById("id1").style.visibility = "hidden";
  };

  const focusHandler = () => {
    if (input) document.getElementById("id1").style.visibility = "visible";
  };

  useEffect(() => {
    if (fisrtTime == 0) {
      setArr([]);
      setfisrtTime(1);
      const loadPost = async () => {
        // const response = await axios.get(
        //   "https://jsonplaceholder.typicode.com/todos/1"
        // );
        // const response2 = await axios.get(
        //   "https://jsonplaceholder.typicode.com/todos/2"
        // );
        const response3 = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        // const keepval = response.data.title;
        // const keepva2 = response2.data.title;
        const keepva3 = response3.data[0].name;
        const keepva4 = response3.data[1].name;
        setlist([keepva3,keepva4]);
      };

      loadPost();
    } else {
      arr.pop();
      setArr([...arr, props.data.data]);
    }
  }, [toggle]);

  return (
    <div className="App">
      <div className="activity-box">
        <h1>Activity List</h1>

        <div className="activity-box-content">
          <div className="activity-box-content-box1">{listItems2}</div>
          <div className="activity-box-content-box2">{listItemsHistory}</div>
        </div>
      </div>

      <div className="todo-box">
        <h1>Todo List</h1>

        <div className="todo-box-content">{listItems}</div>
      </div>

      <div className="input-box">
        <h1>Task Name</h1>

        <div className="input-box-content">
          <input
            type="text"
            value={input}
            onChange={onChangeInput}
            onBlur={blurHandler}
            onFocus={focusHandler}
          />
          <br></br>
          {input != "" ? (
            <p id="id1" className="typing">
              Typing . . .
            </p>
          ) : (
            ""
          )}
          <br></br>
          <br></br>
          {nowIndex == null ? (
            <button className="add-button" onClick={addList}>
              ADD
            </button>
          ) : (
            <button className="add-button" onClick={addList}>
              UPDATE
            </button>
          )}

          <br></br>
          <br></br>
          <button className="delete-button" onClick={deleteList}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

export default connect(mapStateToProps)(App);
