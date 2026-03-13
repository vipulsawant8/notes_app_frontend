import * as yup from "yup";
import { forwardRef } from "react";

import { useDispatch } from "react-redux";

import { CustomForm } from "@/components/form";
import { updateNote } from "@/app/features/notes/noteSlice.js";

import notify from "@/utils/notify.js";

const NoteEditForm = forwardRef(({ note, onSave }, ref) => {

	const dispatch = useDispatch();

	const noteFields = [
		{
			name: "title",
			label: "Title",
			type: "text",
		},
		{
			name: "content",
			label: "Content",
			type: "textarea"
		}
	];

	const noteSchema = yup.object({
		title: yup.string().required("Title is required"),
		content: yup.string()
	});

	const handleSave = async (data) => {

		try {
			const result = await dispatch(updateNote({ id: note._id, title: data.title, content: data.content })).unwrap();
			const msg = result.message || `"${data.title}" was updated`;
			notify.success(msg);
			ref.current.resetForm();
			onSave();
		} catch (error) {
			
			const msg = error || "Update Note failed. Please try again.";
			notify.error(msg);
		}
	};

	const handleError = errors => {

		if (import.meta.env.DEV) console.log("Note Column Errors :", errors);
	};

	return ( <CustomForm ref={ref} fields={noteFields} validationSchema={noteSchema} onSubmit={handleSave} onError={handleError} defaultValues={{ title: note.title, content: note.content }} submitLabel="Save" name="EditNote" submitInside={false} />)
	
} );

export default NoteEditForm;