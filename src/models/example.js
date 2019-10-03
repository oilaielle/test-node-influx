// i --> integer
// s --> string
// f --> float
// b --> boolean

const fieldSchema = {
  secondWatch: 'i',
}

const tagSchema = {
  _id: '*',
  courseId: '*',
  courseName: '*',
  courseItemId: '*',
  device: '*',
  gender: '*',
  birthday: '*',
  userEmail: '*',
  accessTime: '*',
}

const data = {
  measurement: 'studyTime4',
  fieldSchema,
  tagSchema,
}

export default data
