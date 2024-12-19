import React from 'react'
//styles
import styles from './Album.module.css';
//image
import gallery from "../../images/gallery.png";
import edit from "../../images/pencil.png";
import trash from "../../images/trash.png";
//redux
import { useDispatch } from 'react-redux';
import { AlbumActions, deleteAlbumAsync } from '../../redux/AlbumReducer';


export default function Album(props) {

  //redux
  const{album}=props;
  const dispatch=useDispatch();

  //editing an album
  const handleEdit=(e,album)=>{
    e.stopPropagation();
    dispatch(AlbumActions.edit(album));
    window.scrollTo({
      top:0,
      behavior:"auto"
    })
  }

  //deleting  an album
  const handleDelete=(e,album)=>{
    e.stopPropagation();
    dispatch(deleteAlbumAsync(album));
  }


  return (
       <div className={styles.album}>
        <img src={gallery} alt='album' width={"85%"} height={"60%"}/>
        <h4>{album.title}</h4>
        <div className={styles.options}>
        <div className={styles["option-button"]} onClick={(e)=>{handleEdit(e,album)}}>
          <img src={edit} alt='edit'  width={"100%"} height={"100%"}/>
        </div>
        <div className={styles["option-button"]} onClick={(e)=>{handleDelete(e,album)
                                                 }}>
           <img src={trash} alt='delete' width={"100%"} height={"100%"}/>
        </div>
        
       
      </div>
      </div>
  )
}
