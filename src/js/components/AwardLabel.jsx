import React, { Component, PropTypes } from 'react';

export default class AwardLabel extends Component {
  render() {
    return (
      <span className="label label-default">
        {this.props.award.Type}{' '}
        {this.props.award.AcadYear}{' '}
        {this.props.award.Sem ? <span>Sem {this.props.award.Sem}</span> : null}
      </span>
    )
  }
}
