import { Navbar, Reader, Footer, Welcome } from "./components";

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
