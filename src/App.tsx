import React, {FC, useState, ChangeEvent, useEffect, useCallback} from 'react';
import _ from 'lodash';
import copy from "copy-to-clipboard";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { encode } from "./utils";
import './App.scss';

const App: FC = () => {
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [proto, setProto] = useState<string>('http');
    const [url, setUrl] = useState<string>('');

    return (
        <Paper className='App'>
            <div className='inline-wrapper'>
                <Select
                    style={{ width: '64px', marginRight: 12 }}
                    value={proto}
                    onChange={(event: ChangeEvent<{ value: unknown }>) => {
                        setProto(event.target.value as string);
                    }}
                >
                    <MenuItem value={'http'}>http</MenuItem>
                    <MenuItem value={'https'}>https</MenuItem>
                </Select>

                <TextField
                    label='网址'
                    style={{ width: 'calc(80vw - 90px)', marginLeft: 12 }}
                    onChange={(event: ChangeEvent<{ value: unknown }>) => {
                        setUrl(event.target.value as string);
                    }}
                />
            </div>

            <Grid container spacing={1} justify='center'>
                <Grid item xs={12} md={2}>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        onClick={_.throttle(() => {
                            const encodedUrl = encode(proto, url);
                            if (copy(encodedUrl)) {
                                setShowSnackbar(true);
                            }
                        }, 200)}>
                        复制链接
                    </Button>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={() => {
                            const encodedUrl = encode(proto, url);
                            window.location.href = encodedUrl;
                        }}
                    >
                        go
                    </Button>
                </Grid>
            </Grid>

            <Snackbar
                message='已复制到剪切板'
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Paper>
    );
};

const Theme = createMuiTheme({
    palette: {
        type: 'light', // TODO: 'dark'
    },
});

export default () => {
    return (
        <ThemeProvider theme={Theme}>
            <App />
        </ThemeProvider>
    );
};

