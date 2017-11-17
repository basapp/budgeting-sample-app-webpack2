import React from 'react';
import renderer from 'react-test-renderer';
import BudgetItemDetail from 'components/BudgetItemDetail';

// mock nested components
jest.mock('components/DonutChart/Path');
jest.mock('components/Chart', () => 'div');
jest.mock('components/Legend', () => 'div');

it('renders correctly', () => {
  const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
  };

  const mockCategory = 'Groceries';

  const mockPercent = 9.23;

  const tree = renderer.create(    
      <BudgetItemDetail transaction={mockTransaction} category={mockCategory} percent={mockPercent} redirectToBudget={()=>{}} />          
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly no Transaction', () => {
  const mockTransaction = {};

  const mockCategory = '';

  const mockPercent = 0;

  const tree = renderer.create(    
      <BudgetItemDetail transaction={mockTransaction} category={mockCategory} percent={mockPercent} redirectToBudget={()=>{}} />          
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
