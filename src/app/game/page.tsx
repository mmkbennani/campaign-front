"use client";
import React , { Suspense, useContext }from "react";
import { DataContext } from '@/contexts/data-provider';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import 'dotenv/config';
import { PixelStreamingWithWeb3 } from "./PixelStreamingWithWeb3";

const CardsProject: React.FC = () => {

  const {
    account: { isOwner: contextIsOwner, isConnected },
    data: { eventLogs, getCampaignCount, deployedCampaigns: contextDeployedCampaigns },
  } = useContext(DataContext);


  return (
    
    <PixelStreamingWithWeb3/>
  );
};

export default CardsProject;
