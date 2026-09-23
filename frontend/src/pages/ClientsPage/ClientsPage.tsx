import { useState, type FormEvent } from "react";
import {
  useGetClientsQuery,
  useCreateClientMutation,
} from "../../entities/client/clientApi";
import { useGetBusinessesQuery } from "../../entities/business/businessApi";
import { useGetCallsQuery } from "../../entities/call/callApi";
import styles from "./ClientsPage.module.css";

function ClientsPage() {
  const { data: clients, isLoading, error } = useGetClientsQuery();
  const [createClient, { isLoading: isCreating }] =
  useCreateClientMutation();
  const { data: businesses } = useGetBusinessesQuery();
  const { data: calls } = useGetCallsQuery();
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [businessId, setBusinessId] = useState("");

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  await createClient({
    name,
    phone,
    businessId: Number(businessId),
  }).unwrap();

  setName("");
  setPhone("");
  setBusinessId("");
};

  if (isLoading) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p>Failed to load clients</p>;
  }

  return (
  <main className={styles.page}>
      <div className={styles.header}>
  <h1>Clients</h1>
  <p>Clients found: {clients?.length ?? 0}</p>
</div>

<form className={styles.formCard} onSubmit={handleSubmit}>
  <div>
    <label htmlFor="client-name">Name</label>
    <input
      id="client-name"
      type="text"
      value={name}
      onChange={(event) => setName(event.target.value)}
      required
    />
  </div>

  <div>
    <label htmlFor="client-phone">Phone</label>
    <input
      id="client-phone"
      type="text"
      value={phone}
      onChange={(event) => setPhone(event.target.value)}
      required
    />
  </div>

  <div>
    <label htmlFor="client-business">Business</label>
    <select
      id="client-business"
      value={businessId}
      onChange={(event) => setBusinessId(event.target.value)}
      required
    >
      <option value="">Select business</option>

      {businesses?.map((business) => (
        <option key={business.id} value={business.id}>
          {business.name}
        </option>
      ))}
    </select>
  </div>

  <button type="submit" disabled={isCreating}>
    {isCreating ? "Creating..." : "Add client"}
  </button>
</form>

    {clients && clients.length > 0 ? (
  <ul className={styles.clientList}>
    {clients.map((client) => (
      <li key={client.id}>
        {client.name ?? "Unknown client"} — {client.phone} —{" "}
        {businesses?.find((business) => business.id === client.businessId)
          ?.name ?? "Unknown business"}{" "}
        — Calls:{" "}
        {calls?.filter((call) => call.clientId === client.id).length ?? 0}
      </li>
    ))}
  </ul>
) : (
  <div className={styles.emptyState}>No clients yet</div>
)}
    </main>
  );
}

export default ClientsPage;
