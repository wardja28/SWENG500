import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable,TableHeaderColumn } from 'react-bootstrap-table';

class LiveDataFeed extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
        props: {
          sensorFeed,
          noDataMessage,
        },
      } = this;

    return (
      <section className={"liveDataFeed"}>
        <BootstrapTable className={"liveDataFeedTable"} height={"400px"} data={sensorFeed} bordered={false} options={{noDataText: noDataMessage }}>
          <TableHeaderColumn dataField="name" isKey={true}>Sensor Name</TableHeaderColumn>
          <TableHeaderColumn dataField="timestamp">Timestamp</TableHeaderColumn>
          <TableHeaderColumn dataField="value">Payload Value</TableHeaderColumn>
        </BootstrapTable>
      </section>
    );
  }
}

LiveDataFeed.propTypes = {
  sensorFeed: PropTypes.array,
  noDataMessage: PropTypes.string,
};

export default LiveDataFeed;
