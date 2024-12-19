import React from 'react'
import Albums from '../components/Album/Albums'
import Loading from '../components/Loading/Loading';
//redux
import { useSelector } from 'react-redux'
import { AlbumSelector } from '../redux/AlbumReducer'

export default function Home() {
  const {loading}=useSelector(AlbumSelector);
  return (
    <>
        <Albums/>
        {/* loading modal, whenever there is an interaction with the server */}
        {loading && <div className='loading'><Loading/></div>}
    </>
  )
}
