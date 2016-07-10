import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import Pagination from 'components/Pagination';
import AwardLabel from 'components/AwardLabel';

import nameMatcher from 'utils/nameMatcher';

const combinedData = require('json!data/Aggregated.json').data;
const PAGE_SIZE = 10;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'name'
    };
  }

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

  sort(key, event) {
    event.preventDefault();
    this.setState({
      sort: key
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
    let filteredStudents = combinedData
                              .filter((student) => {
                                if (!search || (search && search.length <= 1)) {
                                  return true;
                                }
                                return nameMatcher(student.Name, search);
                              })

    if (this.state.sort === 'name') {
      filteredStudents = _.sortBy(filteredStudents, (o) => o.name);
    } else if (this.state.sort === 'awards') {
      filteredStudents = _.sortBy(filteredStudents, (o) => -o.Awards.length);
    }

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
            <div className="col-xs-4">
              <p>{filteredStudents.length} results found</p>
            </div>
            <div className="col-xs-8 text-xs-right">
              {pagination}
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
                        <div className="col-md-4">
                          <a href onClick={this.sort.bind(this, 'name')}>Name</a>
                        </div>
                        <div className="col-md-4">Faculty</div>
                        <div className="col-md-4">
                          <a href onClick={this.sort.bind(this, 'awards')}>Awards</a>
                        </div>
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
                              <div className="col-md-4">{student.Name}</div>
                              <div className="col-md-4">
                                <span className="text-muted">{student.Faculty}</span>
                              </div>
                              <div className="col-md-4">{student.Awards.map((award, i) => {
                                return (
                                  <span key={i}>
                                    <AwardLabel award={award}/>{' '}
                                  </span>
                                );
                              })}</div>
                            </div>
                          </div>
                          <div className="col-md-2 col-xs-4 text-xs-right">
                            <Link className="btn btn-sm btn-primary"
                              to={`/s/${encodeURIComponent(student.Name)}`}>
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
