// eslint-disable-next-line @typescript-eslint/ban-types
export function isObject(o: unknown): o is object {
  return typeof o === 'object' && o !== null
}

export function isInstanceOf(wat: any, base: any): boolean {
  try {
    return wat instanceof base
  } catch (_e) {
    return false
  }
}

const objProto = Object.prototype
export type PlainObject = Record<string | number | symbol, any>
// https://stackoverflow.com/a/5878101
export function isPlainObject(o: unknown): o is PlainObject {
  if (isObject(o)) {
    if (typeof Object.getPrototypeOf === 'function') {
      const proto = Object.getPrototypeOf(o)
      return proto === objProto || proto === null
    }

    // cannot test, requires ES3
    /* istanbul ignore next */
    return objProto.toString.call(o) === '[object Object]'
  }
  return false
}

export function isArray<T>(o: unknown): o is Array<T> {
  return objProto.toString.call(o) === '[object Array]'
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(o: unknown): o is Function {
  return typeof o === 'function'
}

export function isBoolean(o: unknown): o is boolean {
  return typeof o === 'boolean'
}

export function isNumber(o: unknown): o is number {
  return typeof o === 'number'
}

export function isString(o: unknown): o is string {
  return typeof o === 'string'
}

export function isEqual(a: any, b: any): boolean {
  // special
  if (isNumber(a) && isNaN(a)) {
    return isNumber(b) && isNaN(b)
  }
  // same primitive or same object
  if (a === b) {
    return true
  }

  if (isObject(a)) {
    if (isPlainObject(a)) {
      return isPlainObject(b) && isEqualPlainObject(a, b)
    } else if (isArray(a)) {
      return isArray(b) && isEqualArray(a, b)
      //TODO: handle TypedArray, Map, Set, ArrayLike
    } else {
      // different object
      return false
    }
  }

  // different primitive
  return false
}
export function isEqualPlainObject(a: PlainObject, b: PlainObject) {
  for (const k in a) {
    if (!isEqual(a[k], b[k])) {
      return false
    }
  }
  return true
}
export function isEqualArray(a: any[], b: any[]) {
  if (a.length !== b.length) {
    return false
  }
  return a.every((v, i) => isEqual(v, b[i]))
}
