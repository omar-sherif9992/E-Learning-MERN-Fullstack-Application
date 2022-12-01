import usePostQuery from "@/hooks/usePostQuery";
import { InstructorRoutes } from "@/services/axios/dataServices/InstructorDataService";
import { postRequest } from "@/services/axios/http-verbs";
import { useQuery } from "@tanstack/react-query";


async function useDiscountQuery(endDate : string, percent : number)
{
  const Courses = InstructorRoutes.POST.addDiscount;

  Courses.URL = 'courses/637a0118301cbd719dff5fe6/discount';

  Courses.payload.endDate = endDate;
  Courses.payload.startDate = (new Date()).toDateString();
  Courses.payload.percentage = percent;

  alert(Courses.payload.percentage);

  const { mutateAsync } = usePostQuery();

  return mutateAsync(Courses);
  
}


export default useDiscountQuery;