import React, { useState, useEffect } from "react";
import { Paginate } from "../helpers/Paginate";
import Pagination from "../common/Pagination";
import { getAuthToken } from "../services/authService";
import { getBatches, traceBatch } from "../services/distribution.service";
import Content from "../layout/Content";
import TableController from "../controllers/TableController";
import TableHeadController from "../controllers/TableHeadController";
import ModalController from "../controllers/ModalController";
import TraceSingle from "../components/TraceSingle";

const headCells = [
  { id: 1, title: "Batch No" },
  { id: 2, title: "Drug name" },
  { id: 3, title: "Drug type" },
  { id: 4, title: "Status" },
  { id: 5, title: "Action" },
];

const TracePage = (props) => {
  const [show, setShow] = useState(false);
  const [batches, setBatches] = useState([]);
  const [batchTarce, setBatchTarce] = useState([]);
  const [paginate, setPaginate] = useState({ pageSize: 5, currentPage: 1 });

  /* handle page change during pagination */
  const handlePageChange = (page) => {
    setPaginate({ ...paginate, currentPage: page });
  };

  /* Paginate data in tables */
  const recordsData = Paginate(
    batches,
    paginate.currentPage,
    paginate.pageSize
  );

  const handleClose = () => {
    setShow(false);
  };

  const showDialog = async (id) => {
    setShow(true);
    await traceSingleBatch(id);
  };

  const getAllBatches = async () => {
    try {
      const { data } = await getBatches(getAuthToken());
      setBatches(data);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const traceSingleBatch = async (batch) => {
    try {
      const { data } = await traceBatch(batch, getAuthToken());
      setBatchTarce(data);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const { profile } = props;

  useEffect(() => {
    getAllBatches();
  }, []);

  return (
    <Content title="Trace Batch" profile={profile}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <TableController>
            <TableHeadController headCells={headCells} />
            <tbody>
              {recordsData &&
                recordsData.map((batch, index) => (
                  <tr key={index}>
                    <td>{batch.batch_number}</td>
                    <td>{batch.drug_name}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {batch.type}
                    </td>
                    <td>
                      {batch.status ? (
                        <em className="text-success">Approved</em>
                      ) : (
                        <em className="text-danger">Pending</em>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => showDialog(batch.batch_number)}
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
            itemsCount={batches.length}
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
        <ModalController show={show} label="OK" handleClose={handleClose}>
          <TraceSingle data={batchTarce} />
        </ModalController>
      </div>
    </Content>
  );
};

export default TracePage;
