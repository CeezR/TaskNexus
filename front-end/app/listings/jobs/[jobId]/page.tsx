"use client";
import React, { useState, useEffect } from "react";
import JobDisplay from "./JobDisplay";

type Props = {
  params: {
    jobId: string;
  };
};

const page = (props: Props) => {
  return (
    <section>
      <JobDisplay jobId={props.params.jobId} />
    </section>
  );
};

export default page;
