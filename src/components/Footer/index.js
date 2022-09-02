import React, { Component } from 'react'
import { Box, Typography } from '@mui/material'
import { withStyles } from '@material-ui/styles'
import styles from './styles'

class Footer extends Component {
    render() {
        const { classes } = this.props

        return (
            <Box className={classes.footer}>
                <Box
                    style={{
                        backgroundColor: '#42a5f5'
                    }}
                >
                    <Typography
                        style={{
                            color: 'white',
                            textAlign: 'center'
                        }}
                    >
                        Gente Que Soma 2022
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default withStyles(styles)(Footer)