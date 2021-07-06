import { createSlice, createSelector } from '@reduxjs/toolkit'
import to from 'await-catch'
import passengersService from '../services/passengersService'

const INITIAL_STATE = {
  results: null,
  filter: null,
  nextPage: null,
  currenPage: 0,
  total: 0,
  loading: false,
  error: false,
}

const slice = createSlice({
  name: 'passengers',
  initialState: INITIAL_STATE,
  reducers: {
    fetchResultsStart: (state, { payload }) => {
      state.loading = payload.page > 1 ? false : true
      state.error = null
    },
    fetchResultsFailed: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    fetchResultsSuccess: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.results =
        state.results === null || payload.page === 1
          ? [...payload.data]
          : [...state.results, ...payload.data]
      state.filter =
        state.results === null || payload.page === 1
          ? [...payload.data]
          : [...state.results, ...payload.data]
      state.currentPage = payload.page
      state.total = payload.total
      state.nextPage = payload.nextPage
    },
    showFilter: (state, { payload }) => {
      state.filter = state.results?.filter((passenger) =>
        passenger?.name?.toLowerCase()?.includes(payload)
      )
    },
    showAll: (state) => {
      state.filter = state.results
    },
    removeItemStart: () => {},
    removeItemFailed: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    removeItemSuccess: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.results = state.results?.filter(
        (passenger) => passenger.name?.toLowerCase() !== payload
      )
      state.filter = state.results?.filter(
        (passenger) => passenger.name?.toLowerCase() !== payload
      )
    },
  },
})

export const {
  fetchResultsFailed,
  fetchResultsStart,
  fetchResultsSuccess,
  showFilter,
  showAll,
  removeItemStart,
  removeItemFailed,
  removeItemSuccess,
} = slice.actions

export default slice.reducer

/**
 * Thunks
 */

export const fetchPassengers =
  (pageSearch, retry = 2) =>
  async (dispatch, getState) => {
    const page = pageSearch || 1

    dispatch(fetchResultsStart({ page }))
    const [err, data] = await to(passengersService.getPassengers({ page }))
    if (err) {
      if (!retry) {
        dispatch(
          fetchResultsFailed('Ocurrió un error. Intentá nuevamente más tarde.')
        )
      }
      retry && retry > 0 && dispatch(fetchPassengers(pageSearch, retry - 1))
    } else {
      const nextPage = data.data.next?.split('page=')?.[1]

      dispatch(
        fetchResultsSuccess({
          page,
          data: data.data.results,
          total: data.data.count,
          nextPage,
        })
      )
    }
  }

export const removeItem = (item) => async (dispatch) => {
  dispatch(removeItemStart())
  try {
    dispatch(removeItemSuccess(item))
  } catch {
    dispatch(removeItemFailed(`Hubo un error al eliminar el item ${item}.`))
  }
}

export const filter = (item) => async (dispatch, getState) => {
  item !== '' ? dispatch(showFilter(item)) : dispatch(showAll(item))
}

/**
 * Selectors
 */

export const selectPassengers = (state) => state.passengers.results
export const selectPassengersFilter = (state) => state.passengers.filter
export const selectPassengersLoading = (state) => state.passengers.loading
export const selectPassengersLoadingMore = (state) =>
  state.passengers.loadingMore
export const selectPassengersError = (state) => state.passengers.error
const selectPassengersTotal = (state) => state.passengers.total

export const selectPassengersMoreResults = createSelector(
  selectPassengers,
  selectPassengersTotal,
  (data, total) => data?.length < total
)
