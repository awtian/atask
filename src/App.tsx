import "./App.css";

import { Button, Input, Spinner } from "@material-tailwind/react";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="max-w-sm w-full py-6 px-4 bg-white">
        {/* input */}
        <Input size="md" label="Username" />
        {/* button */}
        <Button className="w-full mt-4">Search</Button>
        {/* Loading */}
        <div className="w-full flex justify-center mt-4">
          <Spinner className="h-12 w-12" />
        </div>
        {/* UserList */}
        <UserList />
      </div>
    </div>
  );
}

export default App;
