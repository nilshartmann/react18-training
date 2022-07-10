import * as React from "react";

export default function Setup() {
  return <App />;
}

function User() {
  return (
    <div className="Container">
      <h2>User</h2>
      <p>Load User</p>
      <p>Refresh User</p>
    </div>
  );
}

function Sidebar() {
  const user = { content: null };

  return (
    <div className="Container">
      <h2>Add User in Sidebar</h2>
      {user ? <p>User in Sidebar: {user.content}</p> : null}
    </div>
  );
}

function Post() {
  return (
    <div className="Container">
      <h2>Post</h2>
      <p>TODO: Load Post</p>
    </div>
  );
}

function App() {
  const [view, setView] = React.useState<"user" | "post">("user");
  function toggleView() {
    setView(view === "user" ? "post" : "user");
  }

  return (
    <>
      <div className="Container">
        <button onClick={toggleView}>Open {view === "user" ? "Post" : "User"} View</button>
      </div>
      <div className="Container Flex">
        <div className="Main">
          {view === "user" && <User />}
          {view === "post" && <Post />}
        </div>
        {/* <Sidebar /> */}
      </div>
    </>
  );
}

/** Dummy data */
type Response = {
  entity: "user" | "post";
  id: string;
  content: string;
};

function newEntity(url: string): Response {
  if (url.endsWith("/user")) {
    return {
      entity: "user",
      id: `user_${requestNo}`,
      content: `This is a user, read from request ${requestNo} at ${new Date().toLocaleTimeString()}`
    };
  }
  return {
    entity: "post",
    id: `post_${requestNo}`,
    content: `This is a Blog Post, read from request ${requestNo} at ${new Date().toLocaleTimeString()}`
  };
}

/** Simulates fetch API */
let requestNo = 0;
function demoFetch(url: string): Promise<Response> {
  const myRequest = requestNo++;
  return new Promise(resolve => {
    setTimeout(() => resolve(newEntity(url)), 1000);
  });
}
