import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ReactQueryPage = () => {
  const fetchPost = () => {
    return axios.get("http://localhost:3004/posts");
  };

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    retry: 1,
    select: (data) => {
      return data.data;
    },
    //Garbage collect time 쓰레기 데이터를 정리
    gcTime: 5000,
  });

  console.log("ddd", isLoading, data);
  console.log("error", isError, error);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {data.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
};

export default ReactQueryPage;
