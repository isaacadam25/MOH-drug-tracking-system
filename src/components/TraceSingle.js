import React from "react";
import moment from "moment";
import TableController from "../controllers/TableController";

const TraceSingle = ({ data }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <TableController>
          <tbody>
            {data.map((d, index) => (
              <tr key={index}>
                <td>
                  <b>Location</b>
                </td>
                <td style={{ textTransform: "uppercase" }}>{d.location}</td>
                <td>
                  <b>Date received</b>
                </td>
                <td>{moment(d.date).format("ll")}</td>
              </tr>
            ))}
          </tbody>
        </TableController>
      </div>
    </div>
  );
};

export default TraceSingle;
