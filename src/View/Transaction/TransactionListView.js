import React, { useEffect, useState } from "react";
import '../../Asset/scss/TransactionLayout.scss'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import TransactionService from "../../Services/transaction.service";
import Select from "react-select";

const TransactionListView = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const [transactionList, setTransactionList] = useState([])
    const [transactionListOri, setTransactionListOri] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [selectValue, setSelectValue] = useState(null);
    const options = [
        { value: 0, label: 'Nama A-Z' },
        { value: 1, label: 'Nama Z-A' },
        { value: 2, label: 'Tanggal Terbaru' },
        { value: 3, label: 'Tanggal Terlama' }
    ]

    useEffect(() => {
        TransactionService.getTransactionList()
        .then((res) => {
            let response = [];
            var total = 0;
            response = Object.values(res.data);

            response.forEach(data => {
                total += data.amount;

                data.transactionDate = data.created_at;
                
                data.created_at = Date.now();
                data.created_at = new Intl.DateTimeFormat('id-ID', {year: 'numeric', month: 'long',day: '2-digit'}).format(data.created_at)

                data.completed_at = Date.now();
                data.completed_at = new Intl.DateTimeFormat('id-ID', {year: 'numeric', month: 'long',day: '2-digit'}).format(data.completed_at)
            })
            
            setTotalAmount(total);
            setTransactionList(Object.values(res.data));
            setTransactionListOri(Object.values(res.data));
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const searchTransaction = (e) => {
        setSearchValue(e.target.value);
        var searchVal = String(e.target.value);
        if(searchVal !== "") {
            var dataSearch = transactionListOri.filter((row) => {
                const query = searchVal.toLowerCase();
                return (
                    row.beneficiary_name.toLowerCase().indexOf(query) >= 0 ||
                    row.sender_bank.toLowerCase().indexOf(query) >= 0 ||
                    row.beneficiary_bank.toLowerCase().indexOf(query) >= 0
                )
            });
            setTransactionList(dataSearch);
        } else {
            setTransactionList(transactionListOri);
        }
    }

    const handleFilterChange = (e) => {
        setSelectValue(e.value);

        if(e.value === 0) {
            setTransactionList(transactionList.sort((a,b) => a.beneficiary_name === b.beneficiary_name ? 0 : a.beneficiary_name < b.beneficiary_name ? -1 : 1));
        } else if (e.value === 1) {
            setTransactionList(transactionList.sort((a,b) => a.beneficiary_name === b.beneficiary_name ? 0 : b.beneficiary_name < a.beneficiary_name ? -1 : 1));
        } else if(e.value === 2) {
            setTransactionList(transactionList.sort((a,b) => a.transactionDate === b.transactionDate ? 0 : b.transactionDate < a.transactionDate ? -1 : 1));
        } else if(e.value === 3) {
            setTransactionList(transactionList.sort((a,b) => a.transactionDate === b.transactionDate ? 0 : a.transactionDate < b.transactionDate ? -1 : 1));
        }
    }

    const handleSave = (data) => {
        dispatch({ type: 'TXNDETAIL', payload: data });
        history.push('./detail');
    }

    const transactionDetailList = () => {
        return transactionList.map((txn, ind) => {
            return (
                <div key={ind} className='txnList-eachList' onClick={() => handleSave(txn)}>
                    <div className="txnList-status-section" style={{ backgroundColor: txn.status === "SUCCESS" ? '#56b586' : '#fd6542' }}></div>
                    <div className="txnList-titleLayout">
                        <div>
                            <div className="txnList-content-header">
                                <span className="txnList-value-header">{txn.sender_bank} &#8594; {txn.beneficiary_bank}</span>
                            </div>
                            <div className="txnList-beneficiaryname-title">
                                <span className="txnList-beneficiaryname-content">{txn.beneficiary_name}</span>
                            </div>
                            <div className="txnList-beneficiaryname-title">
                                <span className="txnList-each-amount"> Rp {Intl.NumberFormat("id-ID").format(txn.amount)} &#8226; {txn.created_at}</span>
                            </div>
                        </div>
                        {
                            txn.status === "SUCCESS" ?
                            <div className="txnList-status-button">
                                <div className="txnList-success-information">
                                    <div className="txnList-success-value">Berhasil</div>
                                </div>
                            </div>
                            :
                            <div className="txnList-status-button">
                                <div className="txnList-pending-information">
                                    <div className="txnList-pending-value">Pengecekan</div>
                                </div>
                            </div>
                        }
                        
                    </div>
                    
                    
                </div>
            )
        })
    }

    return (
        <>
            <div className="txnList-layout">
                <div className="txnList-topSide">
                    <div className="txnList-header">
                        <div className="txnList-title">Daftar Transaksi</div>
                    </div>
                    <div className="txnList-intro">
                        <div className="txnList-topIntro">Halo Kak!</div>
                        <div className="txnList-topContent">Kamu telah melakukan transaksi sebesar  <span className="txnList-topContent-amount">Rp {Intl.NumberFormat("id-ID").format(totalAmount)}</span> sejak menggunakan Flip.</div>
                    </div>
                    <div className="txnList-filter-section">
                        <input className="txnList-search-textbox" placeholder="Cari nama atau bank" 
                            onChange={(e) => searchTransaction(e)} value={searchValue} 
                        />
                        <Select
                            options={options}
                            placeholder={'URUTKAN'}
                            clearable={false}
                            className="txnList-dropdown-list"
                            onChange={(e) => handleFilterChange(e)}
                            value={options.filter((option) => option.value === selectValue)}
                        />
                    </div>
                    <div>
                        {transactionDetailList()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionListView