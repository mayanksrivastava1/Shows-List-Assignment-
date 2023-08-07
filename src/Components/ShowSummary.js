import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ShowSummary = () => {
  const { id } = useParams();
  const [showSummary, setShowSummary] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchShowSummary = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShowSummary(response.data);
      } catch (error) {
        console.error('Error fetching show summary:', error);
      }
    };

    fetchShowSummary();
  }, [id]);

  const handleBookingButtonClick = () => {
    setBookingFormVisible(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Check if the email is valid
    if (!validateEmail(formData.email)) {
      alert('Invalid email address. Please enter a valid email.');
      return;
    }
    // check if Phone number is Valid
    if (!validatePhoneNumber(formData.phoneNumber)) {
        alert('Invalid phone number. Phone Number should be 0f 10 digits.');
        return;
      }
    // Save the form data to local storage
    localStorage.setItem('userData', JSON.stringify(formData));

    setBookingFormVisible(false);
  };

  const handleCloseModal = () => {
    setBookingFormVisible(false);
  };
// I have Used Simple Regex format for validation of Email and Phone Number
  const validateEmail = (email) => {
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^[0-9]{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };


  const modalBody = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: 2, width: 300, outline: 'none' }}>
      <Typography variant="h5" gutterBottom >
        Online Ticket Booking
      </Typography>
     
      <TextField
        label="Name"
        variant="outlined"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        type="tel"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
      />
      <Button variant="contained" type="submit" color="primary" onClick={handleFormSubmit}>
        Book Ticket
      </Button>
    </Box>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {showSummary ? (
        <Card style={{ maxWidth: 600 }}>
            <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>Summary</Typography>
          <CardMedia component="img" height="400" image={showSummary.image?.medium || ''} alt={showSummary.name} />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {showSummary.name}
            </Typography>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: showSummary.summary }} />
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1">Loading show summary...</Typography>
      )}

      <Button variant="contained" color="primary" onClick={handleBookingButtonClick} style={{ marginTop: '20px' }}>
        Book Movie Ticket
      </Button>

      <Modal open={bookingFormVisible} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', bgcolor: 'background.paper' }}>
          {modalBody}
        </Box>
      </Modal>
    </div>
  );
};

export default ShowSummary;
