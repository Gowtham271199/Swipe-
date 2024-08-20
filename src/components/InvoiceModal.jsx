import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For tables in PDF

const InvoiceModal = ({
  showModal,
  closeModal,
  info = {},
  items = [],
  currency = '',
  taxAmount = 0,
  discountAmount = 0,
  onSave,
  onCopy,
  onSend
}) => {
  const calculateTotals = () => {
    let totalTax = 0;
    let finalTotal = 0;

    if (items.length > 0) {
      items.forEach(item => {
        finalTotal += item.itemPrice * item.itemQuantity;
      });
    }

    totalTax = finalTotal * (taxAmount || 0);
    const totalDiscount = discountAmount || 0;

    finalTotal += totalTax - totalDiscount;

    return {
      totalTax,
      totalDiscount,
      finalTotal
    };
  };

  const { totalTax, totalDiscount, finalTotal } = calculateTotals();

  // Convert values to numbers and use toFixed
  const formatNumber = (value) => {
    return (Number(value) || 0).toFixed(2);
  };

  const generatePDF = (action) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Invoice Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice No: ${info.invoiceNumber || 'N/A'}`, 20, 40);
    doc.text(`Bill To: ${info.billTo || 'N/A'}`, 20, 50);
    doc.text(`Date of Issue: ${info.dateOfIssue || 'N/A'}`, 20, 60);
    doc.text(`Total Amount: ${currency}${formatNumber(finalTotal)}`, 20, 70);
    doc.text(`Tax Amount: ${currency}${formatNumber(totalTax)}`, 20, 80);
    doc.text(`Discount Amount: ${currency}${formatNumber(totalDiscount)}`, 20, 90);

    doc.autoTable({
      head: [['Item', 'Description', 'Price', 'Quantity', 'Total']],
      body: items.map(item => [
        item.itemName,
        item.itemDescription,
        `${currency}${item.itemPrice}`,
        item.itemQuantity,
        `${currency}${item.itemPrice * item.itemQuantity}`
      ]),
      startY: 100,
    });

    if (action === 'save') {
      doc.save('invoice.pdf');
    } else if (action === 'send') {
      // For demonstration, we'll use a simple PDF download.
      // In a real application, you would send this via email or upload to a server.
      doc.output('dataurlnewwindow');
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Invoice No: {info.invoiceNumber || 'N/A'}</p>
        <p>Bill To: {info.billTo || 'N/A'}</p>
        <p>Date of Issue: {info.dateOfIssue || 'N/A'}</p>
        <p>Total Amount: {currency}{formatNumber(finalTotal)}</p>
        <p>Tax Amount: {currency}{formatNumber(totalTax)}</p>
        <p>Discount Amount: {currency}{formatNumber(totalDiscount)}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => generatePDF('save')}>Save as PDF</Button>
        <Button variant="secondary" onClick={() => generatePDF('send')}>Send Invoice</Button>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

InvoiceModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  info: PropTypes.shape({
    invoiceNumber: PropTypes.string,
    billTo: PropTypes.string,
    dateOfIssue: PropTypes.string
  }),
  items: PropTypes.array,
  currency: PropTypes.string,
  total: PropTypes.number,
  taxAmount: PropTypes.number,
  discountAmount: PropTypes.number,
  onSave: PropTypes.func,
  onCopy: PropTypes.func,
  onSend: PropTypes.func
};

export default InvoiceModal;
