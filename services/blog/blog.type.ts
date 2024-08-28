interface IBlogSchema {

    id: number,
    title: string,
    userId: number
    
  }

  export type TCreateBlog = Omit <IBlogSchema, "id">

  export type TBlogResponse = Partial <IBlogSchema>

  export type TModifyBlog = {
    id:string, 
    data: Omit<IBlogSchema, "id">
  }
 