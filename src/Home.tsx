import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  let CancelToken: any;
  const searchChatRooms = async ({ searchQuery }: { searchQuery: string }) => {
    const api = `/your-api?query=${searchQuery}`;
    if (typeof CancelToken != typeof undefined) {
      CancelToken.cancel("Operation canceled due to new request.");
    }
    CancelToken = axios.CancelToken.source();
    try {
      const response = await axios.get(api, {
        cancelToken: CancelToken.token,
      });
      return response;
    } catch (error: any) {}
  };

  const { data: searchResults, refetch }: { data: any; refetch: any } =
    useQuery(
      ["name-for-query", searchQuery],
      () => searchChatRooms({ searchQuery }),
      {
        refetchOnWindowFocus: false,
        enabled: !!searchQuery,
      }
    );

  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery, refetch]);

  return (
    <>
      <input onChange={(e: any) => setSearchQuery(e.target.value)} />
      {searchQuery ? <>{searchResults}</> : null}
    </>
  );
};
