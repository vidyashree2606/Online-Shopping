import Container from "@material-ui/core/Container/Container";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { link } from "fs";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <Container component={Paper} sx={{height:400}}>
            <Typography gutterBottom variant='h3'>
                Oops we can't find what you are looking
            </Typography>
            <Divider/>
            <Button  fullWidth component={Link} to='/catalog'> Hey! go back to shop</Button>
        </Container>
    )
}