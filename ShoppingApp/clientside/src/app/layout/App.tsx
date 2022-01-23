import { Box, Container, createMuiTheme, CssBaseline } from "@mui/material";
import { dark, light } from "@mui/material/styles/createPalette";
import { createTheme, ThemeProvider } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";

import HomePage from "../../features/home/HomePage";
import Footer from "./Footer";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CartPage from "../../features/cart/CartPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utility/utility";
import apihandler from "../api/apihandler";
import LoadingComponent from "./LoadingComponent";
import CheckOut from "../checkout/CheckoutPage";
import CheckoutPage from "../checkout/CheckoutPage";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../store/configureStore";
import { ContactUsForm} from "../../features/contact/ContactUsForm";
function App() {

  const {setCart} = useStoreContext();
  const[loading,setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    const buyingId = getCookie("buyingId");
    dispatch(fetchCurrentUser())
    if(buyingId){
      apihandler.Cart.get()
      .then(cart=>setCart(cart))
      .catch(error=>console.log(error))
      .finally(() => setLoading(false));
    }
    else{
      setLoading(false);
    }
  },[dispatch])

  if(loading) return <LoadingComponent message="Initializing app..."/>
  return (
    <>
      {/* <ThemeProvider> */}
      <ToastContainer position="bottom-right" hideProgressBar/>
      <CssBaseline />
      <Header />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Container sx={{ mt: 3 }}>
          <Switch >
            <Route exact path='/catalog' component={Catalog} />
            <Route path='/catalog/:id' component={ProductDetails} />
            <Route path='/about' component={AboutPage} />
          
            <Route path='/server-error' component={ServerError} />
            <Route path='/cart' component={CartPage} />
            <Route path='/checkout' component={CheckoutPage} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/contact' component={ContactUsForm} />
            <Route component={NotFound} />
            {/* <Catalog /> */}
          </Switch>
          
        </Container>
      
      )} />
      {/* <Footer /> */}
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
