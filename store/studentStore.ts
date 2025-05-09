// store/studentStore.ts




import { create } from 'zustand';

interface Student {
  id: string;
  name: string;
  course?: string; // Optional properties to match your student data
  yearBlock?: string;
}

interface StudentState {
  students: Student[];
  addStudent: (student: Student) => void;
  setInitialStudents: (initialStudents: Student[]) => void; // Add this action
}

export const useStudentStore = create<StudentState>((set) => ({
  students: [],
  addStudent: (student) => set((state) => ({
    students: [...state.students, student], // Add new student to the list
  })),
  setInitialStudents: (initialStudents) => set({ students: initialStudents }), // Set initial students
}));