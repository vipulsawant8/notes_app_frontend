import { Button } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";

const NoteHeader = ({ title, pinned, onEdit, onDelete, onTogglePin, date }) => {

	const linkStyle = {
		textDecoration: "none"
	};

	const safeDate = formatDistanceToNow(new Date(date), { addSuffix: true });
	
	return (<div className="d-flex justify-content-between align-items-center mb-3">
		<span className="note-title"> { title } </span>
		<span> ✎  <span style={{ color: "black", fontWeight: "lighter" }}> {safeDate } </span> </span>		
		<div className="d-flex gap-1">
			<Button
				variant="link"
				size="sm"
				title={pinned ? "Unpin note" : "Pin note"}
				onClick={onTogglePin}
				className={`mb-3 btn-icon pin-icon ${pinned ? "active" : ""}`}
				style={linkStyle}
				>
				{pinned ? "📌" : "📍"}
			</Button>

			<Button variant="link" 
				className="mb-3 btn-icon edit-btn" 
				size="sm"
				onClick={onEdit}
				style={linkStyle}
			> 
				✎
			</Button>
			<Button 
				variant="link" 
				className="mb-3 btn-icon x-btn" 
				size="sm" 
				onClick={onDelete}
				style={linkStyle}
			> 
				X 
			</Button>
		</div>
	</div>);
};

export default NoteHeader;