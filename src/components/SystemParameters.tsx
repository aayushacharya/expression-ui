import { useState } from "react";

interface ISystemParameters {
  systemInput: string[];
  onSystemInputChangeCallback: (newInput: string[]) => void;
}

export function SystemParameters({
  systemInput,
  onSystemInputChangeCallback: setSystemInput,
}: ISystemParameters) {
  const systemInputOptions: { label: string; key: string }[] = [
    { label: "Transaction Amount", key: "txn_amount" },
    { label: "Customer Account No.", key: "customer_acc" },
    { label: "Merchant Account No.", key: "merchant_acc" },
  ];
  const [displayAddInput, setDisplayAddInput] = useState(true);
  const [selectedSystemInput, setSelectedSystemInput] = useState("txn_amount");
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        System parameters
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        System parameters will be populated with their respective values.
      </p>
      {displayAddInput || systemInput.length === systemInputOptions.length ? (
        <label
          className="relative text-sm cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          onClick={() => setDisplayAddInput(false)}
        >
          {systemInput.length === systemInputOptions.length ? (
            <span className="relative text-sm cursor-not-allowed bg-white font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-500 ">
              All parameters already added
            </span>
          ) : (
            "+ Add input"
          )}
        </label>
      ) : (
        <div className="flex gap-x-6 items-center">
          <select
            name="systemInputParam"
            className="block w-full rounded-md px-1 my-3 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            onChange={(e) => {
              return setSelectedSystemInput(e.currentTarget.value);
            }}
          >
            {systemInputOptions
              .filter((eachInput) => !systemInput.includes(eachInput.key))
              .map((eachOption: { label: string; key: string }) => (
                <option id={eachOption.key} value={eachOption.key}>
                  {eachOption.key} - {eachOption.label}
                </option>
              ))}
          </select>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              const data =
                selectedSystemInput !== ""
                  ? selectedSystemInput
                  : systemInputOptions.filter(
                      (eachInput) => !systemInput.includes(eachInput.key)
                    )[0]?.key;
              if (data !== undefined) {
                setSystemInput([...systemInput, data]);
                setSelectedSystemInput("");
                setDisplayAddInput(true);
              }
            }}
          >
            <span className="text-sm font-semibold text-white ">Save</span>
          </button>
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => setDisplayAddInput(true)}
          >
            Cancel
          </button>
        </div>
      )}

      {systemInput.map((eachInputLabel) => {
        const data: { label: string; key: string } | undefined =
          systemInputOptions.find((x) => x.key === eachInputLabel);
        return (
          <div className="flex my-2 gap-2 border border-gray-200 rounded-md shadow-sm bg-white px-1 py-3 justify-center">
            <div className="flex-none text-sm px-2">
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            <div className="flex-auto text-sm italic">{data?.key}</div>
            <div className="flex-auto text-sm">{data?.label}</div>
            <div
              className="flex-none text-sm px-2"
              onClick={() =>
                setSystemInput(systemInput.filter((x) => x !== data?.key))
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
        );
      })}
    </fieldset>
  );
}
