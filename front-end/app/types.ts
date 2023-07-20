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