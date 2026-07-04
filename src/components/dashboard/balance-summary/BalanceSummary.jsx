import clsx from 'clsx';

import './balance-summary.css';

function BalanceSummary({
    total = 0,
    income = 0,
    expense = 0,
}) {
    return (
        <div className="balance-summary">
            <div className="balance-summary__card">
                <span className="balance-summary__label">Баланс</span>
                <span className="balance-summary__value balance-summary__value--total">
                    { total }
                </span>
            </div>

            <div className="balance-summary__cards-container">
                <div className="balance-summary__card">
                    <span className="balance-summary__label">Доходы</span>
                    <span className="balance-summary__value balance-summary__value--income">
                        { income }
                    </span>
                </div>

                <div className="balance-summary__card">
                    <span className="balance-summary__label">Расходы</span>
                    <span className="balance-summary__value balance-summary__value--expense">
                        { expense }
                    </span>
                </div>
            </div>
        </div>
    );
}
export default BalanceSummary;
