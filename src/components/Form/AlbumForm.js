import React,{useEffect, useRef, useState } from 'react';
//styling
import styles from './Form.module.css';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { AlbumSelector, addAlbumAsync, editAlbumAsync } from '../../redux/AlbumReducer';
//notifications
import { toast } from 'react-toastify';



export default function AlbumForm() {
  //for title,user id
  const [title,setTitle]=useState("");
  const [userId,setUserId]=useState("");

  //redux
  const {edit,albumToEdit}=useSelector(AlbumSelector);
  const dispatch=useDispatch();
  //refs
  const titleRef=useRef();


  //useEffects
   //useeffect, if the edit option is clicked, then album to be edited should be shown
   useEffect(()=>{
    if(edit){
      setTitle(albumToEdit.title);
      setUserId(albumToEdit.userId);
    }
  },[albumToEdit,edit])

  //when the component loads, i want the focus on the title input
  useEffect(()=>{
    if(titleRef.current){
      titleRef.current.focus();
    }
  },[])


  //cleaing the form
  const clearForm=()=>{
    setTitle("");
    setUserId("");
  }


  //when the form is submitted
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(title.trim()==="" || !userId){
      toast.warning("Please fill all  fields");
      return;
    }
    //if it is not for editing then it must be adding
    if(!edit){
      dispatch(addAlbumAsync({title,userId}));
    }else{
      dispatch(editAlbumAsync({
        id:albumToEdit.id,
        userId,
        title
      }));
    }
    clearForm();
  }


 

  return (
    <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit}>
            <h2>{edit? `Edit Album`:"Create a new Album"}</h2>
            <div className={styles["form-input"]}>
                <input type='text' placeholder={edit? "Edit Title":"Add Album Title"} value={title} onChange={(e)=>setTitle(e.target.value)} ref={titleRef}/>
                <input type='text' placeholder={edit? "Edit user id":"Add user id"} value={userId} onChange={(e)=>setUserId(e.target.value)} />
                <div>
                  <button className={styles.clear} onClick={(e)=>{
                    e.preventDefault();
                    clearForm();
                  }}>Clear</button>
                  <button className={styles.create} >{edit? "Update":"Create"}</button>
                </div>
            </div>
        </form>
    </div>
  )
}
