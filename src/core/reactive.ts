import { useState, useEffect, useCallback, useMemo } from 'react'

import { BehaviorSubject, Subscribable, Subject, ReplaySubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'

export interface SubjectConfig<T> {
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

export function useObservable<T>(subscriptable: Subscribable<T>): T | undefined {
  const [value, setValue] = useState<T>()
  useEffect(() => {
    const subscription = subscriptable.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, [subscriptable])
  return value
}

export function useSubjectSetter<T>(subject: Subject<T>) {
  return useCallback((value: T) => subject.next(value), [subject])
}

export function useSwitchMap<P, T>(
  project: (param: P) => Subscribable<T>
): [T | undefined, (param: P) => void] {
  const source = useMemo(
    () => subject<P>({ initialized: false }),
    []
  )

  const observable = useMemo<Subscribable<T>>(() => source.pipe(switchMap(project)), [
    project,
    source
  ])

  const value = useObservable(observable)
  const setter = useSubjectSetter(source)

  return [value, setter]
}
