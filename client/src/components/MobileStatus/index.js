import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import localstorage from 'services/localstorage';
import CompactStatusForm from 'components/CompactStatusForm';
import StatusCounts from 'components/StatusCounts';

import styles from './style.pcss';

const now = moment();

export default class MobileStatus extends Component {
  state = {
    submitted: false
  }

  handleSubmit = state => {
    // TODO: actually make sure that it's received. Now it's kind of fire and forget.
    this.props.entryActions.addEntry(state);

    this.setState({
      submitted: true
    });
  }

  isFormEnabled = () => {
    const { loading, d } = this.props;
    return !loading && (now.format('GGGG') == d.format('GGGG') && now.format('WW') == d.format('WW'));
  }

  enableForm = event => {
    event.preventDefault();

    this.setState({
      submitted: false,
    })
  }

  render() {
    const { d, employees, entries, now } = this.props;
    const { submitted } = this.state;

    return (
      <div className={styles.container}>
        {!submitted
          ?
            <CompactStatusForm
              initialValues={localstorage.load()}
              enabled={this.isFormEnabled()}
              now={now}
              d={d}
              employees={employees}
              onSubmit={this.handleSubmit}
            />
          :
            <div className={styles.submitted}>
              <p>Your status was submitted, thanks!</p>

              <a onClick={this.enableForm}>Submit a new status</a>

              <h1>Week status:</h1>
              <StatusCounts messages={entries} />
            </div>
        }
      </div>
    );
  }
}
