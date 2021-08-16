import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { darkModeContext } from "./ThemeContext"
import { Typography } from '@material-ui/core';

const ThemeMode = (props) => {
    const DarkModeContext = React.useContext(darkModeContext);

    const { darkMode, setDarkMode } = DarkModeContext

    const handleThemeChange = () => {
        if (darkMode) {
            localStorage.setItem("preferred-theme", "light")
            setDarkMode(false)
        } else {
            localStorage.setItem("preferred-theme", "dark")
            setDarkMode(true)
        }
    }

    return (
        <Typography align="left" padding="0px" margin="0px" variant="p" component="p" color="textPrimary" className="Mode" style={{ textAlign: 'right' }}>
            {darkMode === true ? 'Dark' : 'Light'} Mode
            <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
                {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </Typography>
    )
}

export default ThemeMode;
