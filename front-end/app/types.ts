type ApiJobResponse = {
    jobList: Job[]
}

type Job = {
    id: number | undefined,
    name: string | undefined
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