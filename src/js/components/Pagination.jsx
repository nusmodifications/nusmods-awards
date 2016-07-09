import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const DEFAULT_PAGE_SIZE = 10;

export default class Pagination extends Component {
  render() {
    const pageSize = this.props.pageSize || DEFAULT_PAGE_SIZE;
    const totalPages = Math.ceil(this.props.totalSize / pageSize);
    const currentStart = this.props.totalSize > 0 ? 1 + ((this.props.currentPage - 1) * this.props.pageSize) : this.props.totalSize;
    let currentEnd = Math.min(this.props.currentPage * this.props.pageSize, this.props.totalSize);

    if (this.props.currentPageSize) {
      currentEnd = Math.min((this.props.currentPage - 1) * this.props.pageSize + this.props.currentPageSize, this.props.totalSize);
    }
    console.log(this.props.currentPage, totalPages);
    return (
      <div className="btn-group" role="group" aria-label="Pagination">
        <a className={classnames('btn btn-sm btn-secondary-outline', {
          disabled: this.props.currentPage === 1 || totalPages === 0
          })}
          onClick={this.props.onPrevClick}>
          <i className="fa fa-chevron-left"/>
        </a>
        <a className="btn btn-sm btn-secondary-outline disabled">
          <span className="text-muted">{currentStart} - {currentEnd} of {this.props.totalSize}</span>
        </a>
        <a className={classnames('btn btn-sm btn-secondary-outline', {
          disabled: this.props.currentPage === totalPages || totalPages === 0
          })}
          onClick={this.props.onNextClick}>
          <i className="fa fa-chevron-right"/>
        </a>
      </div>
    )
  }
}
