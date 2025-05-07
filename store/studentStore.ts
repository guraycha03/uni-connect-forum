// store/studentStore.ts




import { create } from 'zustand';

interface Student {
  id: string;
  name: string;
}

interface StudentState {
  students: Student[];
  addStudent: (student: Student) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  students: [],
  addStudent: (student) => set((state) => ({
    students: [...state.students, student], // Add new student to the list
  })),
}));
