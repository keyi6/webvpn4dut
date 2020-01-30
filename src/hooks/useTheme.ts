import { useEffect, useState } from "react";
import { createMuiTheme } from "@material-ui/core";

const Themes = {
    'light': createMuiTheme({
        palette: {
            type: 'light',
        },
    }),
    'dark': createMuiTheme({
        palette: {
            type: 'dark'
        },
    })
};

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, [window.matchMedia]);

    return Themes[theme];
}