import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useActions = create((set) => ({
  isDeletingProblem: false,
  refreshTrigger: false,
  onDeleteProblem: async (id) => {
    try {
      set({ isDeletingProblem: true });
      const res = await axiosInstance.delete(`problems/delete-problem/${id}`);
      set((state) => ({ refreshTrigger: state.refreshTrigger + 1 }));
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error deleting problem", error);
      toast.error("Error Deleting problem");
    } finally {
      set({ isDeletingProblem: false });
    }
  },
}));
