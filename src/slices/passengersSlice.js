import { createSlice } from '@reduxjs/toolkit'
import to from 'await-catch'
import passengersService from '../services/passengersService'

const INITIAL_STATE = {
  results: null,
  nextPage: null,
  currenPage: 0,
  total: 0,
  loading: {
    results: false,
    removeItem: false,
  },
  error: {
    results: false,
    removeItem: false,
  },
}

const slice = createSlice({
  name: 'passengers',
  initialState: INITIAL_STATE,
  reducers: {
    fetchResultsStart: (state, { payload }) => {
      state.loading.results = payload.page > 1 ? false : true
      state.error.results = null
    },
    fetchResultsFailed: (state, { payload }) => {
      state.loading.results = false
      state.error.results = payload
    },
    fetchResultsSuccess: (state, { payload }) => {
      state.loading.results = false
      state.error.results = null
      state.results =
        state.results === null || payload.page === 1
          ? [...payload.data]
          : [...state.results, ...payload.data]
      state.currentPage = payload.page
      state.total = payload.total
      state.nextPage = payload.nextPage
    },
    removeItemStart: (state) => {
      state.loading.removeItem = true
    },
    removeItemFailed: (state, { payload }) => {
      state.loading.removeItem = false
      state.error.removeItem = payload
    },
    removeItemSuccess: (state, { payload }) => {
      state.loading.removeItem = false
      state.error.removeItem = null
      state.results = state.results?.filter(
        (passenger) => passenger.name?.toLowerCase() !== payload
      )
    },
  },
})

export const {
  fetchResultsFailed,
  fetchResultsStart,
  fetchResultsSuccess,
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
  async (dispatch) => {
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

/**
 * Selectors
 */

export const selectPassengers = (state) => state.passengers.results
export const selectPassengersLoading = (state) =>
  state.passengers.loading.results
export const selectPassengersError = (state) => state.passengers.error.results
export const selectRemoveItemLoading = (state) =>
  state.passengers.loading.removeItem
export const selectRemoveItemError = (state) =>
  state.passengers.error.removeItem
