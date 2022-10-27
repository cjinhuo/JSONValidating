const rules = {
  test: {
    key: ['不能包含数字规则函数'],
    value: [''],
  },
}

const data = {
  test: '123',
  obj: {
    key123: 'value123',
    rightKey: {
      key123: 'value123',
      key123456: {
        test: 1,
      },
    },
  },
  // arr: [
  //   {
  //     test: 'one',
  //   },
  // ],
}
