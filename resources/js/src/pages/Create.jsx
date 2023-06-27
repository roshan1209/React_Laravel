import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Base_url } from '../app'

function Create() {

    const navigate = useNavigate()

    const [error,setError] = useState(null);

    const [inputs,setInputs] = useState({"title":"","body":""})

    const handleChangeInput = (event) =>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        let data = {title:inputs.title,body:inputs.body}
        axios.post(Base_url+'/api/posts',data).then(()=>{
            navigate('/')
        }).catch(()=>{
            setError('Unable to create Post please check database connnection');
        })
    }

  return (
    <div className='conatiner'>
        <h3>Create Post</h3>
        <Link to={'/'} className='btn btn-primary mt-2 mb-2'>Back</Link>
        <form onSubmit={handleFormSubmit}>
            <div className='form-group'>
                <label>Title</label>
                <input type='text' className='form-control' onChange={handleChangeInput} name='title'/>
            </div>
            <div className='form-group'>
                <label>Description</label>
                <textarea type='text' className='form-control' onChange={handleChangeInput} rows={5} name='body'></textarea>
            </div>
            <div className='form-group'>
                <button type='submit' className="btn btn-success mt-2 ">Save</button>
                {error!=null?(<p className='text-danger mt-2'>{error}</p>):""}
            </div>
        </form>
    </div>
  )
}

export default Create
