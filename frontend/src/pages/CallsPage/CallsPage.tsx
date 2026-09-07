import { useGetCallsQuery } from "../../entities/call/callApi";
import { useGetClientsQuery } from "../../entities/client/clientApi";

function CallsPage() {
  const {
    data: calls,
    isLoading: isCallsLoading,
    error: callsError,
  } = useGetCallsQuery();

  const {
    data: clients,
    isLoading: isClientsLoading,
    error: clientsError,
  } = useGetClientsQuery();

  if (isCallsLoading || isClientsLoading) {
    return <p>Loading calls...</p>;
  }

  if (callsError || clientsError) {
    return <p>Failed to load calls</p>;
  }

  return (
    <main>
      <h1>Calls</h1>
      <p>Calls found: {calls?.length ?? 0}</p>

      <ul>
        {calls?.map((call) => (
          <li key={call.id}>
            Call #{call.id} — {call.result} —{" "}
            {clients?.find((client) => client.id === call.clientId)?.name ??
              "Unknown client"}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default CallsPage;