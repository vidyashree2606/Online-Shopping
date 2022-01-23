import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import apihandler from "../../app/api/apihandler";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [loading,setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        apihandler.Catalog.list().
        then(products=>setProducts(products))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
        ;
      },[]);
      
      if(loading){
          return <LoadingComponent message="Loading Products"/> 
      }
    return (
    <>
        <ProductList products={products}/>
    </>
    )
}