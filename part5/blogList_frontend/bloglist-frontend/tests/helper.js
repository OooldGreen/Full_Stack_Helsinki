const loginWith = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByRole('textbox', { name: 'title' }).fill(blog.title)
    await page.getByRole('textbox', { name: 'author' }).fill(blog.author)
    await page.getByRole('textbox', { name: 'url' }).fill(blog.url) 
    await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }