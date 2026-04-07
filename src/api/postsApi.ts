import { Post } from "../types";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchedPosts = async (): Promise<Post[]> => {
  const response = await fetch(POSTS_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
