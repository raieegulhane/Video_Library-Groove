import "./stylesheets/styles.css";
import { SiteRoutes } from "./routes";
import { useTheme } from "./contexts";
import { Navbar } from "./components";

const App = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <SiteRoutes />
    </div>
  );
}

export default App;
