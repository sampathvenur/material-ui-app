import React, { useState, useMemo, useEffect } from 'react';
import {
    Typography,
    Button,
    AppBar,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CssBaseline,
    Grid,
    Toolbar,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Box,
    useMediaQuery,
    createTheme,
    ThemeProvider
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

const App = () => {
    // Theme modes: 'light', 'dark', 'system'
    const [mode, setMode] = useState('system');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Determine actual theme based on mode selection
    const actualMode = useMemo(() => {
        if (mode === 'system') {
            return prefersDarkMode ? 'dark' : 'light';
        }
        return mode;
    }, [mode, prefersDarkMode]);

    // Create theme based on the selected mode
    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: actualMode,
            },
        }),
        [actualMode]
    );

    // Menu state
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        handleClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <PhotoCamera />
                    <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                        Photo Album
                    </Typography>

                    {/* Theme switcher button */}
                    <Box>
                        <IconButton
                            color="inherit"
                            onClick={handleClick}
                            aria-controls={open ? 'theme-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            {mode === 'light' && <Brightness7Icon />}
                            {mode === 'dark' && <Brightness4Icon />}
                            {mode === 'system' && <SettingsBrightnessIcon />}
                        </IconButton>
                        <Menu
                            id="theme-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'theme-button',
                            }}
                        >
                            <MenuItem onClick={() => handleModeChange('light')}>Light Mode</MenuItem>
                            <MenuItem onClick={() => handleModeChange('dark')}>Dark Mode</MenuItem>
                            <MenuItem onClick={() => handleModeChange('system')}>System Default</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <Container maxWidth="sm" style={{ marginTop: '100px ' }}>
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            Photo Album
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Hello everyone, this is a photo album and I'm trying to make this sentence as long as possible so we can see how does it look like on the screen.
                        </Typography>
                        <div>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        See my photos
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                {/* <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup> */}
            </main>
        </ThemeProvider>
    );
}

export default App;