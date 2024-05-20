import { useState } from "react";

interface IHeaders {
  headers: { key: string; value: string }[];
  onHeaderChangeCallback: (
    newHeaders: { key: string; value: string }[]
  ) => void;
}

export function Headers({
  headers,
  onHeaderChangeCallback: setHeaders,
}: IHeaders) {
  const [displayAddHeader, setDisplayAddHeader] = useState(true);
  const [selectedHeader, setSelectedHeader] = useState<{
    key: string;
    value: string;
  }>({ key: "", value: "" });
  return (
    <div className="my-5">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Headers
      </label>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Add the HTTP headers for the request.
      </p>
      {displayAddHeader ? (
        <label
          className="relative text-sm cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          onClick={() => setDisplayAddHeader(false)}
        >
          + Add headers
        </label>
      ) : (
        <div
          className="flex my-2 gap-2 border border-gray-200 rounded-md shadow-sm bg-white px-2 py-3 justify-center"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setHeaders([...headers, { ...selectedHeader }]);
              setSelectedHeader({
                key: "",
                value: "",
              });
              setDisplayAddHeader(true);
            }
          }}
        >
          <div className="flex-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Key
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="header-key"
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setSelectedHeader({
                    ...selectedHeader,
                    key: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex-auto">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Value
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="header-value"
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setSelectedHeader({
                    ...selectedHeader,
                    value: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex-none gap-x-2">
            <div
              className="mt-2 block align cursor-pointer"
              onClick={() => setDisplayAddHeader(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      {headers?.map((eachHeader, index: number) => (
        <div className="flex my-2 px-3 gap-6 border border-gray-200 rounded-md shadow-sm bg-white py-3 justify-center">
          <div className="flex-auto text-sm italic">{eachHeader.key}</div>
          <div className="flex-auto text-sm overflow-hidden truncate">
            {eachHeader.value}
          </div>
          <div
            className="flex-none text-sm px-2"
            onClick={() =>
              setHeaders(headers.filter((_, idx: number) => idx !== index))
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
