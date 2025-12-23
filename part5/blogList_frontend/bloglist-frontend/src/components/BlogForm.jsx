import Blog from './Blog'

const BlogForm = ({ blogs, username, handleLogout, newBlog, handleInputChange, handleCreateBlog }) => (
  <div>
    <h2>Blogs</h2>
    <p>
      {username} logged in 
      <button type="submit" onClick={handleLogout}>logout</button>
    </p> 

    <h2>create new</h2>
    <form onSubmit={handleCreateBlog}>
      <label htmlFor="title">title: </label>
      <input type="text" name="title" value={newBlog.title} onChange={handleInputChange}></input>
      <br></br>

      <label htmlFor="author">author: </label>
      <input type="text" name="author" value={newBlog.author} onChange={handleInputChange}></input>
      <br></br>

      <label htmlFor="url">url: </label>
      <input type="text" name="url" value={newBlog.url} onChange={handleInputChange}></input>
      <br></br>

      <button type="submit">create</button>
    </form>

    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog}></Blog>
    ))}

    
  </div>
)

export default BlogForm