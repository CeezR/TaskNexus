"use client";
import React, { useState, useEffect } from "react";
import CompanyDisplay from "./CompanyDisplay";

type Props = {
  params: {
    companyId: string;
  };
};

const page = (props: Props) => {
  return (
    <section>
      <CompanyDisplay companyId={props.params.companyId} />
    </section>
  );
};

export default page;