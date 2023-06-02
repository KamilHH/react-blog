import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
// import api from './api/posts'
import DataContext from './context/DataContext'
import { db } from './api/firestore'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [datetime, setDatetime] = useState('')
  const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams()
  const history = useHistory()

  const post = posts.find((item) => item.id.toString() === id)

  useEffect(() => {
    if (post) {
      setDatetime(post.datetime)
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, datetime, setEditTitle, setEditBody])

  const handleEdit = async (id) => {
    const edittime = new Intl.DateTimeFormat('pl-PL', {
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date())

    const updatedPost = {
      id,
      datetime,
      updated: edittime,
      title: editTitle,
      body: editBody,
    }

    try {
      // const response = await api.put(`/posts/${id}`, updatedPost)
      const docRef = doc(db, '/posts/', id)
      await updateDoc(docRef, updatedPost)

      const docSnapshot = await getDoc(docRef)
      const updatedPostData = docSnapshot.data()
      setPosts(posts.map((post) => (post.id === id ? updatedPostData : post)))
      console.log('Document updated successfully!')
      setEditTitle('')
      setEditBody('')
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className='NewPost'>
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input
              type='text'
              id='postTitle'
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Text:</label>
            <textarea
              id='postBody'
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
            />
            <button type='submit' onClick={() => handleEdit(post.id)}>
              Edit Post
            </button>
          </form>
        </>
      )}
      {!editTitle && (
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

export default EditPost
