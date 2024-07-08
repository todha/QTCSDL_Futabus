// src/components/InvoiceSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import InvoiceDetails from './InvoiceDetails';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const InvoiceSearch = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const componentRef = useRef();

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8085/api/Invoice/${invoiceNumber}`);
            setInvoiceDetails(response.data);
        } catch (err) {
            setError('Không tìm thấy hóa đơn, vui lòng kiểm tra và nhập lại.');
            setInvoiceDetails(null);
        }
        setLoading(false);
    };

    const handleCloseTab = () => {
        setInvoiceDetails(null);
    };

    // const handlePrint = () => {
    //     window.print()
    // };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

     // Function to generate XML content based on invoice details
     const generateXML = () => {
        if (!invoiceDetails) return '';

        const { kyHieu, soHoaDon, loTrinh, giaVe, soGhe, soXe } = invoiceDetails;
        return `
            <?xml version="1.0" encoding="UTF-8"?>
            <invoice>
                <kyHieu>${kyHieu}</kyHieu>
                <soHoaDon>${soHoaDon}</soHoaDon>
                <loTrinh>${loTrinh}</loTrinh>
                <giaVe>${giaVe}</giaVe>
                <soGhe>${soGhe}</soGhe>
                <soXe>${soXe}</soXe>
            </invoice>
        `;
    };

    // Function to handle downloading XML content
    const handleDownloadXML = () => {
        const xmlContent = generateXML();
        if (xmlContent) {
            const blob = new Blob([xmlContent], { type: 'text/xml' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = invoiceNumber + '.xml';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="relative">
            <div className="invoice-search bg-white shadow-md rounded max-w-xs mx-auto">
                <h2 className="text-xl font-bold mb-4">Nhập mã hóa đơn tại đây:</h2>
                <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="Enter invoice number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
                {error && <div className="tab fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{error}</div>}

            </div>
            {invoiceDetails && (
                <div className="tab fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    <button onClick={handleCloseTab} className="close-tab close-tab absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800 focus:outline-none">X</button>
                    <InvoiceDetails data={invoiceDetails} ref={componentRef} />
                    <div>
                        <ul className="flex items-center justify-center flex-wrap mt-3">
                            <li><button onClick={handlePrint} className="btn btn-print mx-2" >Print</button></li>
                            <li><button onClick={handleDownloadXML} className="btn btn-download mx-2" >Tải XML</button></li>
                        </ul>

                    </div>
                </div>
            )}

        </div>
    );
};

export default InvoiceSearch;
