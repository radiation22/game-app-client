import React, { useState } from "react";
import QRCode from "react-qr-code";

const ScannerWithNameExtraction = ({ ticket }) => {
  const { startPoint, destination, donation, price } = ticket;

  const [scannedData, setScannedData] = useState("");
  const [prevScannedData, setPrevScannedData] = useState(""); // Store previous scanned data
  const data = {
    startPoint,
    destination,
    donation,
  };

  const [name, setName] = useState(data);

  return (
    <div className="w-[90px] p-0 m-0">
      <QRCode
        className="w-[120px]"
        // onScan={handleScan}
        value={JSON.stringify(data)}
        style={{ height: "50px", width: "100px" }}
      />
    </div>
  );
};

export default ScannerWithNameExtraction;
