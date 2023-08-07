import { Navbar } from "./components/navbar";
import { Cart } from "./components/cart";
import { Home } from "./components/home";
import "./App.css";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { NotFound } from "./components/notfoound";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/cart" element={<Cart />} />
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
