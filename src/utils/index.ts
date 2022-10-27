import { safeStringify } from './helper'
import { isArray, isString } from './is'

export const notIncludeWith = (target: string, chars: string = '[0-9]') => {
  const str = `/^((?!${chars}).)*$/`
  const reg = new RegExp(str)
  return reg.test(target)
}
enum RuleTypes {
  NotIncludeSth = 'NotIncludeSth',
  NotGreaterThan = 'NotGreaterThan',
}

enum Languages {
  ZH = 'zh',
  EN = 'en',
}

// interface TipMsgMapType {
//   [RuleTypes.NotIncludeSth]: {
//     [key in Languages]: (sth: string) => string
//   }
//   [RuleTypes.NotGreaterThan]: {
//     [key in Languages]: (length: number) => string
//   }
// }

const TipMsgMap = {
  [RuleTypes.NotIncludeSth]: {
    [Languages.ZH]: (sth: string) => `不能包含字符: ${sth}`,
    [Languages.EN]: (sth: string) => `not include chars: ${sth}`,
  },
  [RuleTypes.NotGreaterThan]: {
    [Languages.ZH]: (length: number) => `长度不能超过 ${length}`,
    [Languages.EN]: (length: number) => `length not greater than ${length}`,
  },
}

const getMsgWithRuleType = <T extends RuleTypes = RuleTypes>(key: T, lang = Languages.ZH) => {
  return TipMsgMap[key][lang] as typeof TipMsgMap[T][typeof lang]
}

enum PositionVerifyTypes {
  key = 'key',
  value = 'value',
  entire = 'entire',
}

interface VerificationFnType {
  [PositionVerifyTypes.key]: (key: string) => boolean
  [PositionVerifyTypes.value]: (value: any) => boolean
  [PositionVerifyTypes.entire]: (key: string, value: any) => boolean
}

export interface SingleRuleType<T extends PositionVerifyTypes = PositionVerifyTypes> {
  msg: string
  positionVerify: T
  fn: VerificationFnType[T]
}

const notGreaterThanLength = (value: String | any[] | Record<string, any>, length: number) => {
  if (isString(value) || isArray(value)) return value.length <= length
  const str = safeStringify(value)
  if (str) return str.length <= length
  return true
}
const valuesNotGreaterThan = (length: number): SingleRuleType<PositionVerifyTypes.value> => ({
  msg: getMsgWithRuleType(RuleTypes.NotGreaterThan)(length),
  positionVerify: PositionVerifyTypes.value,
  fn: value => notGreaterThanLength(value, length),
})

const keyNotIncludeSth = (except: string): SingleRuleType<PositionVerifyTypes.key> => ({
  msg: getMsgWithRuleType(RuleTypes.NotIncludeSth)(except),
  positionVerify: PositionVerifyTypes.key,
  fn: (key: string) => notIncludeWith(key, except),
})

const rules = {
  test: {
    __r_u_l_e_s__: [keyNotIncludeSth('0-9'), valuesNotGreaterThan(10)]
  },
  obj: {
    key123:
  }
}

// export const isString = {
//   msg_zh: '只能是 String 类型',
//   msg_en: 'it must be string type',
//   fn: (e: any) => typeof e === 'string',
// }
