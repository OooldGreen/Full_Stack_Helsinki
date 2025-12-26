import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('it receives the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<NewBlogForm createdBlog={createBlog}></NewBlogForm>)

  const inputTitle = container.querySelector('input[name="title"]')
  const inputAuthor = container.querySelector('input[name="author"]')
  const inputUrl = container.querySelector('input[name="url"]')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'test create new blog')
  await user.type(inputAuthor, 'Madame C')
  await user.type(inputUrl, 'https://iwanttosleep.com')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'test create new blog',
      author: 'Madame C',
      url: 'https://iwanttosleep.com'
    })
  
})