import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline"

const Post: React.FC<any> = ({ post }) => {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      <img src={post.userImg} alt={"user-img"} className="h-11 w-11 rounded-full mr-4" />
      <div>
        <div className="flex items-center justify-between ">
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.name}</h4>
            <span className="text-sm sm:text-[15px]">@{post.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">{post.timestamp}</span>
          </div>
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">{post.text}</p>
        <img className="rounded-2xl mr-2" src={post.img} />
        <div className="flex justify-between text-gray-500">
          <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>


  )
}

export default Post