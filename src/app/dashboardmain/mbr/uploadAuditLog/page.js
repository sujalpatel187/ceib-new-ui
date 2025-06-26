"use client";

import React, { useEffect } from "react";
import Wrap from "@/app/dashboardmain/page";
import { Table, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMbrsByCompanyId } from "@/lib/features/mbr/mbrActions";
import "./uploadAuditLog.scss";

const columns = [
  { field: "timestamp", label: "Timestamp", sortable: true },
  { field: "user", label: "User id", sortable: true },
  { field: "details", label: "Mbr Name", sortable: true },
  { field: "action", label: "Action", sortable: true },
];

const UploadAuditLog = () => {
  const dispatch = useDispatch();
  const { logs = [], loading, error } = useSelector((state) => state.mbr);

  useEffect(() => {
    const companyId = 84; // Replace with actual company ID
    dispatch(fetchMbrsByCompanyId(companyId));
  }, [dispatch]);

  const getActionText = (action) => {
    switch (action) {
      case "Upload":
        return "Uploaded";
      case "Update":
        return "Updated";
      case "Delete":
        return "Deleted";
      default:
        return action;
    }
  };

  return (
    <Wrap>
      <div className="innerPadding">
        <div className="headTitle d-flex align-items-center justify-content-between">
          <h4 className="mb-0">Audit Log</h4>
        </div>
      </div>
      <Card className=" ms-4 me-4 mb-4">
        <Card.Body>
          <div className="customTable">
            <Table responsive>
              <thead>
                <tr>
                  {columns.map(({ field, label, sortable }) => (
                    <th
                      key={field}
                      className={`px-4 py-2 font-semibold  ${sortable ? "cursor-pointer hover:bg-gray-50" : ""
                        }`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="10" className="text-center text-danger">
                      {error}
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No records found
                    </td>
                  </tr>
                ) : (
                  logs.map((log, index) => (
                    <tr key={index}>
                      <td data-label="Timestamp">
                        {new Date(log.mbr_data.created_at)
                                  .toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })
                                  .replace(",", "")}
                      </td>
                      <td data-label="User">
                        {log.user_id}
                      </td>
                      <td data-label="Details">
                        {log.mbr_data.mbr_name}
                      </td>
                      <td data-label="Action" className={`action-${log.mbr_data.validation_extraction_status ? log.mbr_data.validation_extraction_status.toLowerCase() : ""}`}>
                        {getActionText(log.mbr_data.validation_extraction_status)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Wrap>
  );
};

export default UploadAuditLog;
