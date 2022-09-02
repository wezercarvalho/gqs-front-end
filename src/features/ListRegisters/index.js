import React, { Component } from 'react'
import { Box, Paper, Container, Typography, Divider } from '@mui/material'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ActionButtons from '../../components/ActionButtons'
import DataTable from './DataTable'

class ListRegisters extends Component {
    render() {
        const {
            classes,
            data: {
                store: {
                    getRegisteredInfo
                }
            }
        } = this.props

        return (
            <Box className={classes.viewContent}>
                <Header
                    textLabel="Listar Registros"
                    actions={<ActionButtons.Register />}
                />

                <Box className={classes.content}>
                    <Container>
                        <Paper
                            style={{
                                padding: 20
                            }}
                        >
                            <Typography
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '800',
                                    fontSize: 24
                                }}
                            >
                                Listagem de registros
                            </Typography>
                            <Divider style={{ marginBottom: 20 }} />
                            <Box>
                                <DataTable data={getRegisteredInfo()} />
                            </Box>
                        </Paper>
                    </Container>
                </Box>

                <Footer />
            </Box>
        )
    }
}

export default withStyles(styles)(ListRegisters)