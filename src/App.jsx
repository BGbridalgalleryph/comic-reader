import { Navbar, Reader, Footer, Welcome} from "./components";
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
    </div>
    <Welcome />
    <Reader />
    <Footer />
  </div>
);

export default App;

