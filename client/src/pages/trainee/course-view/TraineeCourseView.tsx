import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

import Content from './Content';

import Video from './Video';

import SolveExercise from './SolveExercise';

import DownView from './DownView';

// import RateCourse from './RateCourse';

import { UseCountry } from '@/store/countryStore';
import { getCourseByID } from '@/services/axios/dataServices/CoursesDataService';
import { ICourse } from '@/interfaces/course.interface';
import { useTraineeId } from '@/hooks/useTraineeId';

type LeftViewProps = {
  sectionid: string | undefined;
  itemid: string | undefined;
  itemType: string | undefined;
  course: ICourse;
};

function LeftView(props: LeftViewProps) {
  const section = props.course.sections.find(s => s._id === props.sectionid);
  const traineeId = useTraineeId();
  if (!section) {
    return <></>;
  }
  if (props.itemType === 'exercise') {
    const exercise = section.exercises.find(e => e._id === props.itemid);
    if (!exercise) {
      return <></>;
    }
    return (
      <SolveExercise
        {...exercise}
        courseId={props.course._id}
        traineeId={traineeId}
      />
    );
  }
  const lesson = section.lessons.find(l => l._id === props.itemid);
  if (!lesson) {
    return <></>;
  }
  return <Video {...lesson} />;
}

function CourseView() {
  const country = UseCountry();
  const { courseid, sectionid, itemid, itemType } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['getCourseByID', courseid, country],
    () => getCourseByID(courseid, country)
  );
  if (isError) {
    return (
      <h1 className='text-danger text-center'>
        An error has occurred while loading course view.
      </h1>
    );
  }
  if (isLoading) {
    return <div className='text-info text-center'>Loading course view...</div>;
  }
  if (!data) {
    return <></>;
  }
  console.log(data);
  const leftProps = {
    itemid,
    sectionid,
    course: data,
    itemType
  };
  const section = sectionid
    ? data.sections.find(s => s._id === sectionid)
    : data.sections[0];
  if (!section) {
    return <h1 className='text-danger text-center'>Section not found</h1>;
  }
  const item =
    itemType === 'exercise' ?
       (itemid ? section.exercises.find(e => e._id === itemid) : section.exercises[0])
      : (itemid ? section.lessons.find(l => l._id === itemid) : section.lessons[0])

  if (!item) {
    return <h1 className='text-danger text-center'>Item not found</h1>;
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12 col-md-9'>
          <div className='d-flex flex-column'>
            <div>
              <LeftView {...leftProps} />
            </div>
            <div>
              <DownView course={data} itemid={item._id ?? ''} />
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-3'>
          {/* <RateCourse /> */}
          <Content {...data} />
        </div>
      </div>
    </div>
  );
}

export default CourseView;
