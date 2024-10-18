import React, { useContext, useState } from 'react'

import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'
// import "./signUp.css"

const SignUp = () => {
    const { signUp, loadingAuth } = useContext(AuthContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleSignUp = async (event) => {
        event.preventDefault()

        if (name !== "" && email !== "" && password !== "") {
            await signUp(email, password, name)
        }
        else {
            toast("Preencha todos os campos!", {
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

                <form onSubmit={handleSignUp}>
                    <h1>Cadastrar</h1>

                    <input
                        type='text'
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>
                        {loadingAuth ? "Cadastrando..." : "Cadastrar"}
                    </button>


                </form>

                <Link to="/">Acessar</Link>
            </div>
        </div>
    )
}

export default SignUp