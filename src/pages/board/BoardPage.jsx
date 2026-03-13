import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";

import { selectAllNotes, fetchNotes } from "@/app/features/notes/noteSlice.js";
import { NoteColumn, AddNote } from "@/components/notes/index.js";

const BoardPage = () => {

	const boardRef = useRef();
	const dispatch = useDispatch();
	
	const notes = useSelector(selectAllNotes);
	const { loading, paginate } = useSelector(state => state.notes);

	const [adding, setAdding] = useState(false);
	const [nextPage, setNextPage] = useState(1);

	useEffect(() => {

		dispatch(fetchNotes({ page:nextPage }));
	}, [dispatch,nextPage]);

	useEffect(() => {

		if (import.meta.env.DEV) console.log("paginate :", paginate);
	}, [loading]);

	const onHide = () => {

		setAdding(false);
	};
	
	return (<>
			<Row>
				<Col className="d-flex justify-content-end">
					<Button onClick={()=> setAdding(true)}> Add Note </Button>
				</Col>
			</Row>
			
			 <AddNote ref={boardRef} show={adding} onHide={onHide} />

			<Row className="mt-3">
				
				<h2 className="mb-4"> Your Board </h2>
					
					{notes.map( note => (
						<Col lg={4} sm={6} xs={12} key={note.title}>
							<NoteColumn note={note} />
						</Col>
					))}

			</Row>

			{ loading && <p> Loading your notes..... </p> }
			{ !loading && notes.length === 0 && <h4> Start adding notes now </h4> }
			
			{paginate.hasNextPage &&  <Row>
				<Col xs={12} className="text-center mt-3">
					<Button type="button" disabled={!paginate.hasNextPage} onClick={()=> {setNextPage(paginate.nextPage)}}> Load More.. </Button>
				</Col>
			</Row>}
	</>);
};

export default BoardPage;