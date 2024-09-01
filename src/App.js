import Navbar from "./Navbar";
function App() {


  const app = {
    marginTop:"20px",
    width: '100%',
    boxSizing: 'border-box',
    padding:"0",
    height:'100vh',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  };
  

  return (
    <>
      <div style={app}>
        <Navbar />
      </div>
    </>
  );
}

export default App;
