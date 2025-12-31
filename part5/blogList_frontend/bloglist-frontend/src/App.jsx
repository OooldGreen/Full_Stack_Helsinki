import { useState, useEffect, useRef } from 'react'
import './App.css'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [hint, setHint] = useState(null)
  const [user, setUser] = useState(null)
  // 显示或隐藏创建新博客表单
  const createBlogFormRef = useRef()

  // 按照 likes 数量进行排序
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    if(user) {
      blogService.getAll(user.token).then(blogs => {
        setBlogs(blogs)
      })
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      // 用户登录状态储存
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addNewBlog = async (blogObject) => {
    try {
      createBlogFormRef.current.toggleVisibility()
      const returnedNewBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedNewBlog))
      setHint(`a new blog ${returnedNewBlog.title} by ${returnedNewBlog.author} added`)

      setTimeout(() => {
        setHint(null)
      }, 5000)
    } catch {
      setErrorMessage('Failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blogObj) => {
    const updatedBlog = {
      ...blogObj,
      likes: blogObj.likes + 1,
      user: blogObj.user.id || blogObj.user
    }

    try {
      const retunedBlog = await blogService.updateLike(blogObj.id, updatedBlog)
      setBlogs(blogs.map(blog => (
        blog.id === blogObj.id ? retunedBlog : blog
      )))
    } catch {
      setErrorMessage('Failed to update likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setHint('blog remove success.')
      setTimeout(() => {
        setHint(null)
      }, 5000)
    } catch {
      setErrorMessage('Failed to remove blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} className='error'></Notification>

        <h2>Log in to application</h2>
        <LoginForm login={handleLogin}></LoginForm>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} className='error'></Notification>
      <Notification message={hint} className='hint'></Notification>

      <h2>Blogs</h2>
      <p>
        {user.name} logged in
        <button type="submit" className="button" onClick={handleLogout}>logout</button>
      </p>
      {/* create a new blog */}
      <Togglable buttonLabel='create new blog' ref={createBlogFormRef}>
        <NewBlogForm createdBlog={addNewBlog}></NewBlogForm>
      </Togglable>
      <BlogForm blogs={sortedBlogs} addLike={addLike} deleteBlog={deleteBlog}></BlogForm>
    </div>
  )
}

export default App