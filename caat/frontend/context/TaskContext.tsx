"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type TaskContextType = {
  taskData: { [key: string]: boolean };
  refreshTasks: () => void;
};

const TaskContext = createContext<TaskContextType>({
  taskData: {},
  refreshTasks: () => {},
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [taskData, setTaskData] = useState<{ [key: string]: boolean }>({});

  const refreshTasks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch tasks:", res.status);
        return;
      }

      const data = await res.json();
      setTaskData(data);
    } catch (e) {
      console.error("Error fetching tasks:", e);
    }
  };

  useEffect(() => {
    refreshTasks(); // Fetch on first load
  }, []);

  return (
    <TaskContext.Provider value={{ taskData, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
