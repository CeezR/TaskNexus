const getJobs = async () => {
    try {
      const response = await fetch(`https://tasknexus.azurewebsites.net/api/jobs`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

export default async function Jobs(){
    const jobsResponse: ApiJobResponse | null = await getJobs();
    return(
      
        <div>
           <h1>Jobs</h1> 
           {jobsResponse?.jobList.map((job: Job) => {return <p>{job.name}</p>})}
        </div>
    )

}