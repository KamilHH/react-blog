import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
// import api from './api/posts'
import { DataContext } from './context/DataContext'
import { db } from './api/firestore'
import { deleteDoc, doc } from 'firebase/firestore'

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams()
  const history = useHistory()
  const post = posts.find((post) => post.id.toString() === id)

  const handleDelete = async (id) => {
    try {
      // await api.delete(`/posts/${id}`)
      const postRef = doc(db, '/posts/', id)
      await deleteDoc(postRef)
      prompt('Document deleted successfully!')
      const filteredPosts = posts.filter((post) => post.id !== id)
      setPosts(filteredPosts)
      history.push('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className='edit'>Edit Post</button>
            </Link>
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        )}
      </article>
      {!post && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  )
}

export default PostPage
