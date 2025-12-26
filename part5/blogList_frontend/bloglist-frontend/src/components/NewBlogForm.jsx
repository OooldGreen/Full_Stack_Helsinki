import { useState } from 'react'
import '../App.css'

const NewBlogForm = ({ createdBlog }) => {
  // 创建新博客
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    // 更新 newBlog， 把新博客包装成一个对象
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    createdBlog(newBlog)

    setTimeout(() => {
      setNewBlog({ title: '', author: '', url: '' })
    }, 50)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <label htmlFor="title">title: </label>
        <input type="text" name="title" value={newBlog.title} onChange={handleInputChange}></input>
        <br></br>

        <label htmlFor="author">author: </label>
        <input type="text" name="author" value={newBlog.author} onChange={handleInputChange}></input>
        <br></br>

        <label htmlFor="url">url: </label>
        <input type="text" name="url" value={newBlog.url} onChange={handleInputChange}></input>
        <br></br>

        <button type="submit" className="button">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm