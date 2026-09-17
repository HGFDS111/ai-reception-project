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
    <main>
      <h1>Services</h1>
      <p>Services found: {serviceTemplates?.length ?? 0}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
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
      <form onSubmit={handleAddService}>
        <div>
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

        <div>
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

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>

        <div>
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

      {selectedBusinessId && (
        <div>
          <h2>Business services</h2>

          <ul>
            {businessServices?.map((service) => (
              <li key={service.id}>
                {service.title} — {service.BusinessService.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul>
        {serviceTemplates?.map((service) => (
          <li key={service.id}>
            {service.title} — {service.category ?? "No category"}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ServicesPage;
