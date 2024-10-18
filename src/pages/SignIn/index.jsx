import React, { useContext, useState } from 'react'

import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import "./signIn.css"
import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'

const SignIn = () => {

    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()

        if (email !== "" && password !== "") {
            await signIn(email, password)
        }
        else {
            toast("Email e senha necessários!", {
                progressStyle: { background: "#f12" }
            })
            return
        }
    }

    return (
        <div className='container-center'>

            <div className='login'>

                <div className='login-area'>

                    <img src={logo} alt='Logo Sistema de Chamados' />

                </div>

                <form onSubmit={handleLogin}>
                    <h1>Entrar</h1>

                    <input
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type='password'
                        placeholder='*********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>
                        {loadingAuth ? "Carregando..." : "Acessar"}
                    </button>


                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}

export default SignIn