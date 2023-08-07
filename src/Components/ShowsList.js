import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Show List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {shows.map((show) => (
          <Card key={show.show.id} style={{ margin: '20px' , width:'250px'}} >
            <CardMedia
              component="img"
              height="200"
              image={show.show.image?.medium || ''} 
              alt={show.show.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {show.show.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Type</b> - {show.show.type}
              <br/>
              <b>Language</b>- {show.show.language}
              <br/>
                <b>Genre:</b> {show.show.genres.join(', ')}
              </Typography>
              <Link to={`/show/${show.show.id}`}>
                <button>View Summary</button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
