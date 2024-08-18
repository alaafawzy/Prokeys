import React from 'react';
import { Paper, Button, Box, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

export default function CarouselComponent(props)
{
    // var items = [
    //     {
    //         name: "Random Name #1",
    //         description: "Probably the most random thing you have ever seen!"
    //     },
    //     {
    //         name: "Random Name #2",
    //         description: "Hello World!"
    //     }
    // ]

    return (
        <Carousel>
            {
                props.items.map( (item, i) => <>
                    {/* <div>
                        <img src={item.image}/>
                    </div>
                    <Box>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>    
                    </Box>
                     */}
                    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: '100%', // You can adjust the width as needed
        maxWidth: '700px', // Set a maximum width for the image container
        margin: '0 auto', // Center the image horizontally
      }}
    >
      <img
        src={item?.img} // Replace with your image URL
        alt="Example"
        style={{ width: '100%',  }} // Ensure the image is responsive
      />
      <Box
        sx={{
          position: 'absolute',
          top: '80%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
        //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a background for better readability
          padding: '10px', // Optional: Add padding around the text
          borderRadius: '8px', // Optional: Add rounded corners
        }}
      >
        <Typography variant="h5" align="center" color='rgb(255,255,255)'>
          {item?.description}
        </Typography>
      </Box>
    </Box>
                    
                </> )
            }
        </Carousel>
    )
}