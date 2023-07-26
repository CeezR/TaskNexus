package dev.braintrain.backend.dashboard;

import dev.braintrain.backend.company.Company;
import dev.braintrain.backend.company.CompanyRepository;
import dev.braintrain.backend.crew.Crew;
import dev.braintrain.backend.crew.CrewRepository;
import dev.braintrain.backend.employee.Employee;
import dev.braintrain.backend.employee.EmployeeRepository;
import dev.braintrain.backend.job.Job;
import dev.braintrain.backend.job.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    CrewRepository crewRepository;
    CompanyRepository companyRepository;
    JobRepository jobRepository;

    EmployeeRepository employeeRepository;

    @Autowired
    public DashboardController(
            CrewRepository crewRepository,
            CompanyRepository companyRepository,
            JobRepository jobRepository,
            EmployeeRepository employeeRepository
    ){
        this.crewRepository =crewRepository;
        this.jobRepository = jobRepository;
        this.employeeRepository = employeeRepository;
        this.companyRepository = companyRepository;
    }
    @GetMapping
    public ResponseEntity<Map<String, Object>> getStatBoxData() {

        // Get the count of companies, crews, employees, and jobs
        List<Company> companies = companyRepository.findAll();
        List<Crew> crews= crewRepository.findAll();
        List<Employee> employees = employeeRepository.findAllEmployees();
        List<Job> jobs = jobRepository.findAll();

        // Get the count of companies, crews, employees, and jobs
        long companyCount = companies.size();
        long crewCount = crews.size();
        long employeeCount = employees.size();
        long jobCount = jobs.size();

        // Calculate the previous day's count for each entity
        long previousCompanyCount = getPreviousDayCount(companies);
        long previousCrewCount = getPreviousDayCount(crews);
        long previousEmployeeCount = getPreviousDayCount(employees);
        long previousJobCount = getPreviousDayCount(jobs);

        double companyIncrease = companyCount - previousCompanyCount;
        double crewIncrease = crewCount - previousCrewCount;
        double employeeIncrease = employeeCount - previousEmployeeCount;
        double jobIncrease = jobCount - previousJobCount;

        double companyPercentIncrease = (previousCompanyCount != 0) ? (companyIncrease / previousCompanyCount)  : 0;
        double crewPercentIncrease = (previousCrewCount != 0) ? (crewIncrease / previousCrewCount)  : 0;
        double employeePercentIncrease = (previousEmployeeCount != 0) ? (employeeIncrease / previousEmployeeCount)  : 0;
        double jobPercentIncrease = (previousJobCount != 0) ? (jobIncrease / previousJobCount)  : 0;

        List<Object> statBoxList = new ArrayList<Object>();
        statBoxList.add(getStatBoxItemData("Company", "Increase/Day", companyPercentIncrease, companyIncrease));
        statBoxList.add(getStatBoxItemData("Crew", "Increase/Day", crewPercentIncrease, crewIncrease));
        statBoxList.add(getStatBoxItemData("Employee", "Increase/Day", employeePercentIncrease, employeeIncrease));
        statBoxList.add(getStatBoxItemData("Job", "Increase/Day", jobPercentIncrease, jobIncrease));

        Map<String, Object> response= new HashMap<>();
        response.put("statbox", statBoxList);


        long jobsInProgressCount = jobs.stream().filter(job -> job.getStatus().equalsIgnoreCase("In progress")).count();
        long jobsCompletedCount = jobs.stream().filter(job -> job.getStatus().equalsIgnoreCase("Completed")).count();
        long jobsToBeCompleted = jobs.stream().filter(job -> job.getStatus().equalsIgnoreCase("Not Assigned")).count();
        List<Map<String, Object>> jobsData = new ArrayList<>();
        jobsData.add(getJobStatusData("In-progress", "In progress", jobsInProgressCount));
        jobsData.add(getJobStatusData("Completed", "Completed", jobsCompletedCount));
        jobsData.add(getJobStatusData("Not Assigned", "Not Assigned", jobsToBeCompleted));

        response.put("jobStatus", jobsData);

        return ResponseEntity.ok(response);
    }

    private Map<String, Object> getStatBoxItemData(String title, String subtitle, double progress, double increase) {
        Map<String, Object> itemData = new HashMap<>();
        itemData.put("title", title);
        itemData.put("subtitle", subtitle);
        itemData.put("progress", progress);
        itemData.put("increase", increase);
        return itemData;
    }


    private long getPreviousDayCount(List<?> entities) {
        // Calculate the previous day's count for the specified entities
        Date currentDate = new Date();
        Date previousDate = calculatePreviousDate(currentDate);

        return entities.stream()
                .filter(entity -> {
                    Date createdDate = getCreatedDateFromEntity(entity);
                    return createdDate != null && createdDate.after(previousDate) && createdDate.before(currentDate);
                })
                .count();
    }

    private Date getCreatedDateFromEntity(Object entity) {
        if (entity instanceof Employee) {
            return ((Employee) entity).getCreatedDate();
        } else if (entity instanceof Crew) {
            return ((Crew) entity).getCreatedDate();
        } else if (entity instanceof Job) {
            return ((Job) entity).getCreatedDate();
        } else if (entity instanceof Company) {
            return ((Company) entity).getCreatedDate();
        } else {
            throw new IllegalArgumentException("Invalid entity type.");
        }
    }

    private Date calculatePreviousDate(Date currentDate) {
        LocalDate localDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate previousDate = localDate.minusDays(1);
        return Date.from(previousDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    private Map<String, Object> getJobStatusData(String id, String label, long value) {
        Map<String, Object> itemData = new HashMap<>();
        itemData.put("id", id);
        itemData.put("label", label);
        itemData.put("value", value);
        return itemData;
    }
}
