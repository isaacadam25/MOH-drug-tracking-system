import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import moment from "moment";
import { Paginate } from "../helpers/Paginate";
import Pagination from "../common/Pagination";
import { warningNotify } from "../helpers/notify";
import { getAuthToken } from "../services/authService";
import {
  distributionReports,
  expiredTrends,
  lostDrugReports,
} from "../services/distribution.service";
import {
  getTransactionLog,
  getSingleTransaction,
  getDestroyed,
} from "../services/transaction.service";
import { Tabs, Tab } from "react-bootstrap";
import Content from "../layout/Content";
import TableController from "../controllers/TableController";
import TableHeadController from "../controllers/TableHeadController";
import ModalController from "../controllers/ModalController";
import SingleLostDrug from "../components/SingleLostDrug";
import UseChart from "../charts/UseChart";
import UsePieChart from "../charts/UsePieChart";

const headCells = [
  { id: 1, title: "Reference No" },
  { id: 2, title: "Source" },
  { id: 3, title: "Destination" },
  { id: 4, title: "Date sent" },
  { id: 5, title: "Date Received" },
  { id: 6, title: "Sender" },
  { id: 7, title: "Receiver" },
  { id: 8, title: "Lost" },
];

const transCells = [
  { id: 1, title: "Reference No" },
  { id: 2, title: "Batch No" },
  { id: 4, title: "Source" },
  { id: 5, title: "Destination" },
  { id: 6, title: "Date" },
  { id: 7, title: "Type" },
  { id: 8, title: "Status" },
  { id: 9, title: "Action" },
];

const lostCells = [
  { id: 1, title: "Institution" },
  { id: 2, title: "Destruction date" },
  { id: 5, title: "Need to destroyed" },
  { id: 4, title: "Quantity Destroyed" },
  { id: 6, title: "Lost" },
  { id: 7, title: "Destroyer" },
];

const headers = [
  { label: "Reference No", key: "reference_number" },
  { label: "Source", key: "source_name" },
  { label: "Destination", key: "destination_name" },
  { label: "Drug Name", key: "drug_name" },
];

const headers2 = [
  { label: "Reference No", key: "reference_number" },
  { label: "Source", key: "source_name" },
  { label: "Destination", key: "destination_name" },
  { label: "Acceptor", key: "acceptor_fname" },
  { label: "Sender", key: "sender_fname" },
  { label: "Lost drug", key: "quantity_lost" },
];

