import { useState, type FormEvent } from "react";
import {
  useGetBusinessesQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useDeleteBusinessMutation,
} from "../../entities/business/businessApi";

function BusinessesPage() {
  const { data: businesses, isLoading, error } = useGetBusinessesQuery();
  const [createBusiness, { isLoading: isCreating }] =
    useCreateBusinessMutation();
  const [updateBusiness, { isLoading: isUpdating }] =
    useUpdateBusinessMutation();
  const [deleteBusiness, { isLoading: isDeleting }] =
    useDeleteBusinessMutation();

  const [name, setName] = useState("");
  const [type, setType] = useState<"dental" | "hotel" | "repair_shop">(
    "dental",
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingId !== null) {
      await updateBusiness({
        id: editingId,
        name,
        type,
      }).unwrap();

      setEditingId(null);
      setName("");

      return;
    }

    await createBusiness({
      name,
      type,
    }).unwrap();

    setName("");
  };

  const handleEdit = (business: {
    id: number;
    name: string;
    type: "dental" | "hotel" | "repair_shop";
  }) => {
    setEditingId(business.id);
    setName(business.name);
    setType(business.type);
  };

  const handleCancelEdit = () => {
  setEditingId(null);
  setName("");
  setType("dental");
};

  if (isLoading) {
    return <p>Loading businesses...</p>;
  }

  if (error) {
    return <p>Failed to load businesses</p>;
  }

  return (
    <main>
      <h1>Businesses</h1>
      <p>Businesses found: {businesses?.length ?? 0}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(event) =>
              setType(event.target.value as "dental" | "hotel" | "repair_shop")
            }
          >
            <option value="dental">Dental</option>
            <option value="hotel">Hotel</option>
            <option value="repair_shop">Repair shop</option>
          </select>
        </div>
        <button type="submit" disabled={isCreating || isUpdating}>
          {editingId !== null
            ? isUpdating
              ? "Updating..."
              : "Update business"
            : isCreating
              ? "Creating..."
              : "Create business"}
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
      <ul>
        {businesses?.map((business) => (
          <li key={business.id}>
            {business.name} — {business.type}
            <button type="button" onClick={() => handleEdit(business)}>
              Edit
            </button>
            <button
              type="button"
              onClick={() => deleteBusiness(business.id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default BusinessesPage;
