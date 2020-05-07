import React, { Component } from 'react'
import axios from 'axios'
import Exercise from './Exercise'

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = { exercises: [] };
  }
  componentDidMount = (e) => {
    axios.get('https://api-exercise-tracker-geflores5.herokuapp.com/exercises')
      .then(res => {
        this.setState({ exercises: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  deleteExercise = (id) => {
    axios.delete(`https://api-exercise-tracker-geflores5.herokuapp.com/exercises/${id}`)
      .then(res => console.log(res.data))
    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id)
    })
  }
  exerciseList = () => {
    return this.state.exercises.map(exercise => {
      return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id} />
    })
  }
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}