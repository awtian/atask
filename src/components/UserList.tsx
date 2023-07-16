import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";

import UserRepo from "./UserList/UserRepo";

import {
  userListType,
  userType,
  repoCacheType,
  userReposType,
} from "../global";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function UserList({ users }: { users: userListType }) {
  const [open, setOpen] = useState(-1);
  const [repoCache, setRepoCache] = useState<repoCacheType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = async (value: number): Promise<void> => {
    setOpen(open === value ? -1 : value);
    if (users && value > -1 && !repoCache[value]) {
      try {
        setIsLoading(true);
        const resp: { data: userReposType } = await axios.get(
          users[value].repos_url
        );
        const userRepos = resp.data;
        const newRepoCache = repoCache.slice(0);
        newRepoCache[value] = userRepos;
        setRepoCache(newRepoCache);
      } catch (error) {
        alert("something went wrong with the github api");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Fragment>
      {users &&
        users.map((each: userType, i: number) => {
          return (
            <Accordion
              key={`user-${i}}`}
              open={open === i}
              icon={<Icon id={i} open={open} />}
            >
              <AccordionHeader onClick={() => void handleOpen(i)}>
                {each.login}
              </AccordionHeader>
              <AccordionBody>
                {isLoading ? (
                  <div className="w-full flex justify-center mt-4">
                    <Spinner className="h-12 w-12" />
                  </div>
                ) : (
                  (repoCache[i] &&
                    repoCache[i].map((each, idx) => (
                      <UserRepo
                        key={`repo-${idx}`}
                        title={each.name}
                        description={each.description}
                        stars={each.stargazers_count}
                      />
                    ))) ||
                  ""
                )}
              </AccordionBody>
            </Accordion>
          );
        })}
    </Fragment>
  );
}
