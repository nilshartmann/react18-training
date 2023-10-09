import { useNavigate } from "react-router-dom";
import PostEditor from "./PostEditor";
import { useMutation } from "@tanstack/react-query";
import { savePost } from "./blog-api";

export default function PostEditorPage() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: savePost,
    onSuccess() {
      navigate("/");
    }
  });

  return <PostEditor onSavePost={newPost => mutate(newPost)} />;
}
