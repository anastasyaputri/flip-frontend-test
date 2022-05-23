import React from "react";
import '../../Asset/scss/TransactionLayout.scss';
import { useSelector } from 'react-redux';
import InboxIcon from "../../Asset/Icon/inbox.png";

const TransactionDetailView = () => {
    const AllRedu = useSelector(state => state.AllRedu)

    const goBack = () => {
        window.history.go(-1)
    }

    return (
        <>
            <div className="txnList-layout">
                <div className="txnList-topSide">
                    <div className="txnList-header">
                        <div className="txnList-title">Detail Transaksi</div>
                    </div>
                    <div>
                        <div className='txnDetail-transactionId'>
                            <div className="txnDetail-titleLayout">
                                <div>
                                    <div className="txnDetail-title">ID TRANSAKSI : {AllRedu.txnDetail.id}</div>
                                </div>
                            </div>
                            {
                                AllRedu.txnDetail.status === "SUCCESS" ?
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
                        <div className='txnDetail-eachList'>
                            <div>
                                <img className="txnDetail-inbox-img" src={InboxIcon} alt="txn"></img>
                            </div>
                            <div className="txnDetail-titleLayout">
                                <div className="txnDetail-content-section">
                                    <div className="txnDetail-title">PENGIRIM</div>
                                    <div className="txnDetail-value">{AllRedu.txnDetail.sender_bank}</div>
                                </div>
                                
                                <div className="txnDetail-content-section">
                                    <div className="txnDetail-title">PENERIMA</div>
                                    <div className="txnDetail-value">{AllRedu.txnDetail.beneficiary_bank}</div>
                                    <div className="txnDetail-value">{AllRedu.txnDetail.account_number}</div>
                                    <div className="txnDetail-beneficiaryName">{AllRedu.txnDetail.beneficiary_name}</div>
                                </div>

                                <div className="txnDetail-content-section">
                                    <div className="txnDetail-title">NOMINAL</div>
                                    <div className="txnDetail-amount">Rp {Intl.NumberFormat("id-ID").format(AllRedu.txnDetail.amount)}</div>
                                    <div className="txnDetail-title-uniqueCode">Kode Unik : <span className="txnDetail-value">{AllRedu.txnDetail.unique_code}</span></div>
                                </div>

                                <div className="txnDetail-content-section">
                                    <div className="txnDetail-title">CATATAN</div>
                                    <div className="txnDetail-remark">{AllRedu.txnDetail.remark}</div>
                                </div>

                                <div className="txnDetail-content-section">
                                    <div className="txnDetail-title">WAKTU DIBUAT</div>
                                    <div className="txnDetail-transactionDate">{AllRedu.txnDetail.created_at}</div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="txnDetail-button-back" onClick={goBack}>
                <div className="txnDetail-button-back-sec">
                    <div className="txnDetail-button-back-content">Kembali</div>
                </div>
            </div>
        </>
    )
}

export default TransactionDetailView