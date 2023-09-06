import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

//If we ever want to fetch some data with next.js during the server side rendering process we will use this
//this function will be executed in the server
//I can reach this functions return values from the component props

//conext === { req, res } in Page Component
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);

  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default LandingPage;
