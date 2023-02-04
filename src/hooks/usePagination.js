import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function usePagination({ page = 0, limit = 10, initialPagination = false }) {
  const [search, setSearch] = useSearchParams({ page, limit })

  const [pagination, setPagination] = useState({
    page: search.get('page') || page,
    limit: search.get('limit') || limit,
    totalPages: 1,
    totalResults: 0,
    nextPage: null
  })

  useEffect(() => {
    if (initialPagination) {
      search.set('page', page)
      search.set('limit', limit)
      setSearch(search)
    }
  }, [])

  useEffect(() => {
    if (initialPagination) {
      search.set('page', pagination.page)
      search.set('limit', pagination.limit)
      setSearch(search)
    }
  }, [pagination.page, pagination.limit])

  return [pagination, setPagination]
}