import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import { ArrowCircleLeftSharp} from '@mui/icons-material';


export const ShowUser = (props) => {
    const items =  useSelector(({ user }) => user.items);
  return (
    <div className='container'>{
        items.map((val)=>
        val.name === props.name?(
            <div className='profile'><h1>{val.name}</h1>
            <p>{val.age}</p>
            <p>{val.email}</p>
            <p>{val.mobileNO}</p>
            <p>{val.dob}</p>
            <Link to="/main-table"><button className='icon-btn'><IconButton>
                  <ArrowCircleLeftSharp />
                </IconButton></button></Link>
            </div>
        ):("")
        )
    
    }</div>
  )
}
