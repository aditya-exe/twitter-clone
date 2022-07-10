/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {EmojiHappyIcon, PhotographIcon} from "@heroicons/react/outline";
import {useSession, signOut} from "next-auth/react";
import {useState, useRef, ChangeEvent} from "react"
import {db, storage} from "../../firebase"
import {addDoc, collection, serverTimestamp, updateDoc, doc} from "firebase/firestore";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {XIcon} from "@heroicons/react/solid";

const Input = () => {
  const {data: session} = useSession();
  const [input, setInput] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const sendPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      userId: session?.user.uid,
      text: input,
      userImage: session?.user.image,
      timestamp: serverTimestamp(),
      name: session?.user.name,
      username: session?.user.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile !== undefined && selectedFile !== null) {
      // if (selectedFile.toString.length > 0) {
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
          })
        });
      }
    }

    setInput("");
    setSelectedFile("");
    setLoading(false);
  }

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files !== null) {
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result !== undefined) {
        setSelectedFile(readerEvent.target?.result);
      }
    }
  }

  const sO = () => {
    signOut();
  };

  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <img
            onClick={sO}
            src={session?.user?.image}
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
           alt={"user image"}/>
          <div className="w-full divide-y divide-gray-200 ">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 "
                rows={2}
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon className="h-5 text-black absolute cursor-pointer shadow-md border border-white m-1 rounded-full"
                       onClick={() => setSelectedFile("")}/>
                <img src={selectedFile} className={`${loading && "animate-pulse"}`} alt={"selected file"}/>
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5 ">
              {!loading && (
                <>
                  <div className="flex">
                    <div onClick={() => {
                      if (filePickerRef !== null) filePickerRef.current?.click()
                    }}>
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                      <input type="file" hidden ref={filePickerRef} onChange={(e) => addImageToPost(e)}/>
                    </div>
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                  </div>
                  <button onClick={sendPost} disabled={!input.trim()}
                          className="bg-blue-400 text-white cursor-pointer px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};

export default Input;
