import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function usePagination({ page = 0, limit = 10, initialPagination = false }) {
  const [pagination, setPagination] = useState({
    page,
    limit,
    totalPages: 1,
    totalResults: 0,
    nextPage: null
  })
  const [search, setSearch] = useSearchParams({ page, limit })

  useEffect(() => {
    if (initialPagination) {
      search.set('page', search.get('page') || page)
      search.set('limit', search.get('limit') || limit)
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