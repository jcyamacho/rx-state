import { BehaviorSubject, Subject, Observable, ReplaySubject } from 'rxjs'

export type SubjectConfig<T> = {
  value?: T
  initialized?: boolean
}

export function subject<T>(config: SubjectConfig<T> = {}): Subject<T> {
  if (config.initialized === undefined) {
    return config.value ? new BehaviorSubject(config.value) : new ReplaySubject<T>()
  }
  if (config.initialized === true) {
    return new BehaviorSubject(config.value as T)
  }
  return new ReplaySubject<T>()
}

export function freeze<T>(source: Observable<T>): Observable<T> {
  const result = new ReplaySubject<T>()
  const subscription = source.subscribe({
    next: (value) => result.next(value),
    error: (err) => result.error(err),
    complete: () => {
      result.complete()
      subscription.unsubscribe()
    }
  })
  return result
}

export function freezeFamily<P, T>(factory: Func<P, Observable<T>>): Func<P, Observable<T>> {
  const map = new Map<P, Observable<T>>()
  return (param: P) => {
    let value = map.get(param)
    if (value === undefined) {
      value = freeze(factory(param))
      map.set(param, value)
    }
    return value
  }
}
