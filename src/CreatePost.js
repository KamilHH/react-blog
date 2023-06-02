import { useContext, useState } from 'react'
import { DataContext } from './context/DataContext'
import { useHistory } from 'react-router-dom'
// import api from './api/posts'
import { db } from './api/firestore'
import { collection, addDoc, getDoc } from 'firebase/firestore'

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const { posts, setPosts } = useContext(DataContext)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // const id = posts.length ? posts[posts.length - 1].id + 1 : 1
      const datetime = new Intl.DateTimeFormat('pl-PL', {
        dateStyle: 'full',
        timeStyle: 'medium',
      }).format(new Date())

      const newPost = { datetime, title: postTitle, body: postBody }
      /** 
      this is for axios
      const response = await api.post('/posts', newPost) 
      */

      const docRef = await addDoc(collection(db, '/posts'), newPost)
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        const createdPost = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }

        console.log('Post created:', createdPost)

        const allPosts = [...posts, createdPost]
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        history.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className='NewPost'>
      <h2>Create New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          type='text'
          id='postTitle'
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Text:</label>
        <textarea
          id='postBody'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
        />
        <button type='submit'>Create Post</button>
      </form>
    </main>
  )
}

export default CreatePost
