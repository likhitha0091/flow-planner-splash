import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Task {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  description: string;
  priority: string;
  deadline: string | null;
  completed: boolean;
  created_at: string;
  subject_name?: string;
}

export const useTasks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: async () => {
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;

      const { data: subjects } = await supabase.from("subjects").select("id, name");
      const subjectMap = Object.fromEntries((subjects || []).map((s: any) => [s.id, s.name]));

      return (tasks as Task[]).map((t) => ({
        ...t,
        subject_name: t.subject_id ? subjectMap[t.subject_id] || "" : "",
      }));
    },
    enabled: !!user,
  });

  const addTask = useMutation({
    mutationFn: async (task: { title: string; description?: string; subject_id?: string | null; priority?: string; deadline?: string | null }) => {
      const { error } = await supabase.from("tasks").insert({ ...task, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; description?: string; subject_id?: string | null; priority?: string; deadline?: string | null; completed?: boolean }) => {
      const { error } = await supabase.from("tasks").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  return { tasks: query.data || [], isLoading: query.isLoading, addTask, updateTask, deleteTask };
};
