import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
  task_count?: number;
  completed_count?: number;
}

export const useSubjects = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["subjects", user?.id],
    queryFn: async () => {
      const { data: subjects, error } = await supabase
        .from("subjects")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;

      // Get task counts per subject
      const { data: tasks } = await supabase
        .from("tasks")
        .select("subject_id, completed");

      return (subjects as Subject[]).map((s) => {
        const subjectTasks = (tasks || []).filter((t: any) => t.subject_id === s.id);
        return {
          ...s,
          task_count: subjectTasks.length,
          completed_count: subjectTasks.filter((t: any) => t.completed).length,
        };
      });
    },
    enabled: !!user,
  });

  const addSubject = useMutation({
    mutationFn: async ({ name, color }: { name: string; color: string }) => {
      const { error } = await supabase.from("subjects").insert({ name, color, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });

  const updateSubject = useMutation({
    mutationFn: async ({ id, name, color }: { id: string; name: string; color: string }) => {
      const { error } = await supabase.from("subjects").update({ name, color }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });

  const deleteSubject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("subjects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });

  return { subjects: query.data || [], isLoading: query.isLoading, addSubject, updateSubject, deleteSubject };
};
