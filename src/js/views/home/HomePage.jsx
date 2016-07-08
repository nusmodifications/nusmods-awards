import React, { Component, PropTypes } from 'react';

const combinedData = require('json!data/Combined.json').data;
const PAGE_SIZE = 30;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      currentPage: 0
    };
  }

  changePage(difference) {
    this.setState({
      currentPage: this.state.currentPage + difference
    });
  }

  render() {
    console.log(combinedData);
    const filteredStudents = combinedData.filter((student) => {
                              if (this.state.search.length <= 2) {
                                return true;
                              }
                              return student.Name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1;
                            });

    return (
      <div>
        <h1>Hall of Fame</h1>
        <hr/>
        <form>
          <div className="form-group">
            <input className="form-control" value={this.state.search} onChange={(event) => {
              this.setState({
                currentPage: 0,
                search: event.target.value
              });
            }}/>
          </div>
        </form>
        <div>
          <a onClick={this.changePage.bind(this, -1)}>Prev</a>
          &nbsp;
          <span>{this.state.currentPage * PAGE_SIZE + 1} - {(this.state.currentPage + 1) * PAGE_SIZE} of {filteredStudents.length}</span>
          &nbsp;
          <a onClick={this.changePage.bind(this, 1)}>Next</a>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Faculty</th>
              <th>Times</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            {filteredStudents
              .slice(this.state.currentPage * PAGE_SIZE, (this.state.currentPage + 1) * PAGE_SIZE)
              .map((student, i) => {
                return (
                  <tr key={i}>
                    <td>{student.Name}</td>
                    <td>{student.Faculty}</td>
                    <td>{student.DeansList.length}</td>
                    <td>{student.DeansList.map((sem) => {
                      return (
                        <span>
                          <span className="label label-success" key={sem}>{sem}</span>{' '}
                        </span>
                      );
                    })}</td>
                  </tr>
                );
              })}
            {!filteredStudents.length ? <tr><td colspan={999} className="text-center">No results found</td></tr> : null}
          </tbody>
        </table>
      </div>
    );
  }
}
