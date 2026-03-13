import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button } from "react-bootstrap";
import { deleteNote } from "@/app/features/notes/noteSlice.js";

import notify from "@/utils/notify.js";

const NoteDeleteModal = ({ show, onHide, note }) => {
	
	const dispatch = useDispatch();

	const handleDelete = async () => {
		try {
				const result = await dispatch(deleteNote(note._id)).unwrap();
				onHide();
				const msg = result.message ||  `"${note.title}" was deleted`;
				notify.success(msg);
			} catch (error) {
				
				const msg = error || "Delete Note failed. Please try again.";
				notify.error(msg);
			}	
	};

	return (
		<Modal show={show} backdrop="static" centered onHide={ onHide } keyboard={false} >
			<ModalHeader closeButton>
				<ModalTitle> Delete Note? </ModalTitle>
			</ModalHeader>
			<ModalFooter>
				<Button variant="outline-danger" style={{textDecoration: "none"}} onClick={handleDelete}> Confirm </Button>
			</ModalFooter>	
		</Modal>
	)
};

export default NoteDeleteModal;