// i --> integer
// s --> string
// f --> float
// b --> boolean

const fieldSchema = {
  courseId: 's',
  courseName: 's',
}

const tagSchema = {
  _id: '*',
}

const data = {
  measurement: 'studyTime',
  fieldSchema,
  tagSchema,
}

export default data
