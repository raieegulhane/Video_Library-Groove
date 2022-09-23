import "./stylesheets/styles.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SiteRoutes } from "./routes";
import { Footer, Navbar, PlaylistModal, SideBar } from "./components";
import { useOperation } from "./contexts";

const App = () => {
  const location = useLocation();
  const { operationState: { playlistModal }} = useOperation();
  const { showPlaylistModal, currentVideo } = playlistModal;

  useEffect(() => {
    window.scrollTo(0,0);
  }, [location.pathname]);

  return (
    <div className="App">
      <ToastContainer
        className="toast-box"
				theme="colored"
        position="bottom-left"
        autoClose={1500}
        newestOnTop={true}
        pauseOnFocusLoss
        pauseOnHover
      />
      <Navbar />
      {
        location.pathname !== "/login" && 
        location.pathname !== "/signup" ?
        <div className="grid main-wr">
          <SideBar />
          <div>
            <SiteRoutes />
            <Footer />
          </div>
        </div> :
        <SiteRoutes />
      }
      {
        showPlaylistModal &&
        <PlaylistModal 
          video={currentVideo}
        />
      }
      
    </div>
  );
}

export default App;
