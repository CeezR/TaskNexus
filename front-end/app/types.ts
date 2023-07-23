type ApiJobResponse = {
    jobList: Job[]
}

type Job = {
    id: number | undefined,
    name: string | undefined,
    description: string | undefined,
    status: string | undefined

}

type ApiCompanyResponse = {
    companyList: Company[]
}

type Company = {
    id: number | undefined,
    name: string | undefined
}

type Employee = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
};

type EmployeeListResponse = {
    employeeList: Employee[];
};

type Crew = {
    id: number | undefined,
    name: string | undefined,
    employees?: Employee[] | undefined
}

type ApiCrewResponse = {
    crewList: Crew[]
}

type JobStatus = {
    color: string;
    id: string;
    label: string;
    value: number;
};

type Statbox = {
    subtitle: string;
    progress: number;
    title: string;
    increase: number;
};

type Dashboard = {
    jobStatus: JobStatus[];
    statbox: Statbox[]
}