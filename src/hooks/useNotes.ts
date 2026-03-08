import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Note {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  subject_name?: string;
}

export const useNotes = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notes", user?.id],
    queryFn: async () => {
      const { data: notes, error } = await supabase
        .from("notes")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;

      const { data: subjects } = await supabase.from("subjects").select("id, name");
      const subjectMap = Object.fromEntries((subjects || []).map((s: any) => [s.id, s.name]));

      return (notes as Note[]).map((n) => ({
        ...n,
        subject_name: n.subject_id ? subjectMap[n.subject_id] || "" : "",
      }));
    },
    enabled: !!user,
  });

  const addNote = useMutation({
    mutationFn: async (note: { title: string; content?: string; subject_id?: string | null }) => {
      const { error } = await supabase.from("notes").insert({ ...note, user_id: user!.id });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const updateNote = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; content?: string; subject_id?: string | null }) => {
      const { error } = await supabase.from("notes").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const deleteNote = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return { notes: query.data || [], isLoading: query.isLoading, addNote, updateNote, deleteNote };
};
