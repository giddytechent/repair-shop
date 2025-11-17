import TicketSearch from "@/app/(rs)/tickets/TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "@/app/(rs)/tickets/TicketTable";

export const metadata = {
  title: "Ticket Search",
};

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    // query defult results
    const results = await getOpenTickets();

    return (
      <>
        <TicketSearch />
        {results.length ? <TicketTable data={results} /> : <p className="mt-4">No open tickets found</p>}
      </>
    );
  }

  // query search results
  const results = await getTicketSearchResults(searchText);

  // return search results
  return (
    <>
      <TicketSearch />
      {results.length ? <TicketTable data={results} /> : <p className="mt-4">No results found</p>}
    </>
  );
}
