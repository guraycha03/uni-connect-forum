// store/studentStore.ts


import { create } from 'zustand';

interface Student {
  id: string;
  name: string;
  studentNo: string;
  course: string;
  yearBlock: string;
  email: string;
  address: string;
  profileImage: string;
}

interface StudentStore {
  students: Student[];
  setStudents: (students: Student[]) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  setStudents: (students) => set({ students }),
}));
