// @flow
import React from 'react';
/* eslint-disable */
// $FlowFixMe
import stuff from '!!style-loader!css-loader!../src/bundle.css';
/* eslint-enable */

export default () => (
  <form onSubmit={e => e.preventDefault()}>
    <h2>Add a comment</h2>
    <div className="ak-field-group">
      <label htmlFor="description">Comment</label>
      <textarea
        className="ak-field-textarea"
        rows="5"
        id="comment"
        name="comment"
      />
    </div>
    <div className="ak-field-group">
      <button className="ak-button ak-button__appearance-primary">
        Add comment
      </button>
    </div>
  </form>
);
