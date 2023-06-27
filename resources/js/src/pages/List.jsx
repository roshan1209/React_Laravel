import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Base_url } from '../app'

function List() {

    const [posts,setPosts] = useState([])

    const loadPosts = () =>{
        axios.get(Base_url+'/api/posts').then(response =>response.data)
        .then((response_data)=>{
            let posts = response_data.data
            setPosts(posts)
        })
    }

    const handleDelete = (id) =>{
        axios.delete(Base_url+'/api/posts/'+id)
        .then(()=>{
            loadPosts()
        })
    }


    useEffect(()=>{
        loadPosts();
    },[])

  return (
    <div>
        <div align="right">
            <Link to={'/create'} className='btn btn-primary mt-2 mb-2'>Create</Link>
        </div>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post,index)=>{
                    return(
                        <tr key={post.id}>
                        <td>{index+1}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td><Link to={'/edit/'+post.id} className='btn btn-warning'>Edit</Link>&nbsp;&nbsp;<button onClick={()=>handleDelete(post.id)} className='btn btn-danger'>Delete</button></td>
                        </tr>
                        )
                    }
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default List
