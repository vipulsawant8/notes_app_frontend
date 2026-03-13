import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalTitle, ModalBody, Card, CardBody } from "react-bootstrap";
import CustomForm from "@/components/form/CustomForm.jsx";
import { createNote } from "@/app/features/notes/noteSlice.js";
import notify from "@/utils/notify.js";

const AddNote = ({ show, onHide, ref }) => {
	
	const dispatch = useDispatch();

	const fields = [
		{
			name: "title",
			label: "Note title",
			type: "text",
			placeholder: "Enter Note title"
		},
		{
			name: "content",
			label: "Note Content",
			type: "textarea",
			placeholder: "Enter Note Contents"
		}
	];
	
	const noteSchema = yup.object({
		title: yup.string().required(),
		content: yup.string()
	});

	const handleAddNote = async (data) => {
	
		try {
			const result = await dispatch(createNote(data)).unwrap();
			if (import.meta.env.DEV) console.log('AddNote result :', result);
			const msg = result.message || `"${data.title}" was added`;
			notify.success(msg);

			ref.current.resetForm();
			onHide();
		} catch (error) {
			
			const msg = error || "Add Note failed. Please try again.";
			notify.error(msg);
		}
	};

	const handleError = errors => {
		if (import.meta.env.DEV) console.log("errors :", errors);
	};

	return (<Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
		<ModalHeader closeButton>
			<ModalTitle>Add New Note</ModalTitle>
		</ModalHeader>

		<ModalBody style={{ backgroundColor: "#f8f9fa" }}>
			<Card className="mt-4 p-3" style={{ backgroundColor: "inherit", border: "none" }}>
				<CardBody>
					<CustomForm ref={ref} fields={fields} validationSchema={noteSchema} onSubmit={handleAddNote} onError={handleError} defaultValues={{ title: "", content: "" }} submitLabel="Add" name="AddNote" />
				</CardBody>
			</Card>
		</ModalBody>
	</Modal>)
}

export default AddNote;