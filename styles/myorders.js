function edit(e){
    const textarea=e.target.parentElement.children[2]
    textarea.readOnly=false;

}

function save(e){
    const textarea=e.target.parentElement.children[2].value
    const id=e.target.parentElement.children[1].innerHTML
    const data={
        id:id,
        article_content:textarea
    }
    $.ajax({
        type:"POST",
        data:data,
        url:'http://localhost:5000/save',
        success:function(msg){
                if(msg){
                    console.log("AD")
                }else{
                    alert("Server error")
                }
            }
    })
    document.getElementById("edit").readOnly=true;
}



   