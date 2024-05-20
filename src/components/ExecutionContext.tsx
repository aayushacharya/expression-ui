import { SystemParameters } from "./SystemParameters";
import { Variables } from "./Variables";

interface IExecutionContext {
  systemInput: string[];
  variables: { name: string; type: string; expression: string }[];
  onSystemInputChangeCallback: (newInput: string[]) => void;
  onVariableChangeCallback: (
    newVar: { name: string; type: string; expression: string }[]
  ) => void;
}

export function ExecutionContext({
  systemInput,
  variables,
  onSystemInputChangeCallback,
  onVariableChangeCallback,
}: IExecutionContext) {
  return (
    <div className="border-b border-gray-900/10 pb-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Execution Context
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Select the input parameters you would like in the execution context.
      </p>
      <div className="mt-5 space-y-5">
        <SystemParameters
          systemInput={systemInput}
          onSystemInputChangeCallback={onSystemInputChangeCallback}
        />
        <Variables
          variables={variables}
          onVariableChangeCallback={onVariableChangeCallback}
        />
      </div>
    </div>
  );
}
