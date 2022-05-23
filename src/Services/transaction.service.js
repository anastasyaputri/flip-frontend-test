import http from "../http-common";

class TransactionService {
    getTransactionList() {
        return http.get("/frontend-test");
    }
}

export default new TransactionService();