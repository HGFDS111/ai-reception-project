import { useGetClientsQuery } from "../../entities/client/clientApi";

function ClientsPage() {
  const { data: clients, isLoading, error } = useGetClientsQuery();

  if (isLoading) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p>Failed to load clients</p>;
  }

  return (
    <main>
      <h1>Clients</h1>
      <p>Clients found: {clients?.length ?? 0}</p>

      <ul>
        {clients?.map((client) => (
          <li key={client.id}>
            {client.name ?? "Unknown client"} — {client.phone}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ClientsPage;
