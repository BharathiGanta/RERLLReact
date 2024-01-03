import React, { useState, useEffect } from 'react';
import CommonNavbar from "./CommonNavbar";
import './ContactPage.css'; 

const ContactPage = () => {
  const sliderImages = [
    'https://ors.od.nih.gov/mab/COVID19%20Resources%20Images/OCPL_GetVacNIH_digital_1EN.jpg',
    'https://www.shutterstock.com/shutterstock/photos/1571623096/display_1500/stock-vector-people-vaccination-concept-for-immunity-health-doctor-makes-an-injection-of-flu-vaccine-to-a-man-1571623096.jpg',
    'https://www.shutterstock.com/shutterstock/photos/1845532465/display_1500/stock-vector-people-vaccination-concept-for-immunity-health-covid-doctor-makes-an-injection-of-flu-vaccine-1845532465.jpg',
    'https://www.shutterstock.com/shutterstock/photos/1968337342/display_1500/stock-vector-vaccination-badge-with-quote-i-got-covid-vaccine-for-vaccinated-persons-coronavirus-corona-1968337342.jpg',
  ];


  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <>
    <CommonNavbar />
    <div className="contact-page">
      <div className="slider-container">
        {sliderImages.map((image, index) => (
          <div key={index} className={`slider-image ${index === activeIndex ? 'active' : ''}`}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>


      <div className="contact-details">
        <h2>Contact Information</h2>
        <table>
          <tbody>
            <tr>
              <td>Email:</td>
              <td>
                <a href="mailto:vaccination@yourorganization.com">vaccination@Savelives.com</a>
              </td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>
                <a href="tel:XXXX-XXXX-XXXX">8754129865</a>
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <h2>For Any Queries</h2>
        <br></br>
        <h2>Help Desk</h2>
        <p>If you need further assistance, please contact our help desk:</p>
        <p>Email: <a href="mailto:helpdesk@yourorganization.com">helpdesk@Savelives.com</a></p>
        <p>Phone: <a href="tel:XXX-XXX-XXXX">9856327854</a></p>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
