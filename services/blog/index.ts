import { Api } from "../config";
import { TBlogResponse, TCreateBlog } from "./blog.type";

export namespace Blog {
  const path = "/posts";

  export const createBlog = async (
    data: Partial<TCreateBlog>
  ): Promise<TBlogResponse> => {
    return (await Api.post(path + "/add", data)).data;
  };
}
