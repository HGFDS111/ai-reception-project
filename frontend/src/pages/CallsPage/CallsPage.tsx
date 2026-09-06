import { useGetCallsQuery } from "../../entities/call/callApi";

function CallsPage() {
  const { data: calls, isLoading, error } = useGetCallsQuery();

  if (isLoading) {
    return <p>Loading calls...</p>;
  }

  if (error) {
    return <p>Failed to load calls</p>;
  }

  return (
    <main>
      <h1>Calls</h1>
      <p>Calls found: {calls?.length ?? 0}</p>

      <ul>
        {calls?.map((call) => (
          <li key={call.id}>
            Call #{call.id} — {call.result} — client {call.clientId}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default CallsPage;
