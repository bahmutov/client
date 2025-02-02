import createCache from './createCache'
import createApi from './createApi'

const baseUrl = 'https://api.coursekit.dev/v1'

function createErrorObject(err, status = 500) {
  console.log(err)
  return { status }
}

export class CourseKitClient {
  constructor(opts) {
    if (!opts || !opts.schoolId) {
      throw new Error('You must provide a schoolId option in the constructor.')
    }
    this.schoolId = opts.schoolId
    const devMode = opts.devMode || false
    this.cache = createCache(opts.baseUrl || baseUrl, opts.schoolId, devMode)
    this.api = createApi(opts.baseUrl || baseUrl)
  }

  async loadUser() {
    let obj = this.cache.getUser()
    if (!obj) {
      try {
        const response = await this.api.loadUser()
        obj = this.cache.addUser(response)
      } catch (err) {
        obj = createErrorObject(err)
      }
    }
    return obj
  }

  async loadCourseSummaries() {
    let obj = this.cache.getCourses()
    if (!obj) {
      try {
        const response = await this.api.loadCourses(this.schoolId)
        obj = this.cache.addCourses(response)
      } catch (err) {
        obj = createErrorObject(err)
      }
    }
    return obj
  }

  async loadCourse(courseId) {
    let obj = this.cache.getCourse(courseId)
    if (!obj) {
      try {
        const response = await this.api.loadCourse(courseId)
        obj = this.cache.addCourse(courseId, response)
      } catch (err) {
        obj = createErrorObject(err)
      }
    }
    return obj
  }

  async loadLesson(courseId, lessonId) {
    let obj = this.cache.getLesson(courseId, lessonId)
    if (!obj) {
      try {
        const response = await this.api.loadLesson(courseId, lessonId)
        obj = this.cache.addLesson(courseId, lessonId, response)
      } catch (err) {
        obj = createErrorObject(err)
      }
    }
    return obj
  }
}
