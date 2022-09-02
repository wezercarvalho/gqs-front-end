import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/**
 * Botão que direciona para a listagem dos cadastros
 * @returns 
 */
export default function ListRegisters() {
    const navigate = useNavigate()

    return (
        <Button
            style={{
                backgroundColor: '#673ab7',
                color: 'white',
                width: 200
            }}
            onClick={() => navigate('/')}
        >
            Listar Registros
        </Button>
    )
}