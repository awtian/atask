import "./App.css";

import { Button, Input, Spinner } from "@material-tailwind/react";
import UserList from "./components/UserList";
import { Fragment, useState } from "react";
import axios from "axios";

type User = {
  login: string;
  repos_url: string;
};

type UserList = User[] | undefined;

type getUsersResponse = {
  data: {
    items: UserList;
  };
};

function App() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<UserList>();
  const [lastSearch, setLastSearch] = useState("");

  const searchData = async () => {
    try {
      setIsLoading(true);
      const { data }: getUsersResponse = await axios.get(
        `https://api.github.com/search/users?q=${search}`
      );
      setSearchResult(data.items);
      setLastSearch(search);
    } catch (e) {
      console.log(e);
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
