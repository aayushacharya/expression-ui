import { SchemaCreator, iSchema } from "./SchemaCreator";

interface iResponseConfig {
  data?: iSchema;
  onChange: (data: iSchema) => void;
}

export function ResponseConfig({ data, onChange }: iResponseConfig) {
  const contentTypeOptions: { label: string; key: string }[] = [
    { label: "JSON", key: "JSON" },
    { label: "XML", key: "XML" },
    { label: "Text", key: "TEXT" },
  ];
  return (
    <div className="border-b border-gray-900/10 pb-2">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Response configuration
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        This section will be used to marshal the HTTP response.
      </p>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="my-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Content Type
          </label>
          <div className="mt-2">
            <select
              name="response_content_type"
              className="shadow-sm h-9 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 border-gray-200 block w-full px-1 rounded-md border-0"
            >
              {contentTypeOptions.map((eachType, index: number) => (
                <option selected={index === 0} key={index} value={eachType.key}>
                  {eachType.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="my-2">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Schema
        </label>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Add the response format of the HTTP request.
        </p>
        <SchemaCreator data={data} onChange={onChange} />
      </div>
    </div>
  );
}
