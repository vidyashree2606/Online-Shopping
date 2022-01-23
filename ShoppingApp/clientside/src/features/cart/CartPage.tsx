import { Add, Delete, Remove } from "@material-ui/icons";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { error } from "console";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apihandler from "../../app/api/apihandler";
import { Cart } from "../../app/api/cart";
import { useStoreContext } from "../../app/context/StoreContext";
import LoadingComponent from "../../app/layout/LoadingComponent";
import CartDelivery from "./CartDelivery";

export default function CartPage(){
    // const [loading,setLoading] = useState(false);
    // const [cart,setCart] = useState<Cart | null>(null);
    const {cart,setCart,removeItem}= useStoreContext();
    // useEffect(()=>{
    //     apihandler.Cart.get()
    //     .then(cart => setCart(cart))
    //     .catch(error=>console.log(error))
    //     .finally(()=>setLoading(false));
    // },[])
    function handleAddItem(productId:number){
        // setLoading(true);
        apihandler.Cart.addItem(productId)
        .then(cart=>setCart(cart))
        .catch(error=>console.log(error)
        // .finally(()=>setLoading(false))
        )
    }

    function handleRemoveItem(productId:number , quantity=1){
        // setLoading(true);
        apihandler.Cart.removeItem(productId,quantity)
        .then(()=>removeItem(productId,quantity))
        .catch( error => console.log(error))
        // .finally(()=>setLoading(false))
    }

    // if(loading) return <LoadingComponent message="loading cart"/>
    if(!cart) return <Typography variant='h3'>Your cart is empty</Typography>
    return(
      <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.items.map(item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'> 
                    <img src={item.imgURL} alt='swayam' style={{height:50,marginRight:20}}/>
                    <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">$ {(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="right">
                <Button color='error' onClick={()=> handleRemoveItem(item.productId)}>
                    <Remove/>
                </Button>
                
                  {item.quantity}
                  <Button  color='secondary' onClick={()=> handleAddItem(item.productId)}>
                    <Add/>
                </Button>
                </TableCell>
              <TableCell align="right">$ {((item.price)/100 * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                  <Button color='error' onClick={()=> handleRemoveItem(item.productId,item.quantity)}>
                      <Delete />
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Divider />
    <div>
      <CartDelivery/>
      <Button component={Link}
              to={'/checkout'}
              variant='contained'
              size='large'
              fullWidth
      >
        Checkout
      </Button>
    </div>
      
    </>
    )
}