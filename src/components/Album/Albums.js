import React from 'react';
import { useEffect } from 'react';
//styling
import styles from './Album.module.css';
//components
import Album from './Album'
import AlbumForm from '../Form/AlbumForm';
//for notifications, react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { AlbumActions, AlbumSelector, getAlbumsAsync } from '../../redux/AlbumReducer';


export default function Albums(props) {

  

    //redux
    const {albums,showForm,error}=useSelector(AlbumSelector);
    const dispatch=useDispatch();


   

    //useEffects
    //when the component loads, fetch the albums
    useEffect(()=>{
      dispatch(getAlbumsAsync());
    },[dispatch])

    //in case if there is any error
    useEffect(()=>{
      if(error){
        toast.error(`${error}`);
      }
    },[error])


    //for adding an album
    const handleAdd=()=>{
      dispatch(AlbumActions.setShowForm());
      dispatch(AlbumActions.add());
    }

  
  

  return (
    <div className={styles["album-layout"]}>
      {showForm && <AlbumForm />}
      <div className={styles.headingBar}>
        <h2>Your Albums</h2>
        <button className={showForm? styles.cancel:styles.addButton} onClick={()=>{handleAdd()}}>{showForm? "Cancel":"Add Album"}</button>
      </div>
      {/**If there are albums, show them or else show no Albums */}
       <div className={styles.albumContainer}>  
          {albums.length>0 &&
          albums.map((album,index)=><Album key={index} album={album}/>)}
      
      </div> 
   </div>
  )
}
