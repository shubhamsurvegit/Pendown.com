

function fun(e,email){
    const likes=e.parentElement.children[4];
    const id=e.parentElement.children[1].innerHTML
    const number_of_likes=parseInt(likes.innerHTML);
    const check=e.parentElement.children[5];

    if(check.innerHTML=='NO'){
        likes.innerHTML=" "+(number_of_likes+1);       
        check.innerHTML="YES";
    }
    else{
        likes.innerHTML=" "+(number_of_likes-1);
        check.innerHTML="NO";
    }
    const data={
        email:email,
        id:id,
        likes:likes.innerHTML
    }
    $.ajax({
        type:"POST",
        data:data,
        url:'http://localhost:5000/likes',
        success:function(msg){
                if(msg){
                    console.log("AD")
                }else{
                    alert("Server error")
                }
            }
    })
}