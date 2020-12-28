function add(){
    const title=document.getElementById('title').value;
    const content=document.querySelector('.content').value;
    if(!title || !content){
        alert("Enter proper title and content")
    }
    else{
        const data={
            title:title,
            content:content
        }
        console.log(title,content)
        $.ajax({
            type:"POST",
            data:data,
            url:'http://localhost:5000/add',
            success:function(msg){
                    if(msg){
                        console.log("AD")
                    }else{
                        alert("Server error")
                    }
                }
        })
    }
    window.location='http://localhost:5000/myarticles'
}
