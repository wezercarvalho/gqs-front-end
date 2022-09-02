import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/**
 * Botão que direciona para a tela de realização do cadastro
 * @returns 
 */
export default function Register() {
    const navigate = useNavigate()

    return (
        <Button
            style={{
                backgroundColor: '#673ab7',
                color: 'white',
                width: 200
            }}
            onClick={() => navigate('/register')}
        >
            Cadastrar
        </Button>
    )
}