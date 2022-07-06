/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { SearchIcon } from "@heroicons/react/outline"
import { useState } from "react"
import News from "../news/news.component"

interface WidgetsProps {
  newsResults: [
    articles: {
      title: string
    }
  ]
  randomUsers: [{
    name: {
      first: string;
      last: string;
    },
    login: {
      username: string;
    },
    picture: {
      thumbnail: string;
    }
  }
  ]
}

const Widgets: React.FC<WidgetsProps> = ({ newsResults, randomUsers }) => {
  const [articleNum, setArticleNum] = useState(3)
  const [userNum, setUserNum] = useState(3)

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full bg-red-300 relative">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100" type="text" placeholder="Search Twitter" />
        </div>
      </div>

      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4 ">What's happening</h4>
        {newsResults.slice(0, articleNum).map((article: { title: string }) => (
          <News key={article.title} article={article} />
        ))}
        <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400" onClick={() => setArticleNum(articleNum + 3)}>Show more</button>
      </div>

      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {randomUsers.slice(0, userNum).map((user: { login: { username: string }; picture: { thumbnail: string }; name: { first: string; last: string } }) => (
          <div key={user.login.username} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
            <img src={user.picture.thumbnail} width="40" className="rounded-full" alt="user-image" />
            <div className="truncate ml-4 leading-5">
              <h4 className="font-bold hover:underline text-[14px] truncate" >{user.login.username}</h4>
              <h5 className="text-[13px] text-gray-500 truncate">{user.name.first + " " + user.name.last}</h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Follow</button>
          </div>
        ))}
        <button className="text-blue-300 pl-4 pb-3 hover:text-blue-400" onClick={() => setUserNum(userNum + 3)} >Show more</button>
      </div>

    </div>
  )
}

export default Widgets