import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';
import toPascalCase from 'to-pascal-case';

const NewSensorRandomIntervalDropdown = (props) => {
  const handleSelect = (eventKey, event) => {
    props.onSelect(eventKey, event);
  };

  return (
    <DropdownButton
      id={props.id}
      bsStyle={'primary'}
      title={props.value === "" ? "Select ..." : toPascalCase(props.value)}
      onSelect={handleSelect}>
      <MenuItem eventKey="True">True</MenuItem>
      <MenuItem eventKey="False">False</MenuItem>
    </DropdownButton>
  );
};

NewSensorRandomIntervalDropdown.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default NewSensorRandomIntervalDropdown;
