import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Transactions from "../components/Transactions";

const Home = () => {
  return (
    <>
      <Header />
      <Transactions />
      <Footer/>
    </>
  );
};

export default Home;
