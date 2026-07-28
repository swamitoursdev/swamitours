import { fareRows } from "@/lib/cab-routes";

export default function FareTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-moss text-white">
            <th className="px-4 py-3 text-left font-medium">Vehicle Type</th>
            <th className="px-4 py-3 text-left font-medium">Capacity</th>
            <th className="px-4 py-3 text-left font-medium">One Way</th>
            <th className="px-4 py-3 text-left font-medium">Round Trip</th>
            <th className="px-4 py-3 text-left font-medium">Local (8hr/80km)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10 bg-white">
          {fareRows.map((row) => (
            <tr key={row.vehicle}>
              <td className="px-4 py-3 text-ink">{row.vehicle}</td>
              <td className="px-4 py-3 text-ink/70">{row.capacity}</td>
              <td className="px-4 py-3 text-ink/70">{row.oneWay}</td>
              <td className="px-4 py-3 text-ink/70">{row.roundTrip}</td>
              <td className="px-4 py-3 text-ink/70">{row.local}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}