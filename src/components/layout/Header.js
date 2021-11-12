import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function Header() {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography color="white" variant="h6">
            IPPP Differ
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset />
    </React.Fragment>
  );
}

export default Header;