import { useState, type FormEvent } from "react";
import { useGetBusinessesQuery } from "../../entities/business/businessApi";
import {
  useGetCallsQuery,
  useCreateCallMutation,
} from "../../entities/call/callApi";
import { useGetClientsQuery } from "../../entities/client/clientApi";
import styles from "./CallsPage.module.css";

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error
  ) {
    const data = (error as { data?: { message?: unknown } }).data;

    if (typeof data?.message === "string") {
      return data.message;
    }
  }

  return "Something went wrong. Please try again.";
}

function CallsPage() {
  const {
    data: calls,
    isLoading: isCallsLoading,
    error: callsError,
  } = useGetCallsQuery();

  const [createCall, { isLoading: isCreatingCall }] =
    useCreateCallMutation();

  const { data: businesses } = useGetBusinessesQuery();

  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [result, setResult] = useState<
    "booked" | "rejected" | "callback_requested"
  >("callback_requested");

  const [formError, setFormError] = useState("");

  const {
    data: clients,
    isLoading: isClientsLoading,
    error: clientsError,
  } = useGetClientsQuery();

  const handleCreateCall = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setFormError("");

    try {
      await createCall({
        businessId: Number(selectedBusinessId),
        phone,
        name: name || null,
        result,
      }).unwrap();

      setPhone("");
      setName("");
      setResult("callback_requested");
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  if (isCallsLoading || isClientsLoading) {
    return <p>Loading calls...</p>;
  }

  if (callsError || clientsError) {
    return <p>Failed to load calls</p>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Calls</h1>
        <p>Calls found: {calls?.length ?? 0}</p>
      </div>

      <form className={styles.formCard} onSubmit={handleCreateCall}>
        <div>
          <label htmlFor="business">Business</label>

          <select
            id="business"
            value={selectedBusinessId}
            onChange={(event) =>
              setSelectedBusinessId(event.target.value)
            }
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

        <div>
          <label htmlFor="phone">Phone</label>

          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="result">Result</label>

          <select
            id="result"
            value={result}
            onChange={(event) =>
              setResult(
                event.target.value as
                  | "booked"
                  | "rejected"
                  | "callback_requested",
              )
            }
          >
            <option value="callback_requested">
              Callback requested
            </option>
            <option value="booked">Booked</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {formError && (
          <p role="alert">
            {formError}
          </p>
        )}

        <button type="submit" disabled={isCreatingCall}>
          {isCreatingCall ? "Creating..." : "Create call"}
        </button>
      </form>

      {calls && calls.length > 0 ? (
        <ul className={styles.callList}>
          {calls.map((call) => (
            <li key={call.id}>
              Call #{call.id} — {call.result} —{" "}
              {clients?.find(
                (client) => client.id === call.clientId,
              )?.name ?? "Unknown client"}{" "}
              —{" "}
              {clients?.find(
                (client) => client.id === call.clientId,
              )?.phone ?? "Unknown phone"}{" "}
              —{" "}
              {businesses?.find(
                (business) => business.id === call.businessId,
              )?.name ?? "Unknown business"}{" "}
              — {new Date(call.startedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>No calls yet</div>
      )}
    </main>
  );
}

export default CallsPage;