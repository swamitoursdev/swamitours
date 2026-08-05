import { fareRows } from "@/lib/cab-routes";

function withRowSpans(rows: typeof fareRows) {
  return rows.map((row, i) => {
    const isFirst = i === 0 || rows[i - 1].category !== row.category;
    let rowSpan = 0;
    if (isFirst) {
      let j = i;
      while (j < rows.length && rows[j].category === row.category) {
        rowSpan++;
        j++;
      }
    }
    return { ...row, isFirst, rowSpan };
  });
}

export default function FareTable() {
  const rows = withRowSpans(fareRows);

  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-moss text-white">
            <th className="px-4 py-3 text-left font-medium">Category</th>
            <th className="px-4 py-3 text-left font-medium">Vehicles</th>
            <th className="px-4 py-3 text-left font-medium">Rate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10 bg-white">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.isFirst && (
                <td
                  rowSpan={row.rowSpan}
                  className="px-4 py-3 text-ink font-semibold align-top border-r border-ink/10 bg-moss/5"
                >
                  {row.category}
                </td>
              )}
              <td className="px-4 py-3 text-ink/70">{row.vehicles}</td>
              <td className="px-4 py-3 text-ink/70 whitespace-nowrap">{row.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}