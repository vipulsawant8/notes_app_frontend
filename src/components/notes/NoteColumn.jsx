import { useState, useRef, memo, useEffect } from "react";
import { Button, Card, CardBody } from "react-bootstrap";

import { NoteHeader, NoteEditForm, NoteDeleteModal } from '@/components/notes';
import { updatePin } from "@/app/features/notes/noteSlice";
import { useDispatch } from "react-redux";
import notify from "@/utils/notify.js";

const NoteColumn = ({ note }) => {

	const dispatch = useDispatch();

	const editNoteRef = useRef();
	
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const onEdit = () => {

		setEditing(true);
	};

	const onHideEdit = () => {

		setEditing(false);
	};

	const onDelete = () => {

		setDeleting(true);
	};
	
	const onHideDelete = () => {

		setDeleting(false);
	};

	const onTogglePin = async () => {

		try {
			const result = await dispatch(updatePin({ id: note._id, status: !note.pinned })).unwrap();
			const action = note.pinned ? "unpinned": "pinned";
			const msg = result.message || `"${note.title}" was ${action}`; 
			notify.success(msg);
		} catch (error) {
			
			const msg = error || "Pin action failed";
			notify.error(msg);
		}
	};
	const [tick, setTick] = useState(0);

	useEffect(() => {
	const interval = setInterval(() => {
		setTick(t => t + 1);
	}, 60000); // every 1 minute

	return () => clearInterval(interval);
	}, []);

	return (
		
		<Card className={`note-card ${ note.pinned ? "pinned" : ""} w-100 h-100`}>
			
			<NoteDeleteModal show={deleting} onHide={onHideDelete} note={note}  />

			<CardBody className="p-2">
				
				{ !editing && ( <>
					<NoteHeader 
						title={note.title}
						pinned={note.pinned} 
						onEdit={onEdit} 
						onDelete={onDelete}
						onTogglePin={onTogglePin}
						date={note.updatedAt}
					/>
					<p className="note-content">{ note.content }</p>
				</> ) }

				{ editing && ( 
					<div className="d-flex align-items-end justify-content-between">
					
						<div className="flex-grow-1">
							<NoteEditForm 
							ref ={editNoteRef}
							note={note}
							onSave={onHideEdit}
						/>
						</div>
						<Button variant="link" className="btn-icon x-btn flex-grow-0" onClick={onHideEdit} style={{textDecoration: "none"}}> X </Button>
					</div> 
				) }
			</CardBody>
		</Card>
	);
};

export default memo(NoteColumn);