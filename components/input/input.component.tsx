import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";

const Input = () => {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EtEaemD9C_M2GVoWx_X5lgHaHa%26pid%3DApi&f=1"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200 ">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 "
            rows={2}
            placeholder="What's happening?"
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5 ">
          <div className="flex ">
            <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
          </div>
          <button className="bg-blue-400 text-white cursor-pointer px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default Input;
