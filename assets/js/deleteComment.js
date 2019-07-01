import axios from "axios";

const CommentList = document.getElementById("jsCommentList");
const commentDeleteBtns=document.querySelectorAll("#jsCommentDetail .jsDeleteBtn");

const handleClick = (event) => {
    console.log(event);
    event.preventDefault();
    const button=event.target;
    const li=button.parentElement;
    const span=li.querySelector("span");
    const comment=span.innerHTML;
    console.log(comment);
    
}

function init(){
    //버튼에 여러개 eventlistener 등록할 때(엄청 헤맴,,)
    [].forEach.call(commentDeleteBtns, (commentDeleteBtn) => {
        commentDeleteBtn.addEventListener("click",handleClick);
    })
    
}

if(CommentList){
    init();
}


