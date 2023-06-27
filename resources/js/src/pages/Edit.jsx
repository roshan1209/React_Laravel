import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate ,Link, useParams } from 'react-router-dom'
import { Base_url } from '../app';

function Edit() {
    const navigate = useNavigate()

    const [error,setError] = useState(null);

    const [inputs,setInputs] = useState({"title":"","body":""})

    const handleChangeInput = (event) =>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const {id} = useParams()

    const getEditPost = () =>{
        axios.get(Base_url+'/api/posts/'+id+'/edit')
        .then(response=>response.data)
        .then((response_data)=>{
            let posts = response_data.data;
            setInputs({title:posts.title,body:posts.body})
        })
    }

    useEffect(()=>{
        getEditPost();
    },[])

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        let data = {title:inputs.title,body:inputs.body}
        axios.put(Base_url+'/api/posts/'+id,data).then(()=>{
            navigate('/')
        }).catch(()=>{
            setError('Unable to Update Post please check database connnection');
        })
    }
  return (
    <div className='container'>
        <h3>Edit Post</h3>
        <Link to={'/'} className='btn btn-primary mt-2 mb-2'>Back</Link>
        <form onSubmit={handleFormSubmit}>
            <div className='form-group'>
                <label>Title</label>
                <input type='text' className='form-control' onChange={handleChangeInput} value={inputs.title} name='title'/>
            </div>
            <div className='form-group'>
                <label>Description</label>
                <textarea type='text' className='form-control' onChange={handleChangeInput} rows={5} value={inputs.body} name='body'></textarea>
            </div>
            <div className='form-group'>
                <button type='submit' className="btn btn-success mt-2 ">Update</button>
                {error!=null?(<p className='text-danger mt-2'>{error}</p>):""}
            </div>
        </form>
    </div>
  )
}

export default Edit
