export interface CourseQuery {
  name?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface CourseData {
  id: string;
  name: string;
  teacher: string;
  time: string;
  location: string;
  status: string;
  description?: string;
  maxStudents?: number;
  currentStudents?: number;
  price?: number;
  startDate?: string;
  endDate?: string;
}

export interface AppointmentData {
  id: string;
  courseId: string;
  courseName: string;
  teacher: string;
  time: string;
  location: string;
  status: string;
  appointmentTime: string;
  userId: string;
  userName: string;
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
