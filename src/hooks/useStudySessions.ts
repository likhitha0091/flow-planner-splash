import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface StudySession {
  id: string;
  user_id: string;
  type: string;
  duration_minutes: number;
  completed_at: string;
}

export const useStudySessions = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["study_sessions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_sessions")
        .select("*")
        .order("completed_at", { ascending: false });
      if (error) throw error;
      return data as StudySession[];
    },
    enabled: !!user,
  });

  const addSession = useMutation({
    mutationFn: async (session: { type: string; duration_minutes: number }) => {
      const { error } = await supabase.from("study_sessions").insert({ ...session, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["study_sessions"] }),
  });

  return { sessions: query.data || [], isLoading: query.isLoading, addSession };
};
