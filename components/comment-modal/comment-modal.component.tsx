/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atom/modal.atom";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, doc, DocumentData, DocumentSnapshot, onSnapshot, serverTimestamp } from "firebase/firestore";
import Moment from "react-moment";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState<DocumentSnapshot<DocumentData>>();
  const { data: session } = useSession();
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const filePickerRef=useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId),
      (snapshot) => {
        setPost(snapshot);
      });
  }, [postId]);

  const sendComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: session?.user.name,
      username: session?.user.username,
      userImage: session?.user.image,
      timestamp: serverTimestamp(),
      userId: session?.user.uid,
    });

    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      {open && (
        <Modal isOpen={open} onRequestClose={() => setOpen(false)} className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md h-[300px] focus:ring-0">
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5 ">
              <div className="hoverEffect w-9 h-9 flex items-center justify-center">
                <XIcon onClick={() => setOpen(false)} className="h-[22px] text-gray-700" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img src={post?.data()?.userImage} alt={"user-img"} className="h-11 w-11 rounded-full mr-4" />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
              <span className="text-sm sm:text-[15px]">@{post?.data()?.username} - </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>
                  {post?.data()?.timestamp?.toDate()}
                </Moment>
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2 " >{post?.data()?.text}</p>
            <div className="flex border-b border-gray-200 p-3 space-x-3">
              <img
                src={session?.user?.image}
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y focus:ring-0 divide-gray-200 ">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 "
                    rows={2}
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between pt-2.5 ">
                  <div className="flex">
                    <div onClick={() => { if (filePickerRef !== null) filePickerRef.current?.click() }}>
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input type="file" hidden ref={filePickerRef} />
                    </div>
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button onClick={sendComment} disabled={!input.trim()} className="bg-blue-400 text-white cursor-pointer px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Reply</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CommentModal;