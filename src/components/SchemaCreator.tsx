import { useState } from "react";
import { LeftArrow } from "../icons/LeftIcon";

type schemaType = "STRING" | "BOOL" | "ARRAY" | "NUMBER" | "OBJECT";

const schemaTypeOptions: string[] = [
  "STRING",
  "BOOL",
  "ARRAY",
  "NUMBER",
  "OBJECT",
];

export interface iSchema {
  key?: string;
  type: schemaType;
  sub_type?: iSchema;
  items?: iSchema[];
}

interface iSchemaCreator {
  data?: iSchema;
  onChange: (data: iSchema) => void;
}

export function SchemaCreator({ data, onChange }: iSchemaCreator) {
  const [responseType, setResponseType] = useState("OBJECT");

  return (
    <>
      <SelectInitialField
        onChange={(responseType: schemaType) => {
          setResponseType(responseType);
          onChange({
            type: responseType,
            sub_type: responseType === "ARRAY" ? { type: "STRING" } : undefined,
          });
        }}
      />
      {["OBJECT", "ARRAY"].includes(responseType) ? (
        <>
          {data?.type === "OBJECT" ? (
            data?.items?.map((eachItem) => <Schema schema={eachItem} />)
          ) : (
            <Schema schema={data?.sub_type} sub_type={true} />
          )}
          {data !== null && responseType === "ARRAY" ? <></> : <AddField />}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function SelectInitialField({
  onChange,
}: {
  onChange: (responseType: schemaType) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div className="my-2">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Select response type
        </label>
        <div className="mt-2">
          <select
            onChange={(e) => {
              onChange(e.currentTarget.value as schemaType);
            }}
            className="shadow-sm h-9 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 border-gray-200 block w-full px-1 rounded-md border-0"
          >
            {schemaTypeOptions.map((eachType, index: number) => (
              <option
                selected={eachType === "OBJECT"}
                key={index}
                value={eachType}
              >
                {eachType}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function Schema({
  schema,
  sub_type = false,
}: {
  schema?: iSchema;
  sub_type?: boolean;
}) {
  return (
    <div className="relative text-sm bg-white">
      <div className="flex my-2 gap-2">
        {!sub_type && (
          <div className="flex-auto">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Key
            </label>

            <input
              type="text"
              name="header-key"
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={schema?.key}
            />
          </div>
        )}
        <div className="flex-auto">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            {sub_type ? "Array sub type" : "Type"}
          </label>
          <select className="shadow-sm h-9 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 border-gray-200 block w-full px-1 rounded-md border-0">
            {schemaTypeOptions.map((eachType, index: number) => (
              <option
                selected={schema?.type === eachType}
                key={index}
                value={eachType}
              >
                {eachType}
              </option>
            ))}
          </select>
        </div>
      </div>
      {schema?.items?.length && (
        <div className="flex">
          <div className="flex-[0.25] mt-8">
            <LeftArrow />
          </div>
          <div className="flex-auto mb-2">
            {schema?.items?.map((eachItem) => (
              <Schema schema={eachItem} />
            ))}
            <AddField />
          </div>
        </div>
      )}
      {schema?.sub_type && (
        <div className="flex">
          <div className="flex-[0.25] mt-8">
            <LeftArrow />
          </div>
          <div className="flex-auto mb-2">
            <Schema schema={schema.sub_type} sub_type={true} />
          </div>
        </div>
      )}
    </div>
  );
}

function AddField({ onClick }: { onClick?: () => void }) {
  return (
    <label
      onClick={onClick}
      className="relative text-sm cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
    >
      + Add field
    </label>
  );
}
