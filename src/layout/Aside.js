import React, { useState, useEffect } from "react";
import { errorNotify } from "../helpers/notify";
import { Paginate } from "../helpers/Paginate";
import Pagination from "../common/Pagination";
import { getTransactionLog } from "../services/transaction.service";
import { getAuthToken } from "../services/authService";

const Aside = () => {
  const [transactions, setTransactions] = useState([]);
  const [paginate, setPaginate] = useState({ pageSize: 5, currentPage: 1 });

  /* handle page change during pagination */
  const handlePageChange = (page) => {
    setPaginate({ ...paginate, currentPage: page });
  };

  /* Paginate data in tables */
  const recordsData = Paginate(
    transactions,
    paginate.currentPage,
    paginate.pageSize
  );

  const transactioLog = async () => {
    try {
      const { data } = await getTransactionLog(getAuthToken());
      setTransactions(data);
    } catch (ex) {
      if (ex.response.status >= 400 && ex.response.status < 500)
        errorNotify("Failed to load transactions.");
    }
  };

  useEffect(() => {
    transactioLog();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h6 className="h6 text-center pt-2">Transactions log</h6>
        <ul className="list-group list-group-numbered mt-2">
          {recordsData &&
            recordsData.map((data, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div
                    className="fw-bold"
                    style={{ textTransform: "capitalize" }}
                  >
                    {data.transaction_type_name}
                  </div>
                  <i style={{ textTransform: "uppercase" }}>
                    {data.source_name}
                  </i>{" "}
                  To <i>{data.destination_name}</i>
                </div>
                <span className="badge bg-primary rounded-pill">
                  {data.quantity}
                </span>
              </li>
            ))}
        </ul>
        <Pagination
          itemsCount={transactions.length}
          currentPage={paginate.currentPage}
          pageSize={paginate.pageSize}
          onPageChange={handlePageChange}
        />
        {recordsData.length === 0 && (
          <p className="text-center">
            <i>No Data Found</i>
          </p>
        )}
      </div>
    </div>
  );
};

export default Aside;
