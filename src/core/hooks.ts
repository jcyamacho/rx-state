import { useState, useEffect, useCallback, useMemo } from 'react'

import { Subscribable, Subject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { subject } from './reactive'

export function useRxValue<T>(subscriptable: Subscribable<T>): T | undefined {
  const [value, setValue] = useState<T>()
  useEffect(() => {
    const subscription = subscriptable.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, [subscriptable])
  return value
}

export function useSetRxValue<T>(subject: Subject<T>) {
  return useCallback((value: T) => subject.next(value), [subject])
}

export function useRxPipe<P, T>(
  project: Func<P, Subscribable<T>>,
  init?: P
): [T | undefined, (param: P) => void] {
  const source = useMemo(
    () => subject<P>({ value: init }),
    [init]
  )
  const observable = useMemo<Subscribable<T>>(() => source.pipe(switchMap(project)), [
    project,
    source
  ])

  const value = useRxValue(observable)
  const setter = useSetRxValue(source)

  return [value, setter]
}
