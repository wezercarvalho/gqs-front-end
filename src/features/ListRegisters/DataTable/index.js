import { size, get, map, filter, join, isEmpty } from 'lodash'
import { Typography, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

/**
 * Configura a construção da tabela de apresentação dos dados
 * @param {array} data Lista com os dados para as linhas da tabela
 * @returns 
 */
function configureDataTable(data) {
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'name',
            headerName: 'Nome',
            width: 150
        },
        {
            field: 'lastName',
            headerName: 'Sobrenome',
            width: 150
        },
        {
            field: 'favoriteMovieSelected',
            headerName: 'Filme Favorito',
            width: 200,
            valueGetter: (params) => isEmpty(get(params, 'row.favoriteMovieSelected'))
                ? 'Não informado'
                : get(params, 'row.favoriteMovieSelected')
        },
        {
            field: 'selectedMovieGenres',
            headerName: 'Gêneros de Filme Favoritos',
            description: 'Não é possível aplicar ordenção na coluna',
            sortable: false,
            width: 500,
            valueGetter: (params) => {
                // Obtém os nomes dos respectivos gêneros
                const labelMovies = map(get(params, 'row.selectedMovieGenres'), (selectedMovie, gender) => {
                    switch (gender) {
                        case 'action':
                            if (selectedMovie) return 'Ação'
                            break;
                        case 'adventure':
                            if (selectedMovie) return 'Aventura'
                            break;
                        case 'comedy':
                            if (selectedMovie) return 'Comédia'
                            break;
                        case 'horror':
                            if (selectedMovie) return 'Terror'
                            break;
                        default:
                            return 'Gênero desconhecido'
                    }
                })

                // Filtra os filmes mantendo um array somente dos que retornaram valor
                const movies = filter(labelMovies, movie => movie !== undefined)

                return isEmpty(join(movies, ' - ')) ? 'Não informado' : join(movies, ' - ')
            }
        }
    ]

    const rows = data

    return (
        <Box
            style={{
                height: 500,
                width: '100%'
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </Box>
    )
}

/**
 * Lista os dados em tela
 * @param {object} data Dados para a tabela
 * @returns 
 */
export default function DataTable(data) {
    const dataTable = size(get(data, 'data')) === 0
        ? <Typography style={{ textAlign: 'center' }}>Sem registros cadastrados.</Typography>
        : configureDataTable(get(data, 'data'))

    return dataTable
}

