import { ajax } from 'rxjs/ajax'
import { map, switchMap, combineAll, defaultIfEmpty } from 'rxjs/operators'
import { from, of } from 'rxjs'

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL

interface Category {
  strCategory: string
}

interface CategoryList {
  drinks: Category[]
}

interface DrinkSource {
  strDrink: string
  strDrinkThumb: string
  idDrink: string
}

interface DrinkSourceList {
  drinks: DrinkSource[]
}

export interface Drink {
  id: string
  name: string
  thumb: string
}

export const categories$ = ajax
  .getJSON<CategoryList>(`${SERVICE_URL}/api/json/v1/1/list.php?c=list`)
  .pipe(
    defaultIfEmpty<CategoryList>({ drinks: [] }),
    switchMap((rs) => from(rs.drinks)),
    map((d) => of(d.strCategory)),
    combineAll()
  )

export const getCocktailsByCategory = (category: string) =>
  ajax.getJSON<DrinkSourceList>(`${SERVICE_URL}/api/json/v1/1/filter.php?c=${category}`).pipe(
    defaultIfEmpty<DrinkSourceList>({ drinks: [] }),
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
