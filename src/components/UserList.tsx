import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Spinner,
} from "@material-tailwind/react";
import axios, { AxiosResponse } from "axios";

import UserRepo from "./UserList/UserRepo";
type User = {
  login: string;
  repos_url: string;
};

type UserList = User[] | undefined;

type getRepoResponse = {
  data: repoType;
};

type repoListType = repoType[];

type repoType = {
  name: string;
  description: string;
  stargazers_count: number;
};

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

export default function UserList({ users }: { users: UserList }) {
  const [open, setOpen] = useState(-1);
  const [repoList, setRepoList] = useState<repoListType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = async (value: number): Promise<void> => {
    setOpen(open === value ? -1 : value);
    if (users && value > -1 && !repoList[value]) {
      try {
        setIsLoading(true);
        const resp = await axios.get<{ data: repoType[] }>(
          users[value].repos_url
        );
        const userRepo = resp.data;
        const newRepoList: repoListType = repoList;
        newRepoList[value] = userRepo;
        setRepoList(newRepoList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Fragment>
      {users &&
        users.map((each, i) => {
          return (
            <Accordion open={open === i} icon={<Icon id={i} open={open} />}>
              <AccordionHeader onClick={() => void handleOpen(i)}>
                {each.login}
              </AccordionHeader>
              <AccordionBody>
                {isLoading ? (
                  <div className="w-full flex justify-center mt-4">
                    <Spinner className="h-12 w-12" />
                  </div>
                ) : (
                  repoList[i] &&
                  repoList[i].map((each, idx) => (
                    <UserRepo
                      key={`repo-${idx}`}
                      title={each.name}
                      description={each.description}
                      stars={each.stargazers_count}
                    />
                  ))
                )}
              </AccordionBody>
            </Accordion>
          );
        })}
    </Fragment>
  );
}
