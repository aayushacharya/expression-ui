interface IOutput {
  variables: { name: string; value: any }[];
}

export function Output({ variables }: IOutput) {
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Output variables
      </h2>
      <p className="my-1 text-sm leading-6 text-gray-600">
        This section will display evaluated output variables.
      </p>
      {variables.length > 0 ? (
        <table className="table-auto border-collapse text-sm">
          <thead className="text-left">
            <tr>
              <th className="px-2">Name</th>
              <th className="px-2">Value</th>
            </tr>
          </thead>
          <tbody className="border-slate-50">
            {variables.map((value) => {
              return (
                <tr className="text-sm leading-6 text-gray-600">
                  <td className="px-2">{value.name}</td>
                  <td className="px-2 overflow-hidden break-all">{`${JSON.stringify(
                    value.value
                  )}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}
