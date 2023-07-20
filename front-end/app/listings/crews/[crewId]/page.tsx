"use client";
import React, { useState, useEffect } from "react";
import CrewDisplay from "./CrewDisplay";

type Props = {
  params: {
    crewId: string;
  };
};

const page = (props: Props) => {
  return (
    <section>
      <CrewDisplay crewId={props.params.crewId} />
    </section>
  );
};

export default page;
