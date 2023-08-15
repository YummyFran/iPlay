import React from 'react'
import { Route, createRoutesFromElements, RouterProvider, createHashRouter } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import GetStarted from './pages/GetStarted'
import Home from './pages/Home'
import VoiceRoom from './pages/VoiceRoom'
import Chats from './pages/Chats'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Ranking from './pages/Ranking'
import FunCards from './pages/FunCards'
import Tasks from './pages/Tasks'
import Friends from './pages/Friends'
import PageNotFound from './pages/PageNotFound'
import UserProfile from './pages/UserProfile'
import Conversation from './pages/Conversation'

import SpaceWarewolf from './pages/Games/SpaceWarewolf'
import MicGrab from './pages/Games/MicGrab'
import LinkSnap from './pages/Games/LinkSnap'
import SurvivalChallenge from './pages/Games/SurvivalChallenge'
import WhosTheSpy from './pages/Games/WhosTheSpy'
import CrazyAlpaca from './pages/Games/CrazyAlpaca'
import GuessMyDrawing from './pages/Games/GuessMyDrawing'
import DefuseMaster from './pages/Games/DefuseMaster'

import Layout from './layouts/Layout'

import "./styles/login.css"
import "./styles/getstarted.css"
import "./styles/header.css"
import "./styles/navbar.css"
import "./styles/games.css"
import "./styles/explore.css"
import "./styles/profileheader.css"
import "./styles/profileoptions.css"
import "./styles/discover.css"
import "./styles/chats.css"
import "./styles/userprofile.css"
import "./styles/conversation.css"

const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='getstarted' element={<GetStarted />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='voicerooms' element={<VoiceRoom />} />
          <Route path='chats' element={<Chats />} />
          <Route path='discover' element={<Discover />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route path='user/:uid' element={<UserProfile />} />
        <Route path='chats/:roomID' element={<Conversation />} />
        
        <Route path='games'>
          <Route path='spacewarewolf' element={<SpaceWarewolf />} />
          <Route path='micgrab' element={<MicGrab />} />
          <Route path='linksnap' element={<LinkSnap />} />
          <Route path='survivalchallenge' element={<SurvivalChallenge />} />
          <Route path='whosthespy' element={<WhosTheSpy />} />
          <Route path='crazyalpaca' element={<CrazyAlpaca />} />
          <Route path='guessmydrawing' element={<GuessMyDrawing />} />
          <Route path='defusemaster' element={<DefuseMaster />} />
        </Route>

        <Route>
          <Route path='ranking' element={<Ranking />} />
          <Route path='funcards' element={<FunCards />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='friends' element={<Friends />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </>
    )
  )
  
  return (
    <RouterProvider router={router} />
  )
}

export default App