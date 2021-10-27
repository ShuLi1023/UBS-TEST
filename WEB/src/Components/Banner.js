import { Box, Typography } from '@material-ui/core';
const Banner = () => {
    return (
        <div>
            <img src='/Img/Banner_Image.JPG' width="100%" alt='banner' className='bannerImage'></img>
            <Box display={{ xs: 'none', md: 'block' }}  className='Banner-text'>
                <Typography variant="h5" component="h2">
                Evolution sous-jacent PS.
                </Typography>
                <Typography variant="body1" component="p">
                Des outils sur-measure conçus pour accompagner votre activité commoerciale et vous permettre de répondre que questions des clients.
                </Typography>
            </Box>
        </div>
    )
}

export default Banner
