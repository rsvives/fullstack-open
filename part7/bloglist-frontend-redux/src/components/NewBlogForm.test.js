import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import { render, screen } from '@testing-library/react'

describe('<NewBlogForm/>', () => {
  let userInteraction
  const mockCreateNewBlog = jest.fn()
  const newBlog = {
    title: 'new Blog',
    author: 'Mr. Blogger',
    url: 'https://cool-blog.dev'
  }
  beforeEach(() => {
    userInteraction = userEvent.setup()
    render(<NewBlogForm createNewBlog={mockCreateNewBlog}/>)
  })

  test('event handler passed as prop is called with right details on submit', async () => {
    const expandButton = screen.getByText('New Blog')
    await userInteraction.click(expandButton)

    const inputTitle = screen.getByLabelText('Title:')
    const inputAuthor = screen.getByLabelText('Author:')
    const inputUrl = screen.getByLabelText('Url:')
    const createBlogButton = screen.getByText('Create')

    await userInteraction.type(inputTitle, newBlog.title)
    await userInteraction.type(inputAuthor, newBlog.author)
    await userInteraction.type(inputUrl, newBlog.url)
    await userInteraction.click(createBlogButton)

    expect(mockCreateNewBlog.mock.calls).toHaveLength(1)
    expect(mockCreateNewBlog.mock.calls[0][0]).toEqual(newBlog)
  })
})
