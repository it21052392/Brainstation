import { useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components";
import LectureCard from "@/components/cards/lecture-card";
import useFetchData from "@/hooks/fetch-data";
import { getModuleById } from "@/service/module";
import { setModuleLectures } from "@/store/lecturesSlice";

const Lecture = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const dispatch = useDispatch();

  const { lectures, moduleName } = useSelector((state) => state.lectures);

  const lecturesData = useFetchData(getModuleById, moduleId);

  useEffect(() => {
    if (lecturesData) {
      dispatch(setModuleLectures(lecturesData.data));
    }
  }, [lecturesData, dispatch]);

  const navToAddLecture = () => {
    navigate(`/admin-portal/add-lecture/${moduleId}`);
  };

  const navTomoduleStudents = () => {
    navigate(`/admin-portal/module-students/${moduleId}`);
  };

  return (
    <>
      {!lecturesData ? (
        <Loader />
      ) : (
        <div className="p-4 px-6 h-[calc(100%-100px)]">
          <div className="flex justify-between items-center">
            <h1 className="font-inter font-bold text-2xl">{moduleName} - All Lectures</h1>
            <div className="flex space-x-4">
              <button
                className="bg-blue-900 hover:bg-blue-700 uppercase text-white font-bold py-2 px-4 rounded"
                onClick={navToAddLecture}
              >
                Add Lectures
              </button>
              <button
                className="bg-blue-900 hover:bg-blue-700 uppercase text-white font-bold py-2 px-4 rounded"
                onClick={navTomoduleStudents}
              >
                Enroll Students
              </button>
            </div>
          </div>
          {/* Lecture Cards */}
          <div className="mt-8 mx-20">
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMin={0}
              autoHeightMax={"calc(100vh - 220px)"}
              thumbMinSize={30}
              universal={true}
              className="rounded-lg"
            >
              {lectures?.map((lecture) => (
                <LectureCard
                  key={lecture._id}
                  lecture={lecture.title}
                  slidesTot={lecture.slides.length}
                  lectureId={lecture._id}
                />
              ))}
            </Scrollbars>
          </div>
          {lectures.length === 0 && (
            <div className="h-full w-full flex justify-center items-center text-center text-lg font-inter text-gray-400">
              No lectures found. Click the &quot;Add Lectures&quot; button to add a new lecture.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Lecture;
