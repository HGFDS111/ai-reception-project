import { useState, type FormEvent } from "react";
import {
  useGetDialogueScriptsQuery,
  useCreateDialogueScriptMutation,
  useUpdateDialogueScriptMutation,
  useDeleteDialogueScriptMutation,
} from "../../entities/dialogueScript/dialogueScriptApi";
import { useGetBusinessesQuery } from "../../entities/business/businessApi";
import styles from "./DialogueScriptsPage.module.css";

function DialogueScriptsPage() {
  const {
    data: dialogueScripts,
    isLoading,
    error,
  } = useGetDialogueScriptsQuery();

  const { data: businesses } = useGetBusinessesQuery();

  const [createDialogueScript, { isLoading: isCreating }] =
    useCreateDialogueScriptMutation();

  const [updateDialogueScript, { isLoading: isUpdating }] =
    useUpdateDialogueScriptMutation();

  const [deleteDialogueScript, { isLoading: isDeleting }] =
    useDeleteDialogueScriptMutation();

  const [businessId, setBusinessId] = useState("");
  const [greeting, setGreeting] = useState("");
  const [objectionFlow, setObjectionFlow] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingId !== null) {
      await updateDialogueScript({
        id: editingId,
        greeting,
        objectionFlow: objectionFlow || null,
      }).unwrap();

      setEditingId(null);
      setBusinessId("");
      setGreeting("");
      setObjectionFlow("");

      return;
    }

    await createDialogueScript({
      businessId: Number(businessId),
      greeting,
      objectionFlow: objectionFlow || null,
    }).unwrap();
    setBusinessId("");
    setGreeting("");
    setObjectionFlow("");
  };

  const handleEdit = (script: {
    id: number;
    businessId: number;
    greeting: string;
    objectionFlow: string | null;
  }) => {
    setEditingId(script.id);
    setBusinessId(String(script.businessId));
    setGreeting(script.greeting);
    setObjectionFlow(script.objectionFlow ?? "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setBusinessId("");
    setGreeting("");
    setObjectionFlow("");
  };

  if (isLoading) {
    return <p>Loading dialogue scripts...</p>;
  }

  if (error) {
    return <p>Failed to load dialogue scripts</p>;
  }

  return (
  <main className={styles.page}>
     <div className={styles.header}>
  <h1>Dialogue Scripts</h1>
  <p>Dialogue scripts found: {dialogueScripts?.length ?? 0}</p>
</div>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="businessId">Business</label>
          <select
            id="businessId"
            value={businessId}
            onChange={(event) => setBusinessId(event.target.value)}
            disabled={editingId !== null}
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

        <button type="submit" disabled={isCreating || isUpdating}>
          {editingId !== null
            ? isUpdating
              ? "Updating..."
              : "Update dialogue script"
            : isCreating
              ? "Creating..."
              : "Create dialogue script"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={handleCancelEdit}
            disabled={isUpdating}
          >
            Cancel
          </button>
        )}
      </form>

      {dialogueScripts && dialogueScripts.length > 0 ? (
  <ul className={styles.scriptList}>
    {dialogueScripts.map((script) => (
      <li key={script.id}>
        <strong>{script.greeting}</strong>

        <p>{script.objectionFlow ?? "No objection flow"}</p>

        <p>
          Business:{" "}
          {businesses?.find((business) => business.id === script.businessId)
            ?.name ?? "Unknown business"}
        </p>

        <button type="button" onClick={() => handleEdit(script)}>
          Edit
        </button>

        <button
          type="button"
          onClick={() => deleteDialogueScript(script.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </li>
    ))}
  </ul>
) : (
  <div className={styles.emptyState}>No dialogue scripts yet</div>
)}
    </main>
  );
}

export default DialogueScriptsPage;