const Reports = (props) => {
  const [key, setKey] = useState("home");
  const [lostDrugs, setLostDrugs] = useState([]);
  const [show, setShow] = useState(false);
  const [distributionAmount, setDistributionAmount] = useState([]);
  const [distributionName, setDistributionName] = useState([]);
  const [expiredDrugsAmount, setExpiredDrugsAmount] = useState([]);
  const [labels, setLabels] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [destroyedDrugsMount, setDestroyedDrugsMount] = useState([]);
  const [paginate, setPaginate] = useState({ pageSize: 4, currentPage: 1 });

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

  const handleClose = () => {
    setShow(false);
  };

  const showDialog = async (id) => {
    setShow(true);
    await singleTransaction(id);
  };

  const singleTransaction = async (id) => {
    try {
      const { data } = await getSingleTransaction(id, getAuthToken());
      setTransaction(data);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        warningNotify("Transactions not found.");
      }
    }
  };

  const getDistributedDrugs = async (batchNo) => {
    try {
      const { data } = await distributionReports(batchNo, getAuthToken());
      setDistributionAmount(data.map((x) => x.amount));
      setDistributionName(data.map((y) => y.location));
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        warningNotify("failed to load data.");
      }
      console.log(ex.response);
    }
  };

  const getExpiredTrends = async (year) => {
    try {
      const res = await expiredTrends(year, getAuthToken());
      setExpiredDrugsAmount(res.data.map((x) => x.data)[0].map((y) => y));
      setLabels(res.data.map((x) => x.label));
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        warningNotify("failed to load data.");
      }
    }
  };

  const getLostDrugs = async () => {
    try {
      const { data } = await lostDrugReports(getAuthToken());
      setLostDrugs(data);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        warningNotify("failed to load data.");
      }
      console.log(ex.response);
    }
  };

  const transactioLog = async () => {
    try {
      const { data } = await getTransactionLog(getAuthToken());
      setTransactions(data);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        warningNotify("failed to load data.");
      }
      console.log(ex.response);
    }
  };

  const destroyed = async () => {
    try {
      const { data } = await getDestroyed(getAuthToken());
      setDestroyedDrugsMount(data);
      console.log(data);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        warningNotify("failed to load data.");
      }
      console.log(ex.response);
    }
  };

  const csvReport = {
    data: transactions,
    headers: headers,
    filename: "Transaction_Report.csv",
  };

  const lostDrugReport = {
    data: lostDrugs,
    headers: headers,
    filename: "Lost_Drug_Report.csv",
  };

  const distributionReport = {
    data: headers2,
    headers: headers,
    filename: "Ditribution_Report.csv",
  };

  useEffect(() => {
    getDistributedDrugs("200200MD");
    getExpiredTrends(2018);
    getLostDrugs();
    transactioLog();
    destroyed();
  }, []);

  return (
    <Content title="Reports">
      <div className="col-md-12">
        <h6 className="h6 text-center p-2">Reports management</h6>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          variant="pills"
          className="mb-3"
        >
          <Tab eventKey="home" title="Drug distribution">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h5 className="h5 text-center">Drug distribution chart</h5>
                <CSVLink
                  {...distributionReport}
                  className="btn btn-sm btn-outline-primary float-end"
                >
                  <i className="fa fa-file-excel-o" /> Export
                </CSVLink>
              </div>
              <div className="col-md-11">
                <UsePieChart
                  data={distributionAmount}
                  labels={distributionName}
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Expired Drugs">
            <div className="row justify-content-center">
              <h5 className="h5 text-center">Expired drug chart</h5>
              <div className="col-md-11">
                <UseChart data={expiredDrugsAmount} label={labels} />
              </div>
            </div>
          </Tab>
          <Tab eventKey="transaction" title="Transactions">
            <div className="row justify-content-center">
              <div className="col-md-11">
                <h5 className="h5 text-center">Transactions list</h5>
                <CSVLink
                  {...csvReport}
                  className="btn btn-sm btn-outline-primary float-end"
                >
                  <i className="fa fa-file-excel-o" /> Export
                </CSVLink>
                <TableController>
                  <TableHeadController headCells={transCells} />
                  <tbody>
                    {recordsData &&
                      recordsData.map((drug, index) => (
                        <tr key={index}>
                          <td>{drug.reference_number}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {drug.batch_number}
                          </td>
                          <td style={{ textTransform: "uppercase" }}>
                            {drug.source_name}
                          </td>
                          <td>{drug.destination_name}</td>
                          <td>{moment(drug.date_added).format("ll")}</td>
                          <td>{drug.transaction_type_name}</td>
                          <td>
                            {!drug.is_accepted ? (
                              <em className="text-danger">Pending</em>
                            ) : (
                              <em className="text-success">Accepted</em>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => showDialog(drug.id)}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="fa fa-eye" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </TableController>
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
          </Tab>
          <Tab eventKey="contact" title="Lost Drugs">
            <div className="row justify-content-center">
              <div className="col-md-11">
                <h5 className="h5 text-center">Lost drugs list</h5>
                <CSVLink
                  {...lostDrugReport}
                  className="btn btn-sm btn-outline-primary float-end"
                >
                  <i className="fa fa-file-excel-o" /> Export
                </CSVLink>
                <TableController>
                  <TableHeadController headCells={headCells} />
                  <tbody>
                    {lostDrugs &&
                      lostDrugs.map((drug, index) => (
                        <tr key={index}>
                          <td>{drug.reference_number}</td>
                          <td style={{ textTransform: "uppercase" }}>
                            {drug.sender_organization}
                          </td>
                          <td>{drug.acceptor_organization}</td>
                          <td>{moment(drug.date_sent).format("ll")}</td>
                          <td>{moment(drug.date_received).format("ll")}</td>
                          <td>{drug.sender_fname}</td>
                          <td>{drug.acceptor_fname}</td>
                          <td>{drug.quantity_lost}</td>
                        </tr>
                      ))}
                  </tbody>
                </TableController>
              </div>
            </div>
          </Tab>
          <Tab eventKey="lost" title="Hospital Lost">
            <div className="row justify-content-center">
              <h5 className="h5 text-center">Expired drug chart</h5>
              <div className="col-md-11">
                <TableController>
                  <TableHeadController headCells={lostCells} />
                  <tbody>
                    {destroyedDrugsMount &&
                      destroyedDrugsMount.map((drug, index) => (
                        <tr key={index}>
                          <td>{drug.location_name}</td>
                          <td>{drug.destruction_date}</td>
                          <td>{drug.quantity_destroyed}</td>
                          <td>{drug.quantity_need}</td>
                          <td>
                            {drug.quantity_destroyed -
                              Number(drug.quantity_need)}
                          </td>
                          <td>{drug.destroyer}</td>
                        </tr>
                      ))}
                  </tbody>
                </TableController>
              </div>
            </div>
          </Tab>
        </Tabs>
        <ModalController show={show} label="OK" handleClose={handleClose}>
          <SingleLostDrug drugs={transaction} />
        </ModalController>
      </div>
    </Content>
  );
};

export default Reports;
