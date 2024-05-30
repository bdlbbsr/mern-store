import "./App.scss";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Navigation } from './Components/Navigation/Routes';
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// https://www.sammeechward.com/use-context-auth?playlist=all-you-need-to-know-about-react-js

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Footer />
      <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            draggable
            pauseOnHover
            theme="colored"
            transition={Flip}
          />
    </div>
  );
}

export default App;
