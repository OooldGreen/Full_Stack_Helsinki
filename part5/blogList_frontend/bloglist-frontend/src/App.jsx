import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [hint, setHint] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      // 用户登录状态储存
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target
    // 更新 newBlog， 把新博客包装成一个对象
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleCreateBlog = async event => {
    event.preventDefault()

    try {
      const returnedNewBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedNewBlog))
      setHint(`a new blog ${returnedNewBlog.title} by ${returnedNewBlog.author} added`)
      
      setTimeout(() => {
        setNewBlog({ title: '', author: '', url: ''})
      }, 50)
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm 
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}>
        </LoginForm>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} className='error'></Notification>
      <Notification message={hint} className='hint'></Notification>
      <BlogForm 
        blogs={blogs} 
        username={user.name} 
        handleLogout={handleLogout}
        newBlog={newBlog}
        handleInputChange={handleInputChange}
        handleCreateBlog={handleCreateBlog}
      ></BlogForm>
    </div>
  )
}

export default App