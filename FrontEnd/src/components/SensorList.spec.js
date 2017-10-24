import React from 'react';
import { shallow } from 'enzyme';
import SensorList from './SensorList';

describe('<SensorList />', () => {
  it('render: should render a PageHeader component', () => {
    // Arrange, Act
    const result = shallow(<SensorList sensors={[]} />);

    // Assert
    expect(result.node.type).toEqual('section');
    expect(result.node.props.children.length).toEqual(2);
    const pageHeader = result.node.props.children[0];
    expect(pageHeader.type.name).toEqual('PageHeader');
  });

  it('render: should render a div for a sensor if one exists', () => {
    // Arrange, Act
    const sensors = [
      {
        sensor: {
          name: 'name1',
        },
      },
    ];
    const result = shallow(<SensorList sensors={sensors} />);

    // Assert
    expect(result.node.type).toEqual('section');
    expect(result.node.props.children.length).toEqual(2);
    const divArray = result.node.props.children[1];
    const div = divArray[0]
    expect(div.type).toEqual('div');
  });

  it('render: should render multiple divs for multiple sensors if multiple exist', () => {
    // Arrange, Act
    const sensors = [
      {
        sensor: {
          name: 'name1',
        },
      },
      {
        sensor: {
          name: 'name2',
        },
      },
    ];
    const result = shallow(<SensorList sensors={sensors} />);

    // Assert
    expect(result.node.type).toEqual('section');
    expect(result.node.props.children.length).toEqual(2);
    const divArray = result.node.props.children[1];
    const div = divArray[0]
    expect(div.type).toEqual('div');
    const div2 = divArray[1];
    expect(div2.type).toEqual('div');
    expect(divArray.length).toEqual(2);
  });

  it('render: should not render divs for sensors if none exist', () => {
    // Arrange, Act
    const sensors = [];
    const result = shallow(<SensorList sensors={sensors} />);

    // Assert
    expect(result.node.type).toEqual('section');
    expect(result.node.props.children.length).toEqual(2);
  });
});