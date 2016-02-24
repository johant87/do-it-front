import React from 'react';
import jQuery from 'jquery';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      tasks: []
    };
  }

  componentDidMount(){
      // the jQuery.get callback will create a new context (this), so we need to remember what 'this'
      var self = this;
      jQuery.getJSON("https://dry-shelf-45398.herokuapp.com/tasks.json", function(data){
          self.setState({
              tasks: data.tasks
          });
      });
  }

  renderTask(task) {
    return <Task title={task.title} /> ;
  }

  onAddTask(task){
    var newTask = {title: task}
    var newTasks = this.state.tasks.concat(newTask);
    this.setState({
      tasks: newTasks
    });
    this.saveData(newTask);
  }

  saveData(task){
      jQuery.ajax({
          type: "POST",
          url: "https://dry-shelf-45398.herokuapp.com/tasks.json",
          data: JSON.stringify({
              task: task
          }),
          contentType: "application/json",
          dataType: "json"
      });
  }

  render() {
      return (
        <div>
        <ul>
          {this.state.tasks.map(this.renderTask.bind(this))}
        </ul>
            <AddTaskForm onSubmit={this.onAddTask.bind(this)}/>
          </div>
      );
    }
}

export default App;