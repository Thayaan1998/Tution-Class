import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import { makeStyles } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';




const Navigation4 = () => {
    const navigate = useNavigate()
    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        

                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                              
                                onClick={() => navigate('/sendPromo')}

                            >
                             Send Promo
                            </Button>
                         
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                // className={classes.tabs}
                                onClick={() => navigate('/editAgentProfile')}
                            >
                              Edit Agent
                            </Button>
                           
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                // className={classes.tabs}
                                style={{ float: 'right' }}
                                onClick={() => navigate('/login')}
                            >
                                Logout
                            </Button>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                // className={classes.tabs}
                                style={{ float: 'right' }}
                                // onClick={() => navigate('/login')}
                            >
                                 {localStorage.getItem("userName")}
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            
        </div>
    )

};

export default Navigation4;
