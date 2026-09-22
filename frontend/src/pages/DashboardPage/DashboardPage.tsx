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
      <div className={styles.statsGrid}>
  <div className={styles.statCard}>
    <span>Businesses</span>
    <strong>{businesses?.length ?? 0}</strong>
  </div>

  <div className={styles.statCard}>
    <span>Clients</span>
    <strong>{clients?.length ?? 0}</strong>
  </div>

  <div className={styles.statCard}>
    <span>Calls</span>
    <strong>{calls?.length ?? 0}</strong>
  </div>

  <div className={styles.statCard}>
    <span>Booking rate</span>
    <strong>{bookingRate}%</strong>
  </div>
</div>

<div className={styles.secondaryStatsGrid}>
  <div className={styles.statCard}>
    <span>Booked calls</span>
    <strong>{bookedCalls}</strong>
  </div>

  <div className={styles.statCard}>
    <span>Callback requested</span>
    <strong>{callbackRequestedCalls}</strong>
  </div>

  <div className={styles.statCard}>
    <span>Rejected calls</span>
    <strong>{rejectedCalls}</strong>
  </div>

  <div className={styles.statCard}>
    <span>Services</span>
    <strong>{serviceTemplates?.length ?? 0}</strong>
  </div>

  <div className={styles.statCard}>
    <span>Dialogue Scripts</span>
    <strong>{dialogueScripts?.length ?? 0}</strong>
  </div>
</div>

     <div className={styles.recentCalls}>
  <h2>Recent calls</h2>

  <ul>
    {recentCalls.map((call) => (
      <li key={call.id}>
        Call #{call.id} —{" "}
{call.result === "callback_requested" ? "callback requested" : call.result} —{" "}
        {clients?.find((client) => client.id === call.clientId)?.name ??
          "Unknown client"}{" "}
        —{" "}
        {businesses?.find((business) => business.id === call.businessId)?.name ??
          "Unknown business"}
      </li>
    ))}
  </ul>
</div>
    </section>
  );
}

export default DashboardPage;
