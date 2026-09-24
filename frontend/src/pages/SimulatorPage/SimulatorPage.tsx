import { useState, type FormEvent } from "react";
import { useGetBusinessesQuery } from "../../entities/business/businessApi";
import {
  useStartSimulationMutation,
  useSendMessageMutation,
  type Call,
  type Message,
} from "../../entities/call/callApi";
import styles from "./SimulatorPage.module.css";

function SimulatorPage() {
  const { data: businesses } = useGetBusinessesQuery();
  const [startSimulation, { isLoading: isStarting }] =
    useStartSimulationMutation();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const [businessId, setBusinessId] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [callId, setCallId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [result, setResult] = useState<Call["result"] | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleStart = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const data = await startSimulation({
        businessId: Number(businessId),
        phone,
        name: name || null,
      }).unwrap();

      setCallId(data.callSession.id);
      setMessages(data.messages);
      setResult(data.callSession.result);
    } catch {
      setError("Failed to start the call");
    }
  };

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!callId || !text.trim()) return;
    setError("");

    try {
      const data = await sendMessage({ callId, text }).unwrap();

      setMessages(data.messages);
      setResult(data.callSession.result);
      setText("");
    } catch {
      setError("Failed to send the message");
    }
  };

  const handleEnd = () => {
    setCallId(null);
    setMessages([]);
    setResult(null);
    setText("");
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Call simulator</h1>
        <p>Talk to the AI receptionist as if you were a client</p>
      </div>

      {callId === null ? (
        <form className={styles.formCard} onSubmit={handleStart}>
          <div>
            <label htmlFor="business">Business</label>
            <select
              id="business"
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

          <div>
            <label htmlFor="phone">Client phone</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="name">Client name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <button type="submit" disabled={isStarting}>
            {isStarting ? "Calling..." : "Start call"}
          </button>
        </form>
      ) : (
        <div className={styles.chat}>
          <div className={styles.status}>
            Call #{callId} — result: <strong>{result}</strong>
          </div>

          <div className={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "client"
                    ? styles.clientMessage
                    : styles.assistantMessage
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <form className={styles.inputRow} onSubmit={handleSend}>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type as the client..."
            />
            <button type="submit" disabled={isSending}>
              Send
            </button>
            <button type="button" onClick={handleEnd}>
              End call
            </button>
          </form>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
}

export default SimulatorPage;
