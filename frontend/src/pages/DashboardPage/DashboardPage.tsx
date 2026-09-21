import { useGetBusinessesQuery } from "../../entities/business/businessApi";
import { useGetClientsQuery } from "../../entities/client/clientApi";
import { useGetCallsQuery } from "../../entities/call/callApi";
import { useGetServiceTemplatesQuery } from "../../entities/serviceTemplate/serviceTemplateApi";
import { useGetDialogueScriptsQuery } from "../../entities/dialogueScript/dialogueScriptApi";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const { data: businesses } = useGetBusinessesQuery();
  const { data: clients } = useGetClientsQuery();
  const { data: calls } = useGetCallsQuery();
  const { data: serviceTemplates } = useGetServiceTemplatesQuery();
  const { data: dialogueScripts } = useGetDialogueScriptsQuery();
  const bookedCalls =
    calls?.filter((call) => call.result === "booked").length ?? 0;
  const callbackRequestedCalls =
    calls?.filter((call) => call.result === "callback_requested").length ?? 0;
  const rejectedCalls =
    calls?.filter((call) => call.result === "rejected").length ?? 0;
  const bookingRate =
    calls && calls.length > 0
      ? Math.round((bookedCalls / calls.length) * 100)
      : 0;
  const recentCalls = [...(calls ?? [])]
  .sort(
    (a, b) =>
      new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  )
  .slice(0, 5);
  return (
    <section className={styles.page}>
      <div className={styles.header}>
  <h1>Dashboard</h1>
  <p>Welcome to AI Reception</p>
</div>
      <p>Businesses: {businesses?.length ?? 0}</p>
      <p>Clients: {clients?.length ?? 0}</p>
      <p>Calls: {calls?.length ?? 0}</p>
      <p>Booked calls: {bookedCalls}</p>
      <p>Callback requested: {callbackRequestedCalls}</p>
      <p>Rejected calls: {rejectedCalls}</p>
      <p>Booking rate: {bookingRate}%</p>
      <p>Services: {serviceTemplates?.length ?? 0}</p>
      <p>Dialogue Scripts: {dialogueScripts?.length ?? 0}</p>
      <h2>Recent calls</h2>

      <ul>
        {recentCalls.map((call) => (
         <li key={call.id}>
  Call #{call.id} — {call.result} —{" "}
  {clients?.find((client) => client.id === call.clientId)?.name ??
    "Unknown client"}{" "}
  —{" "}
  {businesses?.find((business) => business.id === call.businessId)?.name ??
    "Unknown business"}
</li>
        ))}
      </ul>
    </section>
  );
}

export default DashboardPage;
