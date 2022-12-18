import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import ErrorPage from './pages/Error';
import Home from './pages/home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Success from './pages/Success';

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<ProductList/>} errorElement={<ErrorPage/>}/>
        <Route path='/product/:id' element={<Product/>} errorElement={<ErrorPage/>}/>
        <Route path='/cart' element={<Cart/>} errorElement={<ErrorPage/>}/>
        <Route path='/login' element={user? <Navigate to="/" replace />: <Login/> }/>
        <Route path='/register' element={user? <Navigate to="/" replace />: <Register/> }/>
        <Route path='/success' element={<Success/>} errorElement={<ErrorPage/>}/>
      </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
