import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
export default function HomePage() {
    return (
       <>
            <Slider {...settings}>
                <div>
                    <img src="/images/hero1.jpg" alt="Swayam" style={{display:'block', width:'100%' , maxHeight:500}}/>
                </div>
                <div>
                    <img src="/images/hero2.jpg" alt="Swayam" style={{display:'block', width:'100%' , maxHeight:500}}/>
                </div>
                <div>
                    <img src="/images/hero3.jpg" alt="Swayam" style={{display:'block', width:'100%' , maxHeight:500}}/>
                </div>
            </Slider>

            <Box display='flex' justifyContent='center' sx={{p: 4}}>
                <Typography variant='h1'>
                    Welcome To Our Shop!
                </Typography>
            </Box>
       </>
    )
}