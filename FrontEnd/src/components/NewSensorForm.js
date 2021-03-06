import React from 'react';
import PropTypes from 'prop-types';
import NewSensorTextInput from './NewSensorTextInput';
import NewSensorSensorTypeDropdown from './NewSensorSensorTypeDropdown';
import NewSensorRandomIntervalDropdown from './NewSensorRandomIntervalDropdown';
import toPascalCase from 'to-pascal-case';
import {
  Button,
} from 'react-bootstrap';

class NewSensorForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sensor: {
        _id: props.sensor._id,
        name: props.sensor.name,
        initialValue: props.sensor.initialValue,
        max: props.sensor.max,
        min: props.sensor.min,
        duration: props.sensor.duration,
        interval: props.sensor.interval,
        type: props.sensor.type,
        sinInterval: props.sensor.sinInterval,
        minInterval: props.sensor.minInterval,
        maxInterval: props.sensor.maxInterval,
        randomInterval: props.sensor.randomInterval,
      },
      sinSelected: false,
      randomSelected: false,
    };
    this.newSensorKeypress = this.newSensorKeypress.bind(this);
    this.dropdownOnSelect = this.dropdownOnSelect.bind(this);
    this.renderSinIntervalInput = this.renderSinIntervalInput.bind(this);
    this.renderRandomIntervalContainer = this.renderRandomIntervalContainer.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const sin = toPascalCase(String(nextProps.sensor.type));
    const random = toPascalCase(String(nextProps.sensor.randomInterval));
    this.setState({
      sensor: nextProps.sensor,
      sinSelected: sin === "Sin" ? true : false,
      randomSelected: random === "True" ? true : false,
    });
  }

  newSensorKeypress(field, value) {
    const {
      state: {
        sensor,
      },
    } = this;

    this.setState({
      sensor: Object.assign(
        {},
        sensor,
        { [field]: String(value) }
      )
    });
  }

  dropdownOnSelect(eventKey) {
    const {
      state: {
        sensor,
      },
    } = this;
    if (eventKey === 'True' || eventKey === 'False')
    {
      const randomSelected = eventKey === 'True' ? true : false;

      if (randomSelected === false) {
        this.setState({
          sensor: Object.assign(
            {},
            sensor,
            {
              ['randomInterval']: toPascalCase(eventKey),
              ['minInterval']: '',
              ['maxInterval']: '',
            }
          ),
          randomSelected,
        });
      }
      else {
        this.setState({
          sensor: Object.assign(
            {},
            sensor,
            { ['randomInterval']: toPascalCase(eventKey) }
          ),
          randomSelected,
        });
      }
    }
    else
    {
      const sinSelected = toPascalCase(eventKey) == "Sin";
      this.setState({
        sensor: Object.assign(
          {},
          sensor,
          { ['type']: toPascalCase(eventKey) }
        ),
        sinSelected,
      });
    }
  }

  renderSinIntervalInput(sinSelected, sensor, eventHandler) {
    return sinSelected === true
    ? (<div
        className={'input'}>
        <span
          className={'labelSpan'}>
          {"Sin interval"}
        </span>
        <NewSensorTextInput
          name={'sinInterval'}
          value={String(sensor.sinInterval)}
          onChange={eventHandler} />
      </div>)
    : null;
  }

  renderRandomIntervalContainer(randomSelected, sensor, eventHandler) {
    return randomSelected === true
      ? (<div>
           <div
            className={'input'}>
            <span
              className={'labelSpan'}>
              Minimum Interval
            </span>
            <NewSensorTextInput
              name={'minInterval'}
              value={randomSelected === false ? "0" : String(sensor.minInterval)}
              onChange={eventHandler} />
          </div>
          <div
            className={'input'}>
            <span
              className={'labelSpan'}>
              Maximum Interval
            </span>
            <NewSensorTextInput
              name={'maxInterval'}
              value={randomSelected === "false" ? "0" : String(sensor.maxInterval)}
              onChange={eventHandler} />
          </div>
         </div>)
      : null;
  }

  save() {
    const {
      props: {
        saveNewSensor,
        updateSensor,
      },
    } = this;

    if(this.state.sensor.name === '' )
    {
      alert('Please enter a valid Sensor Name');
    }
    else if (String(this.state.sensor.initialValue).match(/[a-z]/i) || this.state.sensor.initialValue === '')
    {
      alert('Please enter a valid number for initial value');
    }
    else if (String(this.state.sensor.max).match(/[a-z]/i) || this.state.sensor.max === '')
    {
      alert('Please enter a valid number for max value');
    }
    else if (String(this.state.sensor.min).match(/[a-z]/i) || this.state.sensor.min === '')
    {
      alert('Please enter a valid number for min value');
    }
    else if (String(this.state.sensor.duration).match(/[a-z]/i) || this.state.sensor.duration === '')
    {
      alert('Please enter a valid number for duration');
    }
    else if (String(this.state.sensor.interval).match(/[a-z]/i) || this.state.sensor.interval === '' || parseInt(this.state.sensor.interval) < 1000 )
    {
      alert('Please enter a valid number for interval >= 1000ms');
    }
    else if (this.state.sensor.type === '')
    {
      alert('Please select a sensor type');
    }
    else if (this.state.sensor.type === 'Sin' && (String(this.state.sensor.sinInterval).match(/[a-z]/i) || this.state.sensor.sinInterval === ''))
    {
      alert('Please enter a valid number for sin interval');
    }
    else if (this.state.sensor.randomInterval === '')
    {
      alert('Please select if you want random interval on or off');
    }
    else if (this.state.sensor.randomInterval === 'True' && (String(this.state.sensor.maxInterval).match(/[a-z]/i) || this.state.sensor.maxInterval === '') || parseInt(this.state.sensor.maxInterval) < 1000 && parseInt(this.state.sensor.minInterval) != 0)
    {
      alert('Please enter a valid number for max random interval >= 1000ms');
    }
    else if (this.state.sensor.randomInterval === 'True' && (String(this.state.sensor.minInterval).match(/[a-z]/i) || this.state.sensor.minInterval === '') || parseInt(this.state.sensor.minInterval) < 1000 && parseInt(this.state.sensor.minInterval) != 0)
    {
      alert('Please enter a valid number for min random interval >= 1000ms');
    }
    else
    {
      if (this.props.sensors.find(s => s._id == this.state.sensor._id)) {
        updateSensor(this.state.sensor);
      }
      else {
        saveNewSensor(this.state.sensor);
      }
    }
  }

  render() {
    const {
      state: {
        sensor,
        sinSelected,
        randomSelected,
      },
    } = this;

    return (
      <section
        className={'newSensorForm'}
        style={this.newSensorFormStyle}>
        <div
          className={'input'}>
          <span
            className={'labelSpan'}>
            Name
          </span>
          <NewSensorTextInput
            name={'name'}
            value={String(sensor.name)}
            onChange={this.newSensorKeypress} />
        </div>
        <div
          className={'input'}>
          <span
            className={'labelSpan'}>
            Initial Value
          </span>
          <NewSensorTextInput
            name={'initialValue'}
            value={String(sensor.initialValue)}
            onChange={this.newSensorKeypress} />
        </div>
        <div
          className={'input'}>
          <span
            className={'labelSpan'}>
            Max Value
          </span>
          <NewSensorTextInput
            name={'max'}
            value={String(sensor.max)}
            onChange={this.newSensorKeypress} />
        </div>
        <div
          className={'input'}>
          <span
            className={'labelSpan'}>
            Min Value
          </span>
          <NewSensorTextInput
            name={'min'}
            value={String(sensor.min)}
            onChange={this.newSensorKeypress} />
        </div>
        <div
          className={'input'}>
          <span
            className={'labelSpan'}>
            Duration in ms (0 for ∞)
          </span>
          <NewSensorTextInput
            name={'duration'}
            value={String(sensor.duration)}
            onChange={this.newSensorKeypress} />
        </div>
        <div
          className={'input'}>
          <span
            className={'labelSpan'}>
            Interval in ms
          </span>
          <NewSensorTextInput
            name={'interval'}
            value={String(sensor.interval)}
            onChange={this.newSensorKeypress} />
        </div>
        <div
          className={'input'}>
          <span
            className={'labelSpan'}>
            Sensor Type
          </span>
          <NewSensorSensorTypeDropdown
            id={'sensorTypeDropdown'}
            value={String(sensor.type)}
            onSelect={this.dropdownOnSelect}  />
        </div>
        {this.renderSinIntervalInput(sinSelected, sensor, this.newSensorKeypress)}
        <div
          className={'input'}>
          <span
            className={'labelSpan'}>
            Random Interval
          </span>
          <NewSensorRandomIntervalDropdown
            id={'randomIntervalDropdown'}
            value={String(sensor.randomInterval)}
            onSelect={this.dropdownOnSelect} />
        </div>
        {this.renderRandomIntervalContainer(randomSelected, sensor, this.newSensorKeypress)}
        <Button
          className={'saveButton'}
          bsStyle="primary"
          onClick={this.save}>
          Save
        </Button>
      </section>
    );
  }
}

NewSensorForm.propTypes = {
  sensor: PropTypes.object,
  sensors: PropTypes.array,
  saveNewSensor: PropTypes.func.isRequired,
  updateSensor: PropTypes.func.isRequired,
};

export default NewSensorForm;
