import { teachers, useAITeacher } from "@/hooks/useAITeacher";

export const BoardSettings = () => {
  const furigana = useAITeacher((state) => state.furigana);
  const setFurigana = useAITeacher((state) => state.setFurigana);

  const english = useAITeacher((state) => state.english);
  const setEnglish = useAITeacher((state) => state.setEnglish);

  const teacher = useAITeacher((state) => state.teacher);
  const setTeacher = useAITeacher((state) => state.setTeacher);

  const speech = useAITeacher((state) => state.speech);
  const setSpeech = useAITeacher((state) => state.setSpeech);

  const classroom = useAITeacher((state) => state.classroom);
  const setClassroom = useAITeacher((state) => state.setClassroom);

  return (
    <>
      <div className="absolute right-0 bottom-full flex flex-row gap-10 mb-20">
        
      </div>
      <div className="absolute left-0 bottom-full flex flex-row gap-2 mb-20">
        
      </div>
      <div className="absolute left-0 top-full flex flex-row gap-2 mt-20">
        
      </div>
      <div className="absolute right-0 top-full flex flex-row gap-2 mt-20">
       
      </div>
    </>
  );
};
