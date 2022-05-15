
import CommentItem from "./CommentItem";
import {GetTitle} from "../helpers/garbageCollectionPoint";

const CommentList = ({garbageCollectionPoint, comments}) => {
    return (
        <div>
            <h2>{GetTitle(garbageCollectionPoint)}</h2>
            <div>
                {comments.map(comment => <CommentItem comment={comment} key={comment.id}/>)}
            </div>
        </div>
    );
};

export default CommentList;