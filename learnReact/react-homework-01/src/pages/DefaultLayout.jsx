// import React from 'react'

export default function DefaultLayout() {
  return `
    <div class="container">
      <h1 style="cursor: pointer">Header</h1>
      <main>
        <h2>menu</h2>
        <ul>
          <li>
            <a href="/" data-navigo>Home page</a>
          </li>
          <li>
            <a href="/about" data-navigo>About page</a>
          </li>
          <li>
            <a href="/products" data-navigo>Products page</a>
          </li>
        </ul>
        body
      </main>
      <h1>Footer</h1>
    </div>
  `;
}
