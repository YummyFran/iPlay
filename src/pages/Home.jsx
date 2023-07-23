import React from 'react'
import { Navigate } from 'react-router'
import { useUser } from '../providers/UserProvider'

import Header from '../components/Home/Header'
import Games from '../components/Home/Games'
import Explore from '../components/Home/Explore'
import Loading from '../components/Loading'

const Home = () => {
  const [user, loading] = useUser()
  
  if(!user) return <Navigate to="/login"/>
  if(loading) return <Loading />

  return (
    <section className='home'>
      <Header />
      <Games />
      <Explore />
    </section>
  )
}

export default Home