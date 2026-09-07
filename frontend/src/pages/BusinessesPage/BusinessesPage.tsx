import { useGetBusinessesQuery } from '../../entities/business/businessApi'

function BusinessesPage() {
  const { data: businesses, isLoading, error } = useGetBusinessesQuery()

  if (isLoading) {
    return <p>Loading businesses...</p>
  }

  if (error) {
    return <p>Failed to load businesses</p>
  }

 return (
  <main>
    <h1>Businesses</h1>
    <p>Businesses found: {businesses?.length ?? 0}</p>

    <ul>
      {businesses?.map((business) => (
        <li key={business.id}>
          {business.name} — {business.type}
        </li>
      ))}
    </ul>
  </main>
)
}

export default BusinessesPage