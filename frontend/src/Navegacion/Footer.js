
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'


export default function Footer() {
  return (
    <footer class="fixed-bottom">
      <AppBar position="static" style={{ backgroundColor: '#6ad5f0' }}>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1" color="black">
              © 2021 Daniel y Valentina
            </Typography>
            <img style={{ margin: '8px', width: '25px' }} src="https://img.icons8.com/fluency/48/000000/instagram-new.png" />
          </Toolbar>
        </Container>
      </AppBar>
    </footer>

  )
}
