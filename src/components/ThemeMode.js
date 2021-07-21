import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import CssBaseline from '@material-ui/core/CssBaseline';

import { darkModeContext } from "./ThemeContext"

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
        <div className="Mode" style={{ textAlign: 'right' }}>
            {darkMode === true ? 'Dark' : 'Light'} Mode
            <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
                {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </div>
    )
}

export default ThemeMode;
