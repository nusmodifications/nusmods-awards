import React, { Component, PropTypes } from 'react';

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
        <button type="button" className="btn btn-primary-outline"
          onClick={this.props.onPrevClick}
          disabled={this.props.currentPage === 1 || totalPages === 0}>
          <i className="fa fa-chevron-left"/>
        </button>
        <button className="btn btn-primary-outline" disabled={true}>
          {currentStart} - {currentEnd} of {this.props.totalSize}
        </button>
        <button type="button" className="btn btn-primary-outline"
          onClick={this.props.onNextClick}
          disabled={this.props.currentPage === totalPages || totalPages === 0}>
          <i className="fa fa-chevron-right"/>
        </button>
      </div>
    )
  }
}
