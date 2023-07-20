"use client";
import EmployeeDisplay from "./EmployeeDisplay";

type Props = {
  params: {
    employeeId: string;
  };
};

const page = (props: Props) => {
  return (
    <section>
      <EmployeeDisplay employeeId={props.params.employeeId} />
    </section>
  );
};

export default page;
