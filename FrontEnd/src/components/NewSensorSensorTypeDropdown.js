import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

const NewSensorSensorTypeDropdown = (props) => {
  const handleSelect = (eventKey, event) => {
    props.onSelect(eventKey, event);
  };

  return (
    <DropdownButton
      id={props.id}
      bsStyle={'primary'}
      title={props.value}
      onSelect={handleSelect}>
      <MenuItem eventKey="Sin">Sin</MenuItem>
      <MenuItem eventKey="Ramp">Ramp</MenuItem>
      <MenuItem eventKey="Random">Random</MenuItem>
      <MenuItem eventKey="Binary">Binary</MenuItem>
    </DropdownButton>
  );
};

NewSensorSensorTypeDropdown.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default NewSensorSensorTypeDropdown;
