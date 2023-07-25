type ApiJobResponse = {
    jobList: Job[]
}

type Job = {
    id: number | undefined,
    name: string | undefined,
    description: string | undefined,
    status: string | undefined,
    company: Company | undefined,
    crew: Crew | undefined
}

type JobRequest = {
    id: number | undefined,
    name: string | undefined,
    description: string | undefined,
    status: string | undefined,
    companyId: number | undefined,
    crewId: number | undefined
}

type ApiCompanyResponse = {
    companyList: Company[]
}

type Company = {
    id: number | undefined,
    name: string | undefined
    jobs?: Job[] | undefined
}

type Employee = {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    createdDate: string | undefined;
    crew: Crew | undefined;
};

type EmployeeRequest = {
    name: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    crewId: number | undefined;
};

type EmployeeListResponse = {
    employeeList: Employee[];
};

type JobListResponse = {
    jobList: Job[];
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