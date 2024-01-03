import "./VaccinationCertificate.css";

const VaccinationCertificate = ({ certificateData }) => {
  return (
    <div id="certificate" className="pm-certificate-container">
      <div className="outer-border"></div>
      <div className="inner-border"></div>

      <div className="pm-certificate-border">
        <div className="row pm-certificate-header">
          <div className="pm-certificate-title cursive text-center">
            <h2>Certificate of Vaccination</h2>
          </div>
        </div>

        <div className="row pm-certificate-body">
          <div className="pm-certificate-block">
            <div className="pm-certificate-name underline margin-0 text-center">
              <span className="pm-name-text bold">{certificateData.name}</span>
            </div>

            <div className="pm-earned text-center">
              <span className="pm-earned-text padding-0 block cursive">
                has recieved vaccination for
              </span>
              <span className="pm-credits-text block bold sans">
                {certificateData.vaccineName}
              </span>
            </div>

            <div className="pm-course-title col-xs-8 text-center">
              <span className="pm-earned-text block cursive">
                administered under the supervision of skilled medical
                professionals, in the city of
              </span>
            </div>

            <div className="pm-course-title underline col-xs-8 text-center">
              <span className="pm-credits-text block bold sans">
                {certificateData.placesOfVaccination}
              </span>
            </div>
          </div>

          <div className="pm-certificate-footer">
            <div className="pm-certified text-center">
              <span className="pm-credits-text bold block sans">
                Vaccinated By
              </span>
              <span className="pm-empty-space block underline"></span>
              <span className="pm-credits-text block sans">
                Vaccination department
              </span>
            </div>

            <div className="pm-certified text-center">
              <span className="pm-credits-text bold block sans">
                Date Completed
              </span>
              <span className="pm-empty-space block underline"></span>
              <span className="pm-credits-text block sans">
                {certificateData.date + " " + certificateData.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinationCertificate;