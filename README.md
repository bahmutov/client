# CourseKit Client

[![Node version](https://img.shields.io/node/v/@coursekit/client.svg?style=flat)](http://nodejs.org/download/)


## Live demo

[https://coursekit-nuxt-demo.netlify.app/](https://coursekit-nuxt-demo.netlify.app/)

## Installation

```bash
$ npm i @coursekit/client
```

## Video player

#### HTML

```html
<div id="video"></div>
```

#### JS

```js
const lessonId = ''
const courseId = ''
const opts = {}
const loader = new VideoLoader(courseId, lessonId, opts)

const { status, loginUrl, player } = await loader.createPlayer('#video')

if (status === 200) {
  // User successfully authenticated
  player.addEventListener('ready', () => {
    // Video is ready to play
  })
}

if (status === 401) {
  // User is unauthenticated, show login URL and enrolment link
}

if (status === 403) {
  // User is unenroled, show enrolment link
}
```

## Client

### Get watched lessons

TBA