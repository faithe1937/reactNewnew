import React, { Component } from "react";
// import "../List.css";

import TodoCreate from "./TodoCreate";

export default class List extends Component {
  render() {
    const {
      name = "Your list name",
      placeholder = `New task on ${name}`
    } = this.props;

    return (
      <div className="td-list_container">
        <h5 className="td-list_name">{name}</h5>

        <div className="td-list_add_task_box">
          <input
            type="text"
            className="td-list_add_field"
            value={this.state.inputValue}
            onChange={this.onChange.bind(this)}
            placeholder={placeholder}
          />
          <button
            onClick={this.onButtonClick.bind(this)}
            className="td-list_add_cta"
          >
            Add new task
          </button>
        </div>

        <div className="td-task-box">
          {this.state.tasks.map((task, idx, tasks) => (
            <TodoCreate
              checked={task.status}
              key={idx}
              onInpChange={this.onInputChange.bind(this, task, { idx }, tasks)}
              removeTask={this.removeThisTask.bind(this, { idx }.idx)}
            >
              {task.text}
            </TodoCreate>
          ))}
        </div>
      </div>
    );
  }

  state = {
    tasks: [],
    inputValue: ""
  };

  onChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  onButtonClick() {
    const newArr = this.state.tasks.slice(0);
    newArr.length < 10
      ? newArr.push({ text: this.state.inputValue, status: false })
      : alert(
          "Try to accomplish your actual tasks instead of creating a new one"
        );

    this.setState({
      tasks: newArr,
      inputValue: ""
    });
  }

  onInputChange(tarea, indice, tareas) {
    if (tarea.status) {
      tarea.status = false;
    } else {
      tarea.status = true;
    }

    this.setState({
      tasks: tareas
    });
  }

  removeThisTask(arrIdx) {
    const newArr = this.state.tasks.splice(0);

    if (arrIdx > -1) {
      newArr.splice(arrIdx, 1);
    }

    this.setState({
      tasks: newArr
    });
  }
}
