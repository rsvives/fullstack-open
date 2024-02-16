import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  let userInteraction
  let blog
  let mockLikeHandler

  beforeEach(() => {
    blog = {
      author: 'Mr Blogger',
      title: 'Best Dev Blog',
      url: 'https://random.url.dev',
      likes: 3,
      user: {
        username: 'user1',
        name: 'Mr. User'
      }
    }
    userInteraction = userEvent.setup()
    mockLikeHandler = jest.fn()

    render(<Blog blog={blog} loggedUser={blog.user} onUpdate={mockLikeHandler}/>)
  })
  test('Default: author and title are displayed by default', () => {
    const element = screen.getByText(`${blog.title} | ${blog.author}`)
    expect(element).toBeDefined()
  })
  test('Default:no other props are displayed by default', () => {
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText(blog.likes)
    const username = screen.queryByText(blog.user.username)
    const name = screen.queryByText(blog.user.name)

    expect(url && likes && username && name).toBeNull()
  })

  test('Expanded: url, likes and user are displayed when expanded', async () => {
    const button = screen.getByText('show')
    await userInteraction.click(button)

    screen.getByText(blog.url)
    screen.getByText(`${blog.likes} likes`)
    screen.getByText(`@${blog.user.username}`)
  })
  test('Expanded: like button clicked twice, handler called twice', async () => {
    const showButton = screen.getByText('show')
    await userInteraction.click(showButton)

    const likeButton = screen.getByText('like')
    await userInteraction.click(likeButton)
    await userInteraction.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
