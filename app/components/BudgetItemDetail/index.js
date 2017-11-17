import * as React from 'react';
import { formatPercent } from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import styles from './style.scss';
import DonutChart from 'components/DonutChart';

type BudgetItemDetailProps = {
    transaction: Transaction,
    category: {},
    percent: number,
    redirectToBudget: {},
};

const categoryDataItem = (categoryId, value, description) => {
    return {
        categoryId,
        value,
        category: description,
    };
}
const BudgetItemDetail = ({ transaction, category, percent, redirectToBudget }: BudgetItemDetailProps) => {

    const isValidTransaction = transaction.id != undefined;
    const invalidTransactionMessage = "Transaction not found";
    const { id, categoryId, description } = transaction;
    const formatedPercent = formatPercent(percent);
    const isNegative = transaction.value < 0;
    const amountCls = isNegative ? styles.neg : styles.pos;

    const data = [
        categoryDataItem(categoryId, percent, description),
        categoryDataItem(0, 100 - percent, "Others"),
    ];

    const BackButton = () => {
        return <input type="submit"
            value="Back"
            className={styles.button}
            onClick={redirectToBudget} />
    };
    return (

        <div className={styles.budgetItem}>
            {isValidTransaction ? (<div>
                <h2>{description} <span className={styles.category}>{category}</span></h2>
                <h4><span className={amountCls}>{formatedPercent}</span></h4>
                <DonutChart data={data} dataLabel="category" dataKey="categoryId" usePercentSign={true} />
                <BackButton />
            </div>
            ) : (<div>
                <h2><span className={styles.notFound}>{invalidTransactionMessage}</span></h2><br/>
                <BackButton />
            </div>)}
        </div>
    );
};

export default BudgetItemDetail;