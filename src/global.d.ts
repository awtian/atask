export type userType = {
  login: string;
  repos_url: string;
};

export type userListType = userType[] | undefined;

export type getUsersResponseType = {
  data: {
    items: userListType;
  };
};

export type repoCacheType = userReposType[];

export type userReposType = repoType[];

export type repoType = {
  name: string;
  description: string;
  stargazers_count: number;
};
