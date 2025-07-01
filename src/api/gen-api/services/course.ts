import service from '@/api/interceptor';

// 定义所有需要的类型
export interface CourseData {
  id: string;
  name: string;
  teacher: string;
  avatar?: string;
  type?: string;
  difficultyLevel?: string;
  description?: string;
  price: number;
  startTime: string;
  endTime: string;
  duration: number;
}

// 用于添加课程的接口，不包含id字段
export interface CourseCreateData {
  name: string;
  teacher: string;
  avatar?: string;
  type?: string;
  difficultyLevel?: string;
  description?: string;
  price: number;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface CourseQuery {
  name?: string;
  status?: string;
  type?: string;
  difficultyLevel?: string;
  page?: number;
  pageSize?: number;
}

export interface CourseReservationData {
  Course_id: string;
  studentName: string;
  contactInfo?: string;
  school?: string;
  remark?: string;
  city?: string;
}

export interface SchoolData {
  id: number;
  name: string;
  city: string;
}

export interface CampusData {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: string;
  description?: string;
  openTime?: string;
  closeTime?: string;
  facilities?: string[];
}

// 定义分页响应的泛型
export interface Page<T> {
  records: T[];
  totalRow: number;
  pageNumber: number;
  pageSize: number;
}

// 定义后端返回的统一结果类型
export interface Result<T> {
  code: number;
  message: string;
  result: T;
}

/*课程相关接口*/
// 查询所有课程列表
export function getCourseList(params: CourseQuery) {
  return service.get<Result<Page<CourseData>>>('/api/course/list', {
    params
  });
}
// 查询单个课程
export function getCourseDetail(id: string) {
  return service.get<Result<CourseData>>(`/api/course/${id}`);
}
//新增课程
export function createCourse(data: CourseCreateData) {
  return service.post('/api/course/add', data);
}
//编辑课程
export function updateCourse(data: CourseData) {
  return service.put(`/api/course/edit`, data);
}
// 删除课程
export function deleteCourse(id: string) {
  return service.delete(`/api/course/${id}`);
}
// 上传教师头像
export function uploadTeacherAvatar(courseId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return service.post(`/api/course/${courseId}/upload-avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}
// 课程预约相关接口
export function getCourseReservationList(params: {
  courseName?: string;
  studentName?: string;
  school?: string;
  pageNum?: number | string;
  pageSize?: number | string;
}) {
  return service.post('/api/course/courseReservation/getList', params);
}

export function getCourseReservationDetail(courseId: string) {
  return service.get<CourseReservationData>(
    `/api/course/reservation/${courseId}`
  );
}

export function createCourseReservation(data: CourseReservationData) {
  return service.post('/api/course/reservation', data);
}

export function updateCourseReservation(
  courseId: string,
  data: CourseReservationData
) {
  return service.put(`/api/course/reservation/${courseId}`, data);
}

export function deleteCourseReservation(courseId: string) {
  return service.delete(`/api/course/reservation/${courseId}`);
}

// 校区相关接口
export function getSchoolList(params: CourseQuery) {
  return service.get<SchoolData[]>('/api/school/list', { params });
}

export function getSchoolDetail(id: number) {
  return service.get<SchoolData>(`/api/school/${id}`);
}

export function createSchool(data: SchoolData) {
  return service.post('/api/school', data);
}

export function updateSchool(id: number, data: SchoolData) {
  return service.put(`/api/school/${id}`, data);
}

export function deleteSchool(id: number) {
  return service.delete(`/api/school/${id}`);
}

// 校区管理相关接口
export function getCampusList(params: CourseQuery) {
  return service.get<CampusData[]>('/api/campus/list', { params });
}

export function getCampusDetail(id: string) {
  return service.get<CampusData>(`/api/campus/${id}`);
}

export function createCampus(data: CampusData) {
  return service.post('/api/campus', data);
}

export function updateCampus(id: string, data: CampusData) {
  return service.put(`/api/campus/${id}`, data);
}

export function deleteCampus(id: string) {
  return service.delete(`/api/campus/${id}`);
}

// 课程预约相关接口（别名）
export function getAppointmentList(params: CourseQuery) {
  return getCourseReservationList(params);
}

export function createAppointment(data: {
  courseId: string;
  studentName: string;
  contactInfo?: string;
  school?: string;
  remark?: string;
  city?: string;
}) {
  const reservationData: CourseReservationData = {
    Course_id: data.courseId,
    studentName: data.studentName,
    contactInfo: data.contactInfo,
    school: data.school,
    remark: data.remark,
    city: data.city
  };
  return createCourseReservation(reservationData);
}

export function cancelAppointment(id: string) {
  return deleteCourseReservation(id);
}
