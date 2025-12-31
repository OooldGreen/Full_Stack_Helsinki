import { test, expect } from '@playwright/test'
import { describe } from 'node:test'
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await page.goto('/')
  })

  // 5.17 确保应用程序默认显示登录表单
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible() 
    await expect(page.getByRole('button', { name:'login' })).toBeVisible()
  })

  // 5.18 进行登录测试。成功和失败的登录都要测试。为了测试，需要在 beforeEach 块中创建一个用户。
  describe('Login', () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
      })

    //   await page.goto('/')
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluuki', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  // 5.19 编写一个测试，验证登录用户可以创建博客。该测试应确保创建的博客在博客列表中可见。
//   describe('When logged in', () => {
//     test.beforeEach(async ({ page, request }) => {
//     //   await request.post('/api/testing/reset')
//       await request.post('/api/users', {
//         data: {
//           name: 'Matti Luukkainen',
//           username: 'mluukkai',
//           password: 'salainen'
//         }
//       })

//     //   await page.goto('/')
//       await loginWith(page, 'mluukkai', 'salainen')
//     })

//     test('a new blog can be created', async ({ page }) => {
//       await createBlog(page, {
//         title: 'test a new blog can be created3',
//         author: 'Madame test',
//         url: 'https://testanewblogcanbecreated.com'
//       })

//       await expect(page.getByText('a new blog test a new blog can be created3 by Madame test added')).toBeVisible()
//       const hintDiv = page.locator('.hint')
//       await expect(hintDiv).toHaveCSS('border-style', 'solid')
//       await expect(hintDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
//     })

//     describe("After add a blog", () => {
//       test.beforeEach(async ({ page, request }) => {
//         await createBlog(page, {
//           title: 'test a new blog can be created（liking）',
//           author: 'Madame test',
//           url: 'https://testanewblogcanbecreated.com'
//         })
//       })

//       // 5.20 编写一个测试，确保博客可以被点赞。
//       test('like button is valid', async ({ page }) => {
//         await page.getByRole('button', { name: 'view' }).click()
//         await page.getByRole('button', { name: 'like' }).click()
//         await expect(page.getByTestId('10000')).toHaveText("likes: 1 like")
//       })

//       // 5.21 编写一个测试，确保添加博客的用户可以删除博客


//       // 5.22 编写一个测试，确保只有添加博客的用户能看见博客的删除按钮
    

//       // 5.23 编写一个测试，确保博客按照点赞数排序，点赞数最多的博客排在最前面。
//     })
//   })
})