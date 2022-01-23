import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apihandler from "../../app/api/apihandler";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetails() {
    const {id} = useParams<{id :string}>();
    const [product,setProduct] = useState<Product | null>( null);
    const [loading,setLoading] =  useState(true);
    useEffect(()=>{
        apihandler.Catalog.details(parseInt(id))
        .then(res=>setProduct(res))
        .catch(error=>console.log(error))
        .finally(()=> setLoading(false))
        console.log("loaded")
    },[id])

    if(loading) {
        return <LoadingComponent message='Loading the product'/>
    }
    if(!product) {
        return <NotFound />
    }
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.imgURL} alt={product.name} style={{width:'100%',height:'700px'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:'2'}} />
                <Typography variant='h4' color='secondary'>$ {(product.price / 100).toFixed(2)} </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>

                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Rating</TableCell>
                                <TableCell>{product.rating}</TableCell>
                            </TableRow>

                            {/* <TableRow>
                                <TableCell>Specialization</TableCell>
                                <TableCell>{product.specialization}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow> */}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>

    )
}