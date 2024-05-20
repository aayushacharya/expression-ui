import { useState } from "react";
import { ExecutionContext } from "./components/ExecutionContext";
import { RequestConfig } from "./components/RequestConfig";
import { ResponseConfig } from "./components/ResponseConfig";
import { Output } from "./components/Output";
import { iSchema } from "./components/SchemaCreator";

export default function App() {
  const [systemInput, setSystemInput] = useState<string[]>([]);
  console.log(dms_converter(-79.212, "lon"));
  const [variables, setVariables] = useState<
    { name: string; type: string; expression: string }[]
  >([]);
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [output, setOutput] = useState<{ name: string; value: any }[]>([]);
  const [responseSchema, setResponseSchema] = useState<iSchema>({
    type: "OBJECT",
    items: [
      {
        key: "root",
        type: "OBJECT",
        items: [
          {
            key: "firstName",
            type: "STRING",
          },
          {
            key: "state",
            type: "STRING",
          },
          {
            key: "roles",
            type: "ARRAY",
            sub_type: {
              type: "STRING",
            },
          },
        ],
      },
    ],
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    const selectedHeaders: { [key: string]: string } = {};
    headers.forEach((header) => (selectedHeaders[header.key] = header.value));

    const response = await fetch("http://localhost:1323/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request_config: {
          url: target.url.value as string,
          method: target.httpmethod.value as string,
          payload:
            (target.payload.value as string) === ""
              ? undefined
              : (target.payload.value as string),
          content_type: target.content_type.value as string,
          headers: selectedHeaders,
        },
        custom_variables: variables.map(
          ({
            name,
            type,
            expression,
          }: {
            name: string;
            type: string;
            expression: string;
          }) => {
            return {
              slug: name,
              type: type.toUpperCase(),
              expression: expression,
            };
          }
        ),
        system_variables: systemInput.map((value: string) => {
          return { slug: value };
        }),
        response_config: {
          content_type: target.response_content_type.value as string,
          schema: responseSchema,
        },
      }),
    });
    const data = await response.json();
    setOutput(
      Object.keys(data).map((key) => {
        return { name: key, value: data[key] };
      })
    );
  };
  return (
    <div className="flex w-full justify-center ">
      <form
        className="content-center max-w-[500px] px-8 pt-6 pb-8 mb-4 self-center border border-red my-10"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          <ExecutionContext
            systemInput={systemInput}
            onSystemInputChangeCallback={(newInput: string[]) =>
              setSystemInput(newInput)
            }
            variables={variables}
            onVariableChangeCallback={(
              newVar: { name: string; type: string; expression: string }[]
            ) => setVariables(newVar)}
          />

          <RequestConfig
            headers={headers}
            onHeaderChangeCallback={(
              newHeader: { key: string; value: string }[]
            ) => setHeaders(newHeader)}
          />

          <ResponseConfig
            data={responseSchema}
            onChange={(newData) => setResponseSchema(newData)}
          />
          <Output variables={output} />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

const dms_converter = (
  decimal_degrees: number,
  degree_type: "lat" | "lon" = "lat"
) => {
  const degrees = Math.floor(Math.abs(decimal_degrees));
  const minutes =
    (Math.abs(decimal_degrees) - Math.floor(Math.abs(decimal_degrees))) * 60;
  const seconds = (minutes - Math.floor(minutes)) * 60;
  const degree_indices = [degrees, Math.floor(minutes), seconds];
  const degree_symbols = [`°`, `'`, `"`];
  let direction = decimal_degrees > 0 ? "E" : "W";
  if (degree_type === "lon") {
    direction = decimal_degrees > 0 ? "N" : "S";
  }
  let result = `${degree_indices[0]}${degree_symbols[0]}`;
  for (let index = 1; index < degree_indices.length; index++) {
    if (degree_indices[index] === 0.0) {
      break;
    }
    result += `${fix(degree_indices[index])}${degree_symbols[index]}`;
  }
  result += direction;
  return result;
};

const fix = (num: number): string => {
  if (Math.abs(num - Math.floor(num)) > 0.01) {
    return num.toFixed(2);
  }
  return `${Math.floor(num)}`;
};
