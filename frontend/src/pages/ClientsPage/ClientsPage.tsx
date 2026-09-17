import { useGetClientsQuery } from "../../entities/client/clientApi";
import { useGetBusinessesQuery } from "../../entities/business/businessApi";
import { useGetCallsQuery } from "../../entities/call/callApi";

function ClientsPage() {
  const { data: clients, isLoading, error } = useGetClientsQuery();
  const { data: businesses } = useGetBusinessesQuery();
  const { data: calls } = useGetCallsQuery();

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
            {client.name ?? "Unknown client"} — {client.phone} —{" "}
            {businesses?.find((business) => business.id === client.businessId)
              ?.name ?? "Unknown business"}{" "}
            — Calls:{" "}
            {calls?.filter((call) => call.clientId === client.id).length ?? 0}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ClientsPage;
