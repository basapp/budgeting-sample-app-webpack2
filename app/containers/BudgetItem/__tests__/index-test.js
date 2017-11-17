import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetItem } from '../index';

// mock nested components
jest.mock('components/DonutChart/Path');
jest.mock('components/BudgetItemDetail', () => 'div');

it('renders correctly', () => {
  const tree = renderer.create(<BudgetItem />).toJSON();
  expect(tree).toMatchSnapshot();
});
