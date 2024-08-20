// src/pages/InvoiceList.js
import React, { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../redux/invoicesSlice";

const InvoiceList = () => {
  const { invoiceList, getOneInvoice } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;
  const [copyId, setCopyId] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCopyClick = () => {
    const invoice = getOneInvoice(copyId);
    if (!invoice) {
      alert("Please enter a valid invoice ID.");
    } else {
      navigate(`/create/${copyId}`);
    }
  };

  const handleEditClick = (invoiceId) => {
    navigate(`/edit/${invoiceId}`);
  };

  const handleDeleteClick = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId));
  };

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <Row>
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <h3 className="fw-bold pb-2 pb-md-4 text-center">Swipe Assignment</h3>
        <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
          {isListEmpty ? (
            <div className="d-flex flex-column align-items-center">
              <h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>
              <Link to="/create">
                <Button variant="primary">Create Invoice</Button>
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <h3 className="fw-bold pb-2 pb-md-4">Invoice List</h3>
                <Link to="/create">
                  <Button variant="primary mb-2 mb-md-4">Create Invoice</Button>
                </Link>
                <div className="d-flex gap-2">
                  <Button variant="dark mb-2 mb-md-4" onClick={handleCopyClick}>
                    Copy Invoice
                  </Button>
                  <input
                    type="text"
                    value={copyId}
                    onChange={(e) => setCopyId(e.target.value)}
                    placeholder="Enter Invoice ID to copy"
                    className="bg-white border"
                    style={{ height: "50px" }}
                  />
                </div>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Invoice No.</th>
                    <th>Bill To</th>
                    <th>Due Date</th>
                    <th>Total Amt.</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceList.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td className="fw-normal">{invoice.billTo}</td>
                      <td className="fw-normal">{invoice.dateOfIssue}</td>
                      <td className="fw-normal">
                        {invoice.currency}{invoice.total}
                      </td>
                      <td style={{ width: "5%" }}>
                        <Button variant="outline-primary" onClick={() => handleEditClick(invoice.id)}>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <BiSolidPencil />
                          </div>
                        </Button>
                      </td>
                      <td style={{ width: "5%" }}>
                        <Button variant="danger" onClick={() => handleDeleteClick(invoice.id)}>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <BiTrash />
                          </div>
                        </Button>
                      </td>
                      <td style={{ width: "5%" }}>
                        <Button variant="secondary" onClick={() => openModal(invoice)}>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <BsEyeFill />
                          </div>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card>
      </Col>
      {selectedInvoice && (
        <InvoiceModal
          showModal={isModalOpen}
          closeModal={closeModal}
          info={selectedInvoice}
          items={selectedInvoice.items}
          currency={selectedInvoice.currency}
          total={selectedInvoice.total}
          taxAmount={selectedInvoice.taxAmount}
          discountAmount={selectedInvoice.discountAmount}
        />
      )}
    </Row>
  );
};

export default InvoiceList;
