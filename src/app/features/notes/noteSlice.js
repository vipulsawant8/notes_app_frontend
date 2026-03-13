import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import asyncThunkWrapper from "@/utils/asyncThunkWrapper.js";
import API from "@/api/axios.js";

const noteAdapter = createEntityAdapter({
	selectId: note => note._id,
	sortComparer: (a,b) => {
		if (a.pinned !==b.pinned){
			return a.pinned ? -1 : 1;
		}
		return b.updatedAt.localeCompare(a.updatedAt);
	}
});

const fetchNotes = createAsyncThunk('notes/fetchNotes', ({ page }, thunkAPI) => asyncThunkWrapper(() => API.get(`/notes?page=${page}`), thunkAPI));

const createNote = createAsyncThunk('notes/createNote', ({title, content }, thunkAPI) => asyncThunkWrapper(() => API.post('/notes', { title, content }), thunkAPI));

const updateNote = createAsyncThunk('notes/updateNote', ({ id, title, content }, thunkAPI) => asyncThunkWrapper(() => API.patch(`/notes/${id}`, { title, content }), thunkAPI));

const deleteNote = createAsyncThunk('notes/deleteNote', (id, thunkAPI) => asyncThunkWrapper(() => API.delete(`/notes/${id}`), thunkAPI));

const updatePin = createAsyncThunk('notes/updatePin', ({id, status }, thunkAPI) => asyncThunkWrapper(() => API.patch(`/notes/${id}/update-pin`, { status }), thunkAPI));

const noteSlice = createSlice({
	name: "notes",
	initialState: noteAdapter.getInitialState({
		loading: true,
		error: null,
		paginate: {}
	}),
	reducers: { 
		clearNotes: (state) => {

			noteAdapter.removeAll(state);
		}
	 },
	extraReducers: builder => {
		
		builder
		.addCase(fetchNotes.pending, (state) => {

			state.loading = true;
			state.error = null;
		})
		.addCase(fetchNotes.fulfilled, (state, action) => {

			state.loading = false;
			state.error = null;
			const { docs, ...rest } = action.payload.data;
			// noteAdapter.setAll(state, docs);
			noteAdapter.upsertMany(state, docs);
			state.paginate = { ...rest };
		})
		.addCase(fetchNotes.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(createNote.fulfilled, (state, action) => {

			noteAdapter.addOne(state, action.payload.data);
		})
		.addCase(updateNote.fulfilled, (state, action) => {

			noteAdapter.upsertOne(state, action.payload.data);
		})
		.addCase(deleteNote.fulfilled, (state, action) => {
			
			const id = action.payload.data._id;
			noteAdapter.removeOne(state, id);
		})
		.addCase(updatePin.fulfilled, (state, action) => {
			noteAdapter.upsertOne(state, action.payload.data);
		});
	}
});

export { fetchNotes, createNote, updateNote, deleteNote, updatePin };
export const { clearNotes } = noteSlice.actions;
export const { selectAll: selectAllNotes, selectById: selectNoteByID, selectIds: selectNoteIDs } = noteAdapter.getSelectors(state => state.notes);

export default noteSlice.reducer;