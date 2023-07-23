import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import List from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    starred: false,
  }

  getStarredList = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment =>
        eachAppointment.id === id
          ? {...eachAppointment, isStarred: !eachAppointment.isStarred}
          : eachAppointment,
      ),
    }))
  }

  onTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onSubmitApp = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  render() {
    const {appointmentsList, titleInput, dateInput, starred} = this.state
    const searchResult = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    return (
      <div className="main-cont">
        <div className="appointment-card">
          <h1 className="heading">Add Appointment</h1>
          <form className="form-card" onSubmit={this.onSubmitApp}>
            <div>
              <label className="title-label" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                className="input-title"
                id="title"
                value={titleInput}
                type="text"
                placeholder="title"
                onChange={this.onTitle}
              />
              <br />
              <label className="date-label" htmlFor="date">
                DATE
              </label>
              <br />
              <input
                className="date-input"
                type="date"
                id="date"
                value={dateInput}
                onChange={this.onDate}
              />
              <br />
              <button className="btn" type="submit">
                Add
              </button>
            </div>
            <img
              className="img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </form>
          <hr className="hr" />
          <div className="appointment-starred">
            <h2 className="list-heading">Appointments</h2>
            <button
              className={`starred-button ${
                starred ? 'active-starred-tab' : 'starred-button'
              }`}
              type="button"
              onClick={this.getStarredList}
            >
              Starred
            </button>
          </div>
          <ul className="ul-list">
            {starred
              ? searchResult.map(eachAppointment => (
                  <List
                    starred={starred}
                    onClickStar={this.onClickStar}
                    appointmentDetails={eachAppointment}
                    key={eachAppointment.id}
                  />
                ))
              : appointmentsList.map(eachAppointment => (
                  <List
                    starred={starred}
                    onClickStar={this.onClickStar}
                    appointmentDetails={eachAppointment}
                    key={eachAppointment.id}
                  />
                ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
