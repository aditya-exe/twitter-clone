import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modal.atom";

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1>Comment Modal</h1>
      {open && <h1>Open</h1>}
    </div>
  )
}

export default CommentModal;