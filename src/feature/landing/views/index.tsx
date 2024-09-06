import React from "react";
import { ILandingPage } from "../interface";
import Landing from "./Landing";
import { fetchData, fetchMetadata } from "@/utils/FetchMetadata";

async function Index() {
  const res = await fetchMetadata();
  const features = await fetchData("/api/keyfeature?populate=*");
  return <Landing features={features} props={res} />;
}

export default Index;
