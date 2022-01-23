import {Card,CardContent,CardMedia,Typography,CardActions,Button,CardHeader, Avatar, IconButton, Stack} from "@mui/material";
import { Product } from "../../app/models/product";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { bgcolor, height } from "@mui/system";
import { Link } from "react-router-dom";
import { useState } from "react";
import apihandler from "../../app/api/apihandler";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const [loading,setLoading] = useState(false);
  const {setCart} = useStoreContext();
  function handleAddItem(productId: number){
    setLoading(true);
    apihandler.Cart.addItem(productId)
    .then(cart=>setCart(cart))
    .catch(error=>console.log(error))
    .finally(() => setLoading(false))
  }
  return (
    <>
      <Card >
        <CardHeader 
          // avatar={
          //   <Avatar sx={{backgroundColor:"secondary.main"}}>
          //     { {product.name.charAt(0).toUpperCase()}}
          //   </Avatar>
          // }
          title={product.name}
          titleTypographyProps={
            {
              sx:{fontWeight:'bold',color:'primary.main'}
            }
          }
        />
      <CardMedia
      sx={{height:140,backgroundSize:"contain",bgcolor:"none"}}
      image={product.imgURL}
      title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color='secondary' >
          $ {(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.rating} / {product.type}
        </Typography>
      </CardContent>
      <CardActions >
        <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)}  size="small" endIcon={<AddShoppingCartRoundedIcon  fontSize="medium"/> }>Add</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`}  size="small" endIcon={<PreviewRoundedIcon  fontSize="medium"/> } >View</Button>
      </CardActions>
    </Card>
    
      {/* <ListItem key={product.id}>
                 <ListItemAvatar>
                   <Avatar src={product.pictureURL}/>
               </ListItemAvatar>
                 <ListItemText>{product.name} - {product.price}</ListItemText>
             </ListItem> */}
    </>
  );
}
