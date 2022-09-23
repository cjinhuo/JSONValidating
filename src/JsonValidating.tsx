import ReactJson from 'react-json-view'

const test = {
  test: {
    test: '',
  },
}

export default function JsonValidating() {
  return <ReactJson src={test}></ReactJson>
}
