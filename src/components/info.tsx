import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const W = () => (<a href='https://webvpn.dlut.edu.cn/' target='_blank'>DUT WebVPN</a>);
const G = () => (<a href='https://github.com/cjhahaha/webvpn4DUT' target='_blank'>DUT WebVPN</a>);

export const Info = (props: {
    handleClose: () => void
}) => (
    <ClickAwayListener onClickAway={props.handleClose}>
    <Paper style={{ padding: 12 }}>
        <Typography>说明：</Typography>
        <Typography><W/> 是为了方便大家无法使用校园网时也能访问校内网站，但是它支持的网址有限。所以我写了&nbsp;WebVpn4Dut&nbsp;这个工具，便于大家访问所有校内网站。如果想了解原理，访问<G/>。</Typography>

        <Typography>如何使用：</Typography>
        <Typography>
            首先，进入<W/> 登陆自己的账号。再进入本站，输入想访问的网址，随即会生成一个链接，访问该链接即可。
        </Typography>
    </Paper>
    </ClickAwayListener>
);
