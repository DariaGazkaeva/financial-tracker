import { useTransactionStore } from '@app-store/useTransactionStore.ts';
import './balance-summary.css';

function BalanceSummary() {
    const summary = useTransactionStore(state => state.summary);

    return (
        <div className="balance-summary">
            <div className="balance-summary__card">
                <span className="balance-summary__label">Бюджет</span>
                <span className="balance-summary__value balance-summary__value--total">
                    { summary.total }
                </span>
            </div>

            <div className="balance-summary__cards-container">
                <div className="balance-summary__card">
                    <span className="balance-summary__label">Доходы</span>
                    <span className="balance-summary__value balance-summary__value--income">
                        { summary.income }
                    </span>
                </div>

                <div className="balance-summary__card">
                    <span className="balance-summary__label">Расходы</span>
                    <span className="balance-summary__value balance-summary__value--expense">
                        { summary.expense }
                    </span>
                </div>
            </div>
        </div>
    );
}
export default BalanceSummary;
