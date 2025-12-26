import { useState } from 'react'
import '../App.css'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hidenWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const confirmRemove = (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hidenWhenVisible}>
        {blog.title} {blog.author}
        <button className="button" onClick={() => setBlogInfoVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.title} <button className="button" onClick={() => setBlogInfoVisible(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p data-testid="10000">likes: {blog.likes} <button className="button" onClick={() => addLike(blog)}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={() => confirmRemove(blog)} className="button">remove</button>
      </div>
    </div>
  )
}

export default Blog