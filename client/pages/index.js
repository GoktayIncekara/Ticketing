import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

//If we ever want to fetch some data with next.js during the server side rendering process we will use this
//this function will be executed in the server
//I can reach this functions return values from the component props

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    //we are on the server
    //http://SERVICENAME.NAMESPACE.svc.cluster.local
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );

    return data;
  } else {
    //we are on the browser
    const response = await axios.get("/api/users/currentuser").catch((err) => {
      console.log(err.message);
    });
    return response.data;
  }
};

export default LandingPage;
