import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Grid, Card, CardMedia, IconButton } from '@mui/material';

const ImageGallery = ({ images }) => {
    const [currentImage, setCurrectImage] = useState(0);

    const next = () => {
        setCurrectImage((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex < images.length ? nextIndex : 0;
        });
    };

    const prev = () => {
        setCurrectImage((prevIndex) => {
            prevIndex = prevIndex - 1;
            return prevIndex >= 0 ? prevIndex : images.length - 1;
        });
    };

    console.log(images)

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card style={{ borderRadius: '5px', overflow: 'hidden', width: '100%' }}>
                    <img
                        src={images[currentImage]}
                        srcSet={images[currentImage]}
                        alt=""
                        style={{ objectFit: 'fill', width: '700px', height: '200px', borderRadius: '5px' }}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} container justifyContent="space-between">
                <Grid item>
                    <IconButton onClick={prev} disabled={currentImage === 0} sx={{ color: "secondaryColor" }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={next} disabled={currentImage === images.length - 1} sx={{ color: "secondaryColor" }}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ImageGallery;
