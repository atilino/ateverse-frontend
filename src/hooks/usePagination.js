import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function usePagination({ page = 0, limit = 10 }) {
  const [pagination, setPagination] = useState({
    page,
    limit,
    totalPages: 1,
    totalResults: 0,
    nextPage: null
  })
  const [search, setSearch] = useSearchParams({ page, limit })

  useEffect(() => {
    search.set('page', search.get('page') || page)
    search.set('limit', search.get('limit') || limit)
    setSearch(search)
  }, [])

  useEffect(() => {
    search.set('page', pagination.page)
    search.set('limit', pagination.limit)
    setSearch(search)
  }, [pagination.page, pagination.limit])

  return [pagination, setPagination]
}