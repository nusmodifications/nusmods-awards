import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Pagination from 'components/Pagination';
import AwardLabel from 'components/AwardLabel';

import nameMatcher from 'utils/nameMatcher';

const combinedData = require('json!data/Aggregated.json').data;
const PAGE_SIZE = 10;

export default class FacultyPage extends Component {
  getCurrentPage() {
    return this.props.location.query.page ? parseInt(this.props.location.query.page) : 1;
  }

  getFaculty() {
    return this.props.location.pathname;
  }

  changePage(difference) {
    this.context.router.push({
      pathname: `/${this.getFaculty()}`,
      query: _.assign({}, this.props.location.query, {
          page: this.getCurrentPage() + difference
        })
    });
  }

  search(e) {
    e.preventDefault();
    const search = e.target.elements.search.value
    this.context.router.push({
      pathname: `/${this.getFaculty()}`,
      query: {
        page: 1,
        search
      }
    });
  }

  render() {
    const currentPage = this.getCurrentPage();
    const faculty = _.capitalize(this.getFaculty());
    const search = _.get(this.props.location, 'query.search');
    const filteredStudents = combinedData.filter((student) => {
                              if (student.Faculty !== faculty) {
                                return false;
                              }
                              if (!search || (search && search.length <= 1)) {
                                return true;
                              }
                              return nameMatcher(student.Name, search);
                            });

    return (
      <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h3>{faculty}</h3>
              <br/>
            </div>
            <div className="col-md-4">
              <form onSubmit={this.search.bind(this)}>
                <div className="form-group">
                  <div className="input-group">
                    <input id="search" className="form-control" key={faculty}
                      defaultValue={search}
                      placeholder="Search"/>
                    <span className="input-group-btn">
                      <button className="btn btn-primary" type="submit">
                        <i className="fa fa-search"/>
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-xs-4">
              <p>{filteredStudents.length} results found</p>
            </div>
            <div className="col-xs-8 text-xs-right">
              <Pagination
                currentPage={currentPage}
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
                <li className="list-group-item student-header-row hidden-sm-down">
                  <div className="row">
                    <div className="col-md-10 col-xs-8">
                      <div className="row">
                        <div className="col-md-6">Name</div>
                        <div className="col-md-4">Awards</div>
                      </div>
                    </div>
                  </div>
                </li>
                {filteredStudents
                  .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                  .map((student, i) => {
                    return (
                      <li className={`list-group-item student-row ${student.Faculty}`} key={i}>
                        <div className="row">
                          <div className="col-md-10 col-xs-8">
                            <div className="row">
                              <div className="col-md-6">{student.Name}</div>
                              <div className="col-md-6">{student.Awards.map((award, i) => {
                                return (
                                  <span key={i}>
                                    <AwardLabel award={award}/>{' '}
                                  </span>
                                );
                              })}</div>
                            </div>
                          </div>
                          <div className="col-md-2 col-xs-4 text-xs-right">
                            <Link className="btn btn-sm btn-primary" to={`/s/${encodeURIComponent(student.Name)}`}>
                              View
                            </Link>
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
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              totalSize={filteredStudents.length}
              onPrevClick={this.changePage.bind(this, -1)}
              onNextClick={this.changePage.bind(this, 1)}/>
          </div>
        </div>
      </div>
    );
  }
}

FacultyPage.contextTypes = {
  router: PropTypes.object
};
