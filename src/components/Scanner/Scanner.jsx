import React from "react";
import QRCode from "react-qr-code";

const ScannerWithNameExtraction = ({ ticket }) => {
  const { startPoint, destination, donation, price } = ticket;

  const data = {
    startPoint,
    destination,
    donation,
    price,
  };

  return (
    <div className="w-[90px] p-0 m-0">
      <QRCode
        className="w-[120px]"
        value={JSON.stringify(data)}
        style={{ height: "60px", width: "110px" }}
      />
    </div>
  );
};

export default ScannerWithNameExtraction;
