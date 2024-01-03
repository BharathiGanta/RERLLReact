import React from "react";
import * as htmlToImage from "html-to-image";
import VaccinationCertificate from "./VaccinationCertificate";

const PrintCertificate = ({ handleBack, certificateData }) => {
  const handleDownload = async () => {
    const element = document.getElementById("certificate");

    if (element) {
      try {
        const dataUrl = await htmlToImage.toPng(element);
        downloadImage(dataUrl, `${certificateData.name}.png`);
      } catch (error) {
        console.error("Error converting HTML to image:", error);
      }
    }
  };

  const downloadImage = (dataUrl, fileName) => {
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download</button>
      &nbsp; &nbsp;<button onClick={() => handleBack(null)}>Back</button>
      <VaccinationCertificate certificateData={certificateData} />
    </div>
  );
};

export default PrintCertificate;
