import React from "react";
import moment from "moment";
import TableController from "../controllers/TableController";

const SingleLostDrug = ({ drugs }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <TableController>
          <tbody>
            <tr>
              <td>
                <b>Reference No</b>
              </td>
              <td>{drugs.reference_number}</td>
              <td>
                <b>Batch No</b>
              </td>
              <td style={{ textTransform: "uppercase" }}>
                {drugs.batch_number}
              </td>
            </tr>
            <tr>
              <td>
                <b>Drug name</b>
              </td>
              <td>{drugs.drug_name}</td>
              <td>
                <b>Drug type</b>
              </td>
              <td style={{ textTransform: "capitalize" }}>{drugs.drug_type}</td>
            </tr>
            <tr>
              <td>
                <b>Sender org</b>
              </td>
              <td style={{ textTransform: "uppercase" }}>
                {drugs.source_name}
              </td>
              <td>
                <b>Receiver org</b>
              </td>
              <td>{drugs.destination_name}</td>
            </tr>
            <tr>
              <td>
                <b>Location from</b>
              </td>
              <td>{drugs.source_location}</td>
              <td>
                <b>Location to</b>
              </td>
              <td>{drugs.destination_location}</td>
            </tr>
            <tr>
              <td>
                <b>Trans date</b>
              </td>
              <td>{moment(drugs.date_added).format("ll")}</td>
              <td>
                <b>Trans type</b>
              </td>
              <td style={{ textTransform: "capitalize" }}>
                {drugs.transaction_type_name}
              </td>
            </tr>
          </tbody>
        </TableController>
      </div>
    </div>
  );
};

export default SingleLostDrug;
