// src/store/studentStore.ts


import create from 'zustand';

interface Student {
  id: string;
  name: string;
}

interface StudentStore {
  students: Student[];
  loadStudents: () => void;
  addStudent: (student: Student) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  loadStudents: () => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      const parsedStudents = JSON.parse(storedStudents);
      // Ensure the students data is valid and an array
      if (Array.isArray(parsedStudents)) {
        set({ students: parsedStudents });
      } else {
        set({ students: [] });
      }
    } else {
      set({ students: [] });
    }
  },
  addStudent: (student) => {
    set((state) => {
      const existingStudents = state.students;
      // Prevent adding a duplicate student by checking if the student already exists
      if (!existingStudents.some((s) => s.id === student.id)) {
        const updatedStudents = [...existingStudents, student];
        localStorage.setItem('students', JSON.stringify(updatedStudents)); // Save updated students list
        return { students: updatedStudents };
      }
      return state; // No changes if student already exists
    });
  },
}));
