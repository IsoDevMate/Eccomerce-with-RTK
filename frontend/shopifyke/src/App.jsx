import { Navbar } from "./components/navbar";
import  { Cart }  from "./components/cart";
import { Home } from "./components/home";
import "./App.css";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { NotFound } from "./components/notfoound";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
        <Navbar />
        <Routes>
          <Route exact path="/cart" element={<Cart />} />
          <Route
                    path="/cart"
                    element={ <Navigate to="/cart"  replace={true} />}
                />
          <Route path="/errorpage" exact element={<NotFound />} />
          <Route path="*" exact element={<NotFound />} />
          <Route
                    path="/error-page"
                    element={ <Navigate to="/error-page" /> }
                />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
