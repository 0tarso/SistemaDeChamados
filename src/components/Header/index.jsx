import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'

import { FiHome, FiUser, FiSettings } from "react-icons/fi"

import avatarImg from "../../assets/avatar.png"

import "./header.css"

const Header = () => {

    const { user, logout } = useContext(AuthContext)

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className='sidebar'>
            <div className='img'>
                {/* <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
                    alt='Foto do Usuário'
                /> */}
                <img src="https://sujeitoprogramador.com/steve.png"
                    alt='Foto do Usuário'
                />

                <p><strong>{user.name}</strong></p>
            </div>

            <div className='nav'>
                <Link to="/dashboard">
                    <FiHome color='#fff' size={24} />
                    Chamados
                </Link>

                <Link to="/customers">
                    <FiUser color='#fff' size={24} />
                    Clientes
                </Link>

                <Link to="/profile">
                    <FiSettings color='#fff' size={24} />
                    Perfil
                </Link>

            </div>
            <button onClick={handleLogout}>Sair</button>


        </div>
    )
}

export default Header