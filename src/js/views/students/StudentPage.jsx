import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const combinedData = require('json!data/Aggregated.json').data;

export default class StudentPage extends Component {
  render() {
    const studentName = decodeURIComponent(this.props.params.studentName.replace(/_/g, ' '));
    const studentRecords = combinedData.filter((student) => student.Name === studentName);

    return (
      <div className="main-content">
        {studentRecords.length ?
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>{studentName}</h2>
                <br/>
              </div>
            </div>
            <div className="row">
              {studentRecords.map((studentRecord) => {
                return studentRecord.Awards.map((award, i) => {
                  const facultyLink = (
                    <Link className={studentRecord.Faculty.toLowerCase()}
                      to={`/${studentRecord.Faculty.toLowerCase()}`}>
                      {studentRecord.Faculty}
                    </Link>
                  );

                  return (
                    <div className="col-md-6" key={i}>
                      <div className="card card-block">
                        {award.Type === 'Dean\'s List Award' ?
                          <div>
                            <h4 className="card-title">{award.Type}</h4>
                            <p className="card-text">{award.AcadYear} Sem {award.Sem} &middot; {facultyLink}</p>
                          </div> : null
                        }
                        {award.Type === 'Faculty Award' ?
                          <div>
                            <h4 className="card-title">{award.AwardName}</h4>
                            <p className="card-text">{award.AcadYear} &middot; {facultyLink}</p>
                          </div> : null
                        }
                        {award.Type === 'Commencement Award' ?
                          <div>
                            <h4 className="card-title">{award.AwardName}</h4>
                            <p className="card-text">{award.AcadYear} &middot; {facultyLink}</p>
                            <p className="card-text">
                              <small className="text-muted">{award.AwardDesc}</small>
                            </p>
                          </div> : null
                        }
                      </div>
                    </div>
                  );
                });
              })}
            </div>
            <hr/>
            <div>
              <button className="btn btn-primary" onClick={() => {
                this.context.router.goBack();
              }}>Back</button>
            </div>
          </div>
          :
          <div className="text-sm-center">
            <h3>Student not found :(</h3>
          </div>
        }
      </div>
    )
  }
}

StudentPage.contextTypes = {
  router: PropTypes.object
};
