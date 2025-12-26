import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog render', () => {
  test('render title and author of blogs but not url and likes', () => {
    const blog = {
      title: 'test blog',
      author: 'testMadame',
      likes: 10000,
      url: 'https://testMadamedoesntliketest.com'
    }

    render(<Blog blog={blog}></Blog>)

    expect(screen.getByText('test blog')).toBeDefined()
    expect(screen.getByText('testMadame')).toBeDefined()

    const likes = screen.getByTestId('10000')
    const url = screen.getByText('https://testMadamedoesntliketest.com')
    expect(likes).not.toBeVisible()
    expect(url).not.toBeVisible()
  })

  test('after clicking th button, show url and likes', async () => {
    const blog = {
      title: 'test blog',
      author: 'testMadame',
      likes: 10000,
      url: 'https://testMadamedoesntliketest.com'
    }

    render(<Blog blog={blog}></Blog>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likes = screen.getByTestId('10000')
    const url = screen.getByText('https://testMadamedoesntliketest.com')
    expect(likes).toBeVisible()
    expect(url).toBeVisible() 
  })

  test('if likes button is clicked twice, addLike is called twice', async () => {
    const blog = {
      title: 'test blog',
      author: 'testMadame',
      likes: 10000,
      url: 'https://testMadamedoesntliketest.com'
    }
    
    const mocHandler = vi.fn()

    render(<Blog blog={blog} addLike={mocHandler}></Blog>)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view', { exact: false })
    await user.click(viewButton)
    
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mocHandler.mock.calls).toHaveLength(2)
  })
})