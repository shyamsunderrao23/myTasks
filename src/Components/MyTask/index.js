import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTask extends Component {
  state = {
    taskInput: '',
    taskList: [],
    optionId: tagsList[0].optionId,
    isActive: false,
    //  tagsSelectedList: [],
  }

  onChangeTask = event => {
    this.setState({
      taskInput: event.target.value,
    })
  }

  onChangeOptionId = event => {
    this.setState({
      optionId: event.target.value,
    })
  }

  onsubmitForm = event => {
    event.preventDefault()
    const {taskInput, optionId} = this.state
    const typeOption = tagsList.find(eachTag => eachTag.optionId === optionId)
    const {displayText} = typeOption
    const newTaskList = {
      id: uuidv4(),
      InputTask: taskInput,
      tagType: displayText,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTaskList],
      taskInput: '',
      optionId: tagsList[0].optionId,
    }))
  }

  renderCreateTaskContainer = () => {
    const {taskInput, optionId} = this.state
    return (
      <div className="create-task-container">
        <h1 className="heading">Create a task!</h1>
        <form className="form" onSubmit={this.onsubmitForm}>
          <label className="task-label" htmlFor="task">
            Task
          </label>
          <input
            type="select"
            className="task-input"
            id="task"
            placeholder="Enter the task here"
            onChange={this.onChangeTask}
            value={taskInput}
          />
          <label className="tags-label" htmlFor="tags">
            Tags
          </label>
          <select
            className="input-select-tags"
            id="tags"
            value={optionId}
            onChange={this.onChangeOptionId}
          >
            {tagsList.map(eachTag => (
              <option
                className="tagOption"
                key={eachTag.optionId}
                value={eachTag.optionId}
              >
                {eachTag.displayText}
              </option>
            ))}
          </select>
          <button className="task-button" type="submit">
            Add Task
          </button>
        </form>
      </div>
    )
  }

  onClickTagsBtn = optionId => {
    const {taskList} = this.state
    const filteredTasks = taskList.filter(
      eachTag => eachTag.optionId === optionId,
    )
    this.setState({taskList: filteredTasks})
  }

  renderingTagsContainer = () => {
    const {taskList} = this.state
    return (
      <div className="tags-list-container">
        <h1 className="tags-heading">Tags</h1>
        <ul className="ul-tags-list">
          {tagsList.map(eachTag => (
            <li className="lis-tags-list" key={eachTag.optionId}>
              <button
                className="tags-button"
                type="button"
                value={taskList}
                onClick={this.onClickTagsBtn}
              >
                {eachTag.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1 className="tasks-heading">Tasks</h1>
        {taskList.length > 0 ? (
          <ul className="ul-tasks-list">
            {taskList.map(each => (
              <li className="li-tasks-list" key={each.optionId}>
                <p className="input-tasks" key={each.optionId}>
                  {each.InputTask}
                </p>
                <button type="button" className="input-btn">
                  {each.tagType}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-task-view">No Tasks Added Yet</p>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="main-container">
          {this.renderCreateTaskContainer()}
          {this.renderingTagsContainer()}
        </div>
      </div>
    )
  }
}

export default MyTask
