declare module "@realply/linkedin-posts" {
  export interface FakePost {
    id: string;
    author: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
  }

  const data: FakePost[];
  export default data;
}
