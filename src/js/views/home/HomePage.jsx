import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Pagination from 'components/Pagination';

const combinedData = require('json!data/Combined.json').data;
const PAGE_SIZE = 10;

export default class HomePage extends Component {
  getCurrentPage() {
    return this.props.location.query.page ? parseInt(this.props.location.query.page) : 1;
  }

  changePage(difference) {
    this.context.router.push({
      pathname: '/',
      query: _.assign({}, this.props.location.query, {
          page: this.getCurrentPage() + difference
        })
    });
  }

  search(e) {
    e.preventDefault();
    const search = e.target.elements.search.value
    this.context.router.push({
      pathname: '/',
      query: {
        page: 1,
        search
      }
    });
  }

  render() {
    const currentPage = this.getCurrentPage();
    const search = _.get(this.props.location, 'query.search');
    const filteredStudents = combinedData.filter((student) => {
                              if (!search || (search && search.length <= 2)) {
                                return true;
                              }
                              return student.Name.toLowerCase().indexOf(search.toLowerCase()) > -1;
                            });
    const pagination = <Pagination
                        currentPage={currentPage}
                        pageSize={PAGE_SIZE}
                        totalSize={filteredStudents.length}
                        onPrevClick={this.changePage.bind(this, -1)}
                        onNextClick={this.changePage.bind(this, 1)}/>;

    return (
      <div className="main-content">
        <div className="container">
          <form onSubmit={this.search.bind(this)}>
            <div className="form-group">
              <div className="input-group">
                    <input id="search" className="form-control form-control-lg"
                      defaultValue={search}
                      placeholder="Search for someone..."/>
                    <span className="input-group-btn">
                      <button className="btn btn-lg btn-primary" type="submit">
                        <i className="fa fa-search"/>
                      </button>
                    </span>
                  </div>
            </div>
          </form>
        </div>
        <br/>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>{filteredStudents.length} results found</p>
            </div>
            <div className="col-md-6 text-xs-right">
              {pagination}
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-12">
              <ul className="list-group">
                <li className="list-group-item student-header-row">
                  <div className="row">
                    <div className="col-md-3">Name</div>
                    <div className="col-md-3">Faculty</div>
                    <div className="col-md-4">Awards</div>
                  </div>
                </li>
                {filteredStudents
                  .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                  .map((student, i) => {
                    return (
                      <li className={`list-group-item student-row ${student.Faculty}`} key={i}>
                        <div className="row">
                          <div className="col-md-3">{student.Name}</div>
                          <div className="col-md-3">{student.Faculty}</div>
                          <div className="col-md-4">{student.DeansList.map((sem) => {
                            return (
                              <span key={sem}>
                                <span className="label label-default">{sem}</span>{' '}
                              </span>
                            );
                          })}</div>
                          <div className="col-md-2 text-xs-right">
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
            {pagination}
          </div>
        </div>
      </div>
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object
};
