import { SparklesIcon } from "@heroicons/react/outline";
import Input from "../input/input.component";
import Post from "../post/post.component";

const Feed = () => {
  const posts = [
    {
      id: "1",
      name: "Aditya",
      username: "aditya1",
      userImg: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EtEaemD9C_M2GVoWx_X5lgHaHa%26pid%3DApi&f=1",
      img: "https://preview.redd.it/y2julru7g0871.jpg?width=960&crop=smart&auto=webp&s=c9e31404e555c2f627fada4733924538c6961788",
      text: "Noice",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      name: "Aditya",
      username: "aditya1",
      userImg: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EtEaemD9C_M2GVoWx_X5lgHaHa%26pid%3DApi&f=1F",
      img: "https://wallpaperaccess.com/full/3430.jpg",
      text: "wow",
      timestamp: "5 hours ago"
    }
  ]

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-xl sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky  top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className={"h-5"} />
        </div>
      </div>
      <Input />
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
