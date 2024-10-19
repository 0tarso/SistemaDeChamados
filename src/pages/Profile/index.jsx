import React from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings } from 'react-icons/fi'

const Profile = () => {
    return (
        <div>
            <Header />

            <div className='content'>

                <Title title="Meu perfil">
                    <FiSettings size={25} />
                </Title>

            </div>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile