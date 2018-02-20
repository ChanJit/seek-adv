import React, { Component } from 'react';
import ScreenHeading from '../components/ScreenHeading/ScreenHeading';

export default class NotFound extends Component {
  render () {
    return (
      <div>
        <ScreenHeading>Oops, we can't find the page you're looking for</ScreenHeading>
      </div>
    );
  }
}
