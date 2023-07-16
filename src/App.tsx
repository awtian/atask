import "./App.css";

import { Button, Input, Spinner } from "@material-tailwind/react";
import UserList from "./components/UserList";
import { Fragment, useState } from "react";
import axios from "axios";
import { userListType, getUsersResponseType } from "./global";

function App() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<userListType>();
  const [lastSearch, setLastSearch] = useState("");

  const searchData = async () => {
    try {
      setIsLoading(true);
      const { data }: getUsersResponseType = await axios.get(
        `https://api.github.com/search/users?q=${search}`
      );
      setSearchResult(data.items);
      setLastSearch(search);
    } catch (e) {
      alert("something went wrong with the github api");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="max-w-sm w-full py-6 px-4 bg-white">
        {/* input */}
        <Input
          size="md"
          label="Username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void searchData()}
        />
        {/* button */}
        <Button
          className="w-full mt-4"
          disabled={search.length < 1}
          onClick={() => void searchData()}
        >
          Search
        </Button>
        {/* userList */}
        {isLoading ? (
          <div className="w-full flex justify-center mt-4">
            <Spinner className="h-12 w-12" />
          </div>
        ) : (
          <Fragment>
            {searchResult && (
              <p className="text-left my-2">Showing users for "{lastSearch}"</p>
            )}
            <UserList users={searchResult} />
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default App;
