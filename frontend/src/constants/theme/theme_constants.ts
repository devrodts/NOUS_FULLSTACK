export const mobileMainSyle: React.CSSProperties = {
    maxWidth:"90vw",
    margin:"10px auto",
    width:"90vw",
    // paddingLeft: "10px",
    // paddingRight: "10px",
    justifyContent: "center",
    overflowX:"scroll",
    
  }

export const desktopMainSyle: React.CSSProperties = {  
    width:"60vw",
    margin: "20px auto"
}

export const pageMainLoadingStyle: React.CSSProperties = {
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '100vh', 
  marginTop: '50px'
};


export const searchInputStyle: React.CSSProperties = {
  // width: window.innerWidth < 900 ? '100%' : '300px',
  width: '100%',
  height: '40px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  paddingLeft: '10px',
  margin: '10px',
  fontSize: '14px',
  color: '#333',
  backgroundColor: '#f0f0f0',
}


export const mobileModalStyles: React.CSSProperties = {
  width: "90vw",
  maxWidth: "none",
  margin: "1vh 2.5vh",
  backgroundColor: "white",
  border:"none",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  flexDirection: "column",
  justifyContent: "center",
}

export const desktopModalStyles: React.CSSProperties = {
  width: "50vw",
  padding: "40px",
  margin: "0 auto",
  backgroundColor: "white",
  border:"none",
  marginTop: "12vh",
  borderRadius: "16px",
}
