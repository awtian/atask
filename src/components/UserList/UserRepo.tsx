import { Card, CardBody, Typography } from "@material-tailwind/react";

type UserRepoProps = {
  title: string;
  description: string;
  stars: number;
};

export default function UserRepo(props: UserRepoProps) {
  return (
    <Card className="w-full border-gray-100 border-solid border text-left my-2 h-36">
      <CardBody>
        <div className="flex justify-between">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.title}
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 flex items-center"
          >
            {props.stars}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </Typography>
        </div>
        <Typography className="text-sm overflow-y-auto">
          {props.description}
        </Typography>
      </CardBody>
    </Card>
  );
}
