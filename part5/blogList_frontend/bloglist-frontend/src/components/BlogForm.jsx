import Blog from './Blog'

const BlogForm = ({ blogs, addLike, deleteBlog }) => (
  <div>
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog}></Blog>
    ))}
  </div>
)

export default BlogForm