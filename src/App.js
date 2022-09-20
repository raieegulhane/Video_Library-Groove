import "./stylesheets/styles.css";
import { SiteRoutes } from "./routes";
import { useTheme } from "./contexts";
import { Navbar, SideBar } from "./components";

const App = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <main className="grid wrapper-main">
        <SideBar />
        <SiteRoutes />
      </main>
    </div>
  );
}

export default App;
