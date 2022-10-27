import { isString } from './is'

export function safeStringify(a: unknown): string {
  try {
    return isString(a) ? a : JSON.stringify(a)
  } catch (err) {
    return '[FAILED_TO_STRINGIFY]:' + String(err)
  }
}
