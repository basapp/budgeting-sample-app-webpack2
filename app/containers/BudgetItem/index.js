import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactions, getOutflowBalance, getInflowBalance } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import type { Transaction } from 'modules/transactions';
import BudgetItemDetail from 'components/BudgetItemDetail';
import { inflowCategories } from 'modules/defaults';

import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';


// inject reducers that might not have been originally there
injectAsyncReducers({
    transactions: transactionReducer,
    categories: categoryReducer,
});

type BudgetItemProps = {
    transaction: Transaction,
    categories: Object,
};

export class BudgetItem extends React.Component<BudgetItemProps> {   
    constructor(props) {
        super(props);
        this.redirectToBudget = this.redirectToBudget.bind(this);
    }
    static defaultProps = {
        transaction: {},
        category: '',
        percent:0,
    };
    redirectToBudget() {        
        this.props.history.push('/budget');
    }
    render() {
        const { transaction, category, percent} = this.props;

        return (
            <BudgetItemDetail 
                transaction={transaction} 
                category={category} 
                percent={percent}
                redirectToBudget={this.redirectToBudget}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const queryParams = ownProps.location.pathname.split('/');
    const tId = queryParams[queryParams.length - 1];
    const transactions = getTransactions(state);
    const categories = getCategories(state);
    
    let transaction = transactions.find(t => t.id == tId);
    let category = {};
    let totalBalance = 0;
    let percent = 0;

    if (transaction) {        
        category = categories[transaction.categoryId];                
        if (inflowCategories.includes(transaction.categoryId))                    
            totalBalance = getInflowBalance(state);
        else                
            totalBalance = getOutflowBalance(state);        
        percent = transaction.value * 100 / totalBalance;
    };       
    return {
        transaction,
        category,        
        percent,        
    };
};

export default connect(mapStateToProps)(BudgetItem);
