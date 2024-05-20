import { useState } from "react";
import { CancelIcon } from "../icons/Cancel";
import { DragIcon } from "../icons/Drag";

interface IVariables {
  variables: { name: string; type: string; expression: string }[];

  onVariableChangeCallback: (
    newVar: { name: string; type: string; expression: string }[]
  ) => void;
}

export function Variables({
  variables,
  onVariableChangeCallback: setVariables,
}: IVariables) {
  const variableTypeOptions: { label: string; key: string }[] = [
    { label: "String", key: "string" },
    { label: "Integer", key: "integer" },
    { label: "Boolean", key: "bool" },
    { label: "Floating point", key: "double" },
    { label: "Object", key: "object" },
    { label: "List", key: "list" },
    { label: "Dynamic", key: "dynamic" },
  ];
  const [displayAddVariable, setDisplayAddVariable] = useState(true);
  const [selectedVariable, setSelectedVariable] = useState<{
    name: string;
    type: string;
    expression: string;
  }>({ name: "", type: variableTypeOptions[0].key, expression: "" });
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        Variables
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Variables should comply with the expression syntax.
      </p>
      {displayAddVariable ? (
        <label
          className="relative text-sm cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          onClick={() => setDisplayAddVariable(false)}
        >
          + Add variables
        </label>
      ) : (
        <div
          className="flex my-2 gap-2 border border-gray-200 rounded-md shadow-sm bg-white px-2 py-3 justify-center"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setVariables([...variables, { ...selectedVariable }]);
              setSelectedVariable({
                name: "",
                type: variableTypeOptions[0].key,
                expression: "",
              });
              setDisplayAddVariable(true);
            }
          }}
        >
          <div className="flex-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="variable-name"
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setSelectedVariable({
                    ...selectedVariable,
                    name: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Type
            </label>
            <div className="mt-2">
              <select
                className="shadow-sm h-9 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 border-gray-200 block w-full px-1 rounded-md border-0"
                onChange={(e) => {
                  setSelectedVariable({
                    ...selectedVariable,
                    type: e.currentTarget.value,
                  });
                }}
              >
                {variableTypeOptions.map((eachVar, index: number) => (
                  <option
                    selected={index === 0}
                    key={index}
                    value={eachVar.key}
                  >
                    {eachVar.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-auto">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Expression
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="variable-expression"
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setSelectedVariable({
                    ...selectedVariable,
                    expression: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex-none gap-x-2">
            <div
              className="mt-2 block align cursor-pointer"
              onClick={() => setDisplayAddVariable(true)}
            >
              <CancelIcon className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
      {variables?.map((eachVar, index: number) => (
        <div className="flex my-2 gap-2 border border-gray-200 rounded-md shadow-sm bg-white px-1 py-3 justify-center">
          <div className="flex-none text-sm px-2">
            <DragIcon className="w-5 h-5 cursor-pointer" />
          </div>
          <div className="flex-[0.5] text-left text-sm italic">
            {eachVar.name}
          </div>
          <div className="flex-1 text-left text-sm">
            {variableTypeOptions.find((x) => x.key === eachVar.type)?.label}
          </div>
          <div className="flex-[2] text-sm">{eachVar.expression}</div>
          <div
            className="flex-none text-sm px-2"
            onClick={() =>
              setVariables(variables.filter((_, idx: number) => idx !== index))
            }
          >
            <CancelIcon className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      ))}
    </fieldset>
  );
}
