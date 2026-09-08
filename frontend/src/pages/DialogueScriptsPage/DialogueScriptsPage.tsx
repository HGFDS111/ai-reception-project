import { useState, type FormEvent } from "react";
import {
  useGetDialogueScriptsQuery,
  useCreateDialogueScriptMutation,
} from "../../entities/dialogueScript/dialogueScriptApi";

function DialogueScriptsPage() {
  const {
    data: dialogueScripts,
    isLoading,
    error,
  } = useGetDialogueScriptsQuery();

  const [createDialogueScript, { isLoading: isCreating }] =
    useCreateDialogueScriptMutation();

  const [businessId, setBusinessId] = useState("");
  const [greeting, setGreeting] = useState("");
  const [objectionFlow, setObjectionFlow] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createDialogueScript({
      businessId: Number(businessId),
      greeting,
      objectionFlow: objectionFlow || null,
    }).unwrap();
  };

  if (isLoading) {
    return <p>Loading dialogue scripts...</p>;
  }

  if (error) {
    return <p>Failed to load dialogue scripts</p>;
  }

  return (
    <main>
      <h1>Dialogue Scripts</h1>
      <p>Dialogue scripts found: {dialogueScripts?.length ?? 0}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="businessId">Business ID</label>
          <input
            id="businessId"
            type="number"
            value={businessId}
            onChange={(event) => setBusinessId(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="greeting">Greeting</label>
          <input
            id="greeting"
            type="text"
            value={greeting}
            onChange={(event) => setGreeting(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="objectionFlow">Objection flow</label>
          <textarea
            id="objectionFlow"
            value={objectionFlow}
            onChange={(event) => setObjectionFlow(event.target.value)}
          />
        </div>

        <button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create dialogue script"}
        </button>
      </form>
    </main>
  );
}

export default DialogueScriptsPage;
