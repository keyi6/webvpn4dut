import React, {FC, useState, ChangeEvent } from 'react';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import { ThemeProvider } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Popover from '@material-ui/core/Popover/Popover';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import { encode } from './utils';
import { useTheme } from './hooks/useTheme';
import { Info } from './components/info';
import GitHubIcon from '@material-ui/icons/GitHub';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import './App.scss';

const App: FC = () => {
    const [proto, setProto] = useState<string>('http');
    const [url, setUrl] = useState<string>('');
    // whether show snackbar
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    // whether show popover
    const [showInfo, setShowInfo] = useState<boolean>(false);
    // where to show popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    return (
        <Paper className='App'>
            <Typography variant='h3' style={{ margin: '-20vh 0 30px 0' }}>
                WebVpn for DUT
            </Typography>

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
                    label={!!url ? '网址' : '网址，如 teach.dlut.edu.cn'}
                    style={{ width: 'calc(80vw - 90px)', marginLeft: 12 }}
                    onChange={(event: ChangeEvent<{ value: unknown }>) => {
                        setUrl(event.target.value as string);
                    }}
                />
            </div>

            <Grid container spacing={2} justify='center'>
                <Grid item xs={12} md={2}>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        onClick={_.throttle(() => {
                            if (copy(encode(proto, url)))
                                setShowSnackbar(true);
                        }, 200)}>
                        复制链接
                    </Button>
                </Grid>

                <Grid item xs={12} md={2}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={() => window.location.href = encode(proto, url)}
                    >
                        go!
                    </Button>
                </Grid>
            </Grid>

            <div className='fab-wrapper'>
                <Fab
                    color='secondary'
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        setAnchorEl(event.currentTarget);
                        setShowInfo(true);
                    }}
                >
                    <LiveHelpIcon />
                </Fab>

                <Fab onClick={() => window.location.href = 'https://github.com/cjhahaha/webvpn4DUT'}>
                    <GitHubIcon />
                </Fab>
            </div>

            <Snackbar
                message='已复制到剪切板'
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />

            <Popover
                open={showInfo}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Info handleClose={() => setShowInfo(false)} />
            </Popover>
        </Paper>
    );
};

export default () => (
    <ThemeProvider theme={useTheme()}>
        <App />
    </ThemeProvider>
);
