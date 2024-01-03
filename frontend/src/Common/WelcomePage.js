import CommonNavbar from "./CommonNavbar";

const Welcome = () => {
  return (
    <>
      <CommonNavbar />
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundImage: 'url("../home.jpg")',
          backgroundSize: 'cover', 
          height: '100vh', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 className="Homepagetitle">
          Welcome to Online Vaccine Management
        </h1>
        <p className="homepageparagraph">
          Manage and schedule your vaccinations conveniently with our online
          platform. <br></br>Learn more about the importance of vaccines and their role
          in public health.
        </p>
        <center>
          <p style={{color: "white", fontWeight:"bold", fontSize:"150%"}}>
            Register With Us Today To Get Vaccinated&nbsp;&nbsp;
            <a href="RegisterPage">
              <u>Click Here</u>
            </a>
          </p>
        </center>
        
        {/* Two containers side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <div style={{ width: '45%', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', opacity: '0.6' }}>
            {/* Content for the first container */}
            <p className="ptext">Immunization is a global health and development success story, saving millions of lives every year. Vaccines reduce risks of getting a disease by working with your body’s natural defences to build protection. When you get a vaccine, your immune system responds.</p>
          </div>&nbsp;&nbsp;
          <div style={{ width: '45%', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', opacity: '0.6' }}>
            {/* Content for the second container */}
            <p className="ptext">We now have vaccines to prevent more than 20 life-threatening diseases, helping people of all ages live longer, healthier lives. Immunization currently prevents 3.5-5 million deaths every year from diseases like diphtheria, tetanus, pertussis, influenza and measles.</p>
          </div>&nbsp;&nbsp;
          <div style={{ width: '45%', padding: '20px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', opacity: '0.6' }}>
            {/* Content for the second container */}
            <p className="ptext">Immunization is a key component of primary health care and an indisputable human right. It’s also one of the best health investments money can buy. Vaccines are also critical to the prevention and control of infectious disease outbreaks.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
