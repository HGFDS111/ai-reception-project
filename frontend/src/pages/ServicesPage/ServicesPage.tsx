import { useGetBusinessesQuery } from "../../entities/business/businessApi";
import { useState, type FormEvent } from "react";
import {
  useGetServiceTemplatesQuery,
  useCreateServiceTemplateMutation,
} from "../../entities/serviceTemplate/serviceTemplateApi";

import {
  useCreateBusinessServiceMutation,
  useGetBusinessServicesQuery,
} from "../../entities/businessService/businessServiceApi";
import styles from "./ServicesPage.module.css";

function ServicesPage() {
  const {
    data: serviceTemplates,
    isLoading,
    error,
  } = useGetServiceTemplatesQuery();

  const { data: businesses } = useGetBusinessesQuery();

  const [createServiceTemplate, { isLoading: isCreating }] =
    useCreateServiceTemplateMutation();

  const [createBusinessService, { isLoading: isAddingService }] =
    useCreateBusinessServiceMutation();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [selectedServiceTemplateId, setSelectedServiceTemplateId] =
    useState("");
  const [price, setPrice] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const { data: businessServices } = useGetBusinessServicesQuery(
    Number(selectedBusinessId),
    {
      skip: !selectedBusinessId,
    },
  );

  const availableServiceTemplates = selectedBusinessId
    ? (serviceTemplates?.filter(
        (service) =>
          !businessServices?.some(
            (businessService) => businessService.id === service.id,
          ),
      ) ?? [])
    : [];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createServiceTemplate({
      title,
      category: category || null,
    }).unwrap();

    setTitle("");
    setCategory("");
  };
  const handleAddService = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createBusinessService({
      businessId: Number(selectedBusinessId),
      serviceTemplateId: Number(selectedServiceTemplateId),
      price: Number(price),
      customDescription: customDescription || null,
    }).unwrap();

    setSelectedServiceTemplateId("");
    setPrice("");
    setCustomDescription("");
  };

  if (isLoading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>Failed to load services</p>;
  }

  return (
    <section className={styles.page}>
     <div className={styles.header}>
  <h1>Services</h1>
  <p>Services found: {serviceTemplates?.length ?? 0}</p>
</div>
<div className={styles.formsGrid}>


      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.cardTitle}>Create service</h2>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Example: Dental Cleaning"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>
        <button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create service"}
        </button>
      </form>
      <form className={styles.card} onSubmit={handleAddService}>
        <h2 className={styles.cardTitle}>Assign service to business</h2>
        <div className={styles.field}>
          <label htmlFor="business">Business</label>
          <select
            id="business"
            value={selectedBusinessId}
            onChange={(event) => setSelectedBusinessId(event.target.value)}
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

        <div className={styles.field}>
  <label htmlFor="serviceTemplate">Service</label>
          <select
            id="serviceTemplate"
            value={selectedServiceTemplateId}
            onChange={(event) =>
              setSelectedServiceTemplateId(event.target.value)
            }
            required
          >
            <option value="">Select service</option>

            {availableServiceTemplates.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>

       <div className={styles.field}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="customDescription">Custom description</label>
          <input
            id="customDescription"
            type="text"
            value={customDescription}
            onChange={(event) => setCustomDescription(event.target.value)}
          />
        </div>
        <button type="submit" disabled={isAddingService}>
          {isAddingService ? "Adding..." : "Add service to business"}
        </button>
      </form>
</div>
      {selectedBusinessId && (
        <div className={styles.businessServices}>
          <h2 className={styles.sectionTitle}>Services for selected business</h2>

          {businessServices?.length ? (
  <ul>
    {businessServices.map((service) => (
      <li key={service.id}>
        {service.title} — {service.BusinessService.price}
      </li>
    ))}
  </ul>
) : (
  <p>No services assigned yet</p>
)}
        </div>
      )}

<h2 className={styles.sectionTitle}>Service templates</h2>

      <ul className={styles.serviceList}>
        {serviceTemplates?.map((service) => (          
          <li key={service.id}>
            {service.title} — {service.category ?? "No category"}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ServicesPage;
