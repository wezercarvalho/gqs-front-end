import React, { Component } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

class Footer extends Component {
    render() {
        const {
            textLabel,
            actions
        } = this.props

        return (
            <AppBar
                style={{
                    backgroundColor: '#0097a7'
                }}
            >
                <Toolbar>
                    <Typography
                        style={{
                            width: '-webkit-fill-available'
                        }}
                    >
                        {textLabel} - Gente Que Soma
                    </Typography>
                    {actions}
                </Toolbar>
            </AppBar>
        )
    }
}

export default Footer