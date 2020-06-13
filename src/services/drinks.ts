import { ajax } from 'rxjs/ajax'
import { map, switchMap, combineAll } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { freeze, freezeFamily } from 'core/reactive'

const SERVICE_URL = `${process.env.REACT_APP_SERVICE_URL}/api/json/v1/1`

type Category = {
  strCategory: string
}

type Cocktail = {
  strDrink: string
  strDrinkThumb: string
  idDrink: string
}

type Result<T> = {
  drinks: T[]
}

export const categories$ = freeze(
  ajax.getJSON<Result<Category>>(`${SERVICE_URL}/list.php?c=list`).pipe(
    switchMap((rs) => from(rs.drinks)),
    map((d) => of(d.strCategory)),
    combineAll()
  )
)

export const byCategory = freezeFamily<string, Drink[]>((category: string) =>
  ajax.getJSON<Result<Cocktail>>(`${SERVICE_URL}/filter.php?c=${category}`).pipe(
    switchMap((rs) => from(rs.drinks)),
    map((d) =>
      of({
        id: d.idDrink,
        name: d.strDrink,
        thumb: d.strDrinkThumb
      })
    ),
    combineAll()
  )
)
