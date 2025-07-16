import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Book from "./components/Book/Book";
import Store from "./components/Store/Store";
import Cart from "./components/Cart/Cart";
import Favorite from "./components/Favorite/Favorite";
import Account from "./components/Account/Account";
import ShoppingHistory from "./components/ShoppingHistory/ShoppingHistory";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Employee from "./components/Employee/Employee";
import Admin from "./components/Admin/Admin";
import Clients from "./components/Admin/Clients/Clients";
import Employees from "./components/Admin/Employees/Employees";
import AddBook from "./components/Employee/AddBook/AddBook";
import AddEmployee from "./components/Admin/Employees/AddEmployee/AddEmployee";
import EditEmployee from "./components/Admin/Employees/EditEmployee/EditEmployee";
import Warehouse from "./components/Warehouse/Warehouse";
import EditBook from "./components/Warehouse/EditBook/EditBook";
import PlacingAnOrderWindow from "./components/PlacingAnOrderWindow/PlacingAnOrderWindow";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { UserProvider } from "./context/UserContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <FavoriteProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <div className="app">
                      <Routes>
                        <Route path="/" exact element={<Store />} />
                        <Route path="/book/:id" exact element={<Book />} />
                        <Route path="/cart" exact element={<Cart />} />
                        <Route path="/favorite" exact element={<Favorite />} />
                        <Route path="/account" exact element={<Account />} />
                        <Route
                          path="/shopping-history"
                          exact
                          element={<ShoppingHistory />}
                        />
                      </Routes>
                    </div>
                    <ScrollToTopButton />
                    <Footer />
                  </>
                }
              />

              <Route path="/employee" exact element={<Employee />} />
              <Route path="/employee/add-book" exact element={<AddBook />} />
              <Route path="/admin" exact element={<Admin />} />
              <Route path="/admin/clients" exact element={<Clients />} />
              <Route path="/admin/employees" exact element={<Employees />} />
              <Route
                path="/admin/employees/add-employee"
                exact
                element={<AddEmployee />}
              />
              <Route
                path="/admin/employees/edit/:id"
                element={<EditEmployee />}
              />
              <Route path="/warehouse" exact element={<Warehouse />} />
              <Route
                path="/warehouse/edit-book/:id"
                exact
                element={<EditBook />}
              />
              <Route path="/register" exact element={<Register />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/placing-an-order-window" exact element={<PlacingAnOrderWindow />} />
            </Routes>
          </Router>
        </CartProvider>
      </FavoriteProvider>
    </UserProvider>
  );
}

export default App;
