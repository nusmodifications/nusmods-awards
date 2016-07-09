import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const combinedData = require('json!data/Combined.json').data;

export default class StudentPage extends Component {
  render() {
    const studentName = decodeURIComponent(this.props.params.studentName);
    const studentRecords = combinedData.filter((student) => student.Name === studentName);

    return (
      <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>{studentName}</h2>
              <br/>
            </div>
          </div>
          <div className="row">
            {studentRecords.map((studentRecord) => {
              return studentRecord.DeansList.map((sem) => {
                return (
                  <div className="col-md-6">
                    <div className="card card-block" key={sem}>
                      <h4 className="card-title">
                        <Link className={studentRecord.Faculty.toLowerCase()}
                          to={`/${studentRecord.Faculty.toLowerCase()}`}>
                          {studentRecord.Faculty}
                        </Link>
                      </h4>
                      <p className="card-text">Dean's List in {sem}</p>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    )
  }
}
