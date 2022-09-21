import "./stylesheets/styles.css";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SiteRoutes } from "./routes";
import { Footer, Navbar, SideBar } from "./components";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      {
        location.pathname !== "/login" && 
        location.pathname !== "/signup" &&
        location.pathname !== "/" &&
        location.pathname !== "/home" ?
        <div className="grid main-wr">
          <SideBar />
          <div>
            <SiteRoutes />
            <Footer />
          </div>
        </div> :
        <SiteRoutes />
      }
    </div>
  );
}

export default App;
