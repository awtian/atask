import "./App.css";

import { Button, Input, Spinner } from "@material-tailwind/react";
import UserList from "./components/UserList";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchData = () => {
    setIsLoading(true);
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
        />
        {/* button */}
        <Button
          className="w-full mt-4"
          disabled={search.length < 1}
          onClick={searchData}
        >
          Search
        </Button>
        {/* userList */}
        {isLoading ? (
          <div className="w-full flex justify-center mt-4">
            <Spinner className="h-12 w-12" />
          </div>
        ) : (
          <UserList />
        )}
      </div>
    </div>
  );
}

export default App;
