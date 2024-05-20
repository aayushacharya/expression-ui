import { Headers } from "./Headers";

interface IRequestConfig {
  headers: { key: string; value: string }[];
  onHeaderChangeCallback: (
    newHeaders: { key: string; value: string }[]
  ) => void;
}

export function RequestConfig({
  headers,
  onHeaderChangeCallback,
}: IRequestConfig) {
  const contentTypeOptions: { label: string; key: string }[] = [
    { label: "JSON", key: "JSON" },
    { label: "XML", key: "XML" },
    { label: "Form Data", key: "FORMDATA" },
  ];
  const methodOptions: string[] = ["GET", "POST"];
  return (
    <div className="border-b border-gray-900/10 pb-2">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Request configuration
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        This section will be used to construct the HTTP request.
      </p>

      <div className="mt-6  gap-x-6 gap-y-8 ">
        <div className="flex pb-2 gap-4">
          <div className="flex-auto">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Url
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="url"
                  id="url"
                  className="block w-full border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="https://api.example.com"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Method
            </label>
            <div className="mt-2">
              <select
                id="method"
                name="httpmethod"
                className="block w-full h-9 rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {methodOptions.map((eachMethod) => (
                  <option selected={eachMethod === "POST"}>{eachMethod}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4 my-2">
          <div className="flex-auto">
            <div className="flex">
              <div className="flex-auto">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Payload expression
                </label>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="payload"
                  className="block w-full border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder='{"hello":"world"}'
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Content Type
            </label>
            <div className="mt-2">
              <select
                name="content_type"
                className="shadow-sm h-9 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 border-gray-200 block w-full px-1 rounded-md border-0"
              >
                {contentTypeOptions.map((eachType, index: number) => (
                  <option
                    selected={index === 0}
                    key={index}
                    value={eachType.key}
                  >
                    {eachType.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Headers
        headers={headers}
        onHeaderChangeCallback={onHeaderChangeCallback}
      />
    </div>
  );
}
