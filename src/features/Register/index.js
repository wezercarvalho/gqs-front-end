import React, { Component } from 'react'
import {
    Box,
    Grid,
    Paper,
    Container,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Autocomplete,
    Button,
    Divider,
    Snackbar,
    Alert
} from '@mui/material'
import { get, find, omit, isEmpty } from 'lodash'
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ActionButtons from '../../components/ActionButtons'

class ListRegisters extends Component {
    constructor(props) {
        super(props)

        this.onFormChange = this.onFormChange.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.submit = this.submit.bind(this)
        this.closeSnackbar = this.closeSnackbar.bind(this)

        this.state = {
            name: '',
            lastName: '',
            selectedMovieGenres: {
                action: false,
                adventure: false,
                comedy: false,
                horror: false
            },
            favoriteMovieSelected: '',
            autocompleteValue: null,
            movieList: [
                { label: 'Clube da Luta', value: '0' },
                { label: 'Harry Potter', value: '1' },
                { label: 'Jogos Mortais', value: '2' },
                { label: 'O Conde de Monte Cristo', value: '3' },
                { label: 'O Poderoso Chefão', value: '4' },
                { label: 'O Senhor dos Anéis', value: '5' },
                { label: 'Vingadores', value: '6' }
            ],
            openSnackbar: false,
            snackbarMessage: '',
            severitySnackbar: 'success'
        }
    }

    /**
     * Altera os valores
     * @param {string} controlName Propriedade que será alterada
     * @param {object} control Objeto contendo os valores 
     */
    onFormChange(controlName, control) {
        // Atualiza a seleção de gêneros de filmes favoritos
        if (controlName === 'selectedMovieGenres') {
            const {
                selectedMovieGenres
            } = this.state

            this.setState(prevState => ({
                ...prevState,
                selectedMovieGenres: {
                    ...selectedMovieGenres,
                    [get(control, 'target.name')]: get(control, 'target.checked')
                }
            }))
        }
        // Atualiza o filme favorito selecionado
        else if (controlName === 'favoriteMovieSelected') {
            this.setState(prevState => ({
                ...prevState,
                favoriteMovieSelected: get(control, 'label'),
                autocompleteValue: control
            }))
        } else {
            // Atualiza os demais campos que não necessitam tratamento especial
            this.setState(prevState => ({
                ...prevState,
                [controlName]: get(control, 'target.value')
            }))
        }
    }

    /**
     * Fecha a snackbar
     */
    closeSnackbar() {
        this.setState(prevState => ({
            ...prevState,
            openSnackbar: false
        }))
    }

    /**
     * Realiza a validação dos campos
     */
    validateForm() {
        const {
            name,
            lastName
        } = this.state

        // Caso nome ou sobrenome sejam vazios
        if (isEmpty(name) || isEmpty(lastName)) {
            this.setState(prevState => ({
                ...prevState,
                openSnackbar: true,
                snackbarMessage: 'Preencha os campos corretamente.',
                severitySnackbar: 'warning'
            }))

            return false
        }

        return true
    }

    /**
     * Realiza a inserção do registro
     */
    submit() {
        // Validações
        if (this.validateForm()) {
            const {
                data: {
                    store: {
                        setRegisteredInfo
                    }
                }
            } = this.props

            // Realiza o envio para salvar na listagem
            setRegisteredInfo(
                omit(
                    this.state,
                    [
                        'movieList',
                        'autocompleteValue',
                        'openSnackbar',
                        'snackbarMessage',
                        'severitySnackbar'
                    ]
                )
            )

            // Reseta os campos
            this.setState(prevState => ({
                ...prevState,
                name: '',
                lastName: '',
                selectedMovieGenres: {
                    action: false,
                    adventure: false,
                    comedy: false,
                    horror: false
                },
                favoriteMovieSelected: '',
                autocompleteValue: null,
                openSnackbar: true,
                snackbarMessage: 'Cadastrado com sucesso.',
                severitySnackbar: 'success'
            }))
        }
    }

    render() {
        const { classes } = this.props

        const {
            name,
            lastName,
            selectedMovieGenres,
            movieList,
            autocompleteValue,
            openSnackbar,
            snackbarMessage,
            severitySnackbar
        } = this.state

        return (
            <Box className={classes.viewContent}>
                <Header
                    textLabel="Cadastrar"
                    actions={<ActionButtons.ListRegisters />}
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
                                Cadastrar
                            </Typography>
                            <Divider style={{ marginBottom: 20 }} />
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            name='name'
                                            label='Nome'
                                            value={name}
                                            onChange={(control) => this.onFormChange('name', control)}
                                            variant='standard'
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name='lastName'
                                            label='Sobrenome'
                                            value={lastName}
                                            onChange={(control) => this.onFormChange('lastName', control)}
                                            variant='standard'
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl>
                                            <FormLabel component='legend'>Gêneros de filmes favoritos:</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name='action'
                                                            checked={find(selectedMovieGenres, (_, gender) => gender === 'action')}
                                                            onChange={(control) => this.onFormChange('selectedMovieGenres', control)}
                                                        />
                                                    }
                                                    label='Ação'
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name='adventure'
                                                            checked={find(selectedMovieGenres, (_, gender) => gender === 'adventure')}
                                                            onChange={(control) => this.onFormChange('selectedMovieGenres', control)}
                                                        />
                                                    }
                                                    label='Aventura'
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name='comedy'
                                                            checked={find(selectedMovieGenres, (_, gender) => gender === 'comedy')}
                                                            onChange={(control) => this.onFormChange('selectedMovieGenres', control)}
                                                        />
                                                    }
                                                    label='Comédia'
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name='horror'
                                                            checked={find(selectedMovieGenres, (_, gender) => gender === 'horror')}
                                                            onChange={(control) => this.onFormChange('selectedMovieGenres', control)}
                                                        />
                                                    }
                                                    label='Terror'
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            name='favoriteMovieSelected'
                                            onChange={(_, control) => this.onFormChange('favoriteMovieSelected', control)}
                                            value={autocompleteValue}
                                            clearText='Limpar'
                                            closeText='Fechar'
                                            noOptionsText='Sem opções'
                                            openText='Abrir'
                                            options={movieList}
                                            renderInput={(params) => <TextField {...params} label="Selecionar filme favorito" variant="standard" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            style={{
                                                backgroundColor: '#e53935',
                                                color: 'white'
                                            }}
                                            onClick={() => this.submit()}
                                        >
                                            cadastrar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Container>
                </Box>

                <Footer />

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={this.closeSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={this.closeSnackbar}
                        severity={severitySnackbar}
                        sx={{ width: '300px' }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        )
    }
}

export default withStyles(styles)(ListRegisters)