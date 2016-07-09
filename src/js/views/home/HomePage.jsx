import React, { Component, PropTypes } from 'react';
import Pagination from 'components/Pagination';

const combinedData = require('json!data/Combined.json').data;
const PAGE_SIZE = 10;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      currentPage: 1
    };
  }

  changePage(difference) {
    this.setState({
      currentPage: this.state.currentPage + difference
    });
  }

  render() {
    const filteredStudents = combinedData.filter((student) => {
                              if (this.state.search.length <= 2) {
                                return true;
                              }
                              return student.Name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1;
                            });

    return (
      <div>
        <div className="container">
          <form>
            <div className="form-group">
              <input className="form-control form-control-lg"
                value={this.state.search}
                placeholder="Search for someone..."
                onChange={(event) => {
                this.setState({
                  currentPage: 1,
                  search: event.target.value
                });
              }}/>
            </div>
          </form>
        </div>
        <div className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p>{filteredStudents.length} results found</p>
              </div>
              <div className="col-md-6 text-xs-right">
                <Pagination
                  currentPage={this.state.currentPage}
                  pageSize={PAGE_SIZE}
                  totalSize={filteredStudents.length}
                  onPrevClick={this.changePage.bind(this, -1)}
                  onNextClick={this.changePage.bind(this, 1)}/>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-12">
                <ul className="list-group">
                  {filteredStudents
                    .slice((this.state.currentPage - 1) * PAGE_SIZE, this.state.currentPage * PAGE_SIZE)
                    .map((student, i) => {
                      return (
                        <li className={`list-group-item student-row ${student.Faculty}`} key={i}>
                          <div className="row" key={i}>
                            <div className="col-md-3">
                              <span className="student-name">{student.Name}</span>
                            </div>
                            <div className="col-md-3">{student.Faculty}</div>
                            <div className="col-md-4">{student.DeansList.map((sem) => {
                              return (
                                <span>
                                  <span className="label label-primary" key={sem}>{sem}</span>{' '}
                                </span>
                              );
                            })}</div>
                            <div className="col-md-2 text-xs-right">
                              <button className="btn btn-sm btn-primary">View</button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  {!filteredStudents.length ? <li className="list-group-item text-center">No results found</li> : null}
                </ul>
              </div>
            </div>
            <br/>
            <div className="text-sm-center">
              <Pagination
                currentPage={this.state.currentPage}
                pageSize={PAGE_SIZE}
                totalSize={filteredStudents.length}
                onPrevClick={this.changePage.bind(this, -1)}
                onNextClick={this.changePage.bind(this, 1)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
