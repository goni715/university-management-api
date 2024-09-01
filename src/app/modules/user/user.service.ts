

const createStudentService = async (studentData: TStudent) => {
    const result = await StudentModel.create(studentData); //built-in static method
    return result;
  };


  

  export const UserServices = {
    createStudentService
  }