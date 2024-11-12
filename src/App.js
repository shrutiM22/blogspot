import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogLists from "./pages/BlogLists";
import AddBlog from "./pages/AddBlog";
import BlogDetails from "./pages/BlogDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/bloglists" element={<BlogLists />} />
          <Route exact path="/addblogs" element={<AddBlog />} />
          <Route exact path="/blogs/:index" element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
