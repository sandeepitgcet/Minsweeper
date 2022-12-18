let bombs = 10;
let grid = 10;
document.getElementById("level").addEventListener("change",(event)=>{
    
    bombs = parseInt(document.querySelector("select").value); 
    if(bombs == 10){
        grid = 10;
    }
    else if(bombs == 40){
        grid = 18;
    }
    else if(bombs == 100){
        grid = 24;
    }
    document.querySelector(".body").innerHTML = "";
    play();
    //flag();
});

document.querySelector("button").addEventListener("click",(event)=>
{
    document.querySelector(".body").innerHTML = "";
    play();
    //flag();
});
let arr = Array(grid);
const gameBoard=document.querySelector("body");
let set=[];
play();
//flag();
function play(){

    for (var i = 0; i < grid; i++) {
        arr[i] = Array(grid).fill(0);
    }
    set=new Set();
    for(let i=0;i<bombs;i++){
        let row=parseInt(Math.random()*grid);
        let col=parseInt(Math.random()*grid);
        if(set.has([row,col])){
            i--;
        }else{
            set.add([row,col]);
            arr[row][col]=-1;
        }
    }
    const iterator1 = set.entries();
    console.log(set);
    for (const entry of iterator1) {
        let row=entry[0][0];
        let col=entry[0][1];
        let dir=[[-1,0],[0,-1],[1,0],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
        for(let i=0;i<dir.length;i++){
            let r=row+dir[i][0];
            let c=col+dir[i][1];
            if(r>=0 && c>=0 && r<grid && c<grid && arr[r][c]!=-1){
                arr[r][c]= arr[r][c]+1;
            }
        }
    }

    console.log(arr);
    let mainDiv=document.createElement("div");
    mainDiv.className="mainDiv";
    for(let i=0;i<grid;i++){
        let rowDiv=document.createElement("div");
        rowDiv.className="rowDiv";
        for(j=0;j<grid;j++){
            let div=document.createElement("div");
            div.setAttribute("row",i);
            div.setAttribute("col",j);
            if((i+j) % 2 == 0){
                div.style.opacity = "0.5";
            }
            div.style.backgroundColor="greenyellow";
            div.className="cell";
            div.setAttribute("onclick","callBack(event)")
            div.setAttribute("flag","false");
            rowDiv.appendChild(div);
        }
        mainDiv.appendChild(rowDiv);
    }

    document.querySelector(".body").appendChild(mainDiv);
}
function dfs(arr,row,col,visited){
    //console.log(visited);
    //console.log(visited[row][col]);
    visited[row][col]=true;
    //console.log(visited[row][col]);
    //if(arr[row][col]!=0)  return;
    document.querySelector(`div[row='${row}'][col='${col}']`).style.backgroundColor="white";
    //console.log("hhhh");
    let dir=[[-1,0],[0,-1],[1,0],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]];
        for(let i=0;i<dir.length;i++){
            let r=parseInt(row)+parseInt(dir[i][0]);
            let c=parseInt(col)+parseInt(dir[i][1]);
            //console.log(r,c);
            if(r>=0 && c>=0 && r<grid && c<grid  && arr[r][c]==0 && !visited[r][c]){
                dfs(arr,r,c,visited);
            }else{
                if(r>=0 && c>=0 && r<grid && c<grid){
                    if(arr[r][c]==0){

                        document.querySelector(`div[row='${r}'][col='${c}']`).style.backgroundColor="white";
                        document.querySelector(`div[row='${r}'][col='${c}']`).innerHTML='';
                        
                    }else if(arr[r][c]==-1){
                        let img=document.createElement("img");
                        img.src="./bomb.png";
                        document.querySelector(`div[row='${r}'][col='${c}']`).appendChild(img);
                    }
                    else{
                        document.querySelector(`div[row='${r}'][col='${c}']`).innerHTML=arr[r][c];
                        document.querySelector(`div[row='${r}'][col='${c}']`).style.opacity="1"
                        document.querySelector(`div[row='${r}'][col='${c}']`).style.backgroundColor="white";
                
                    }
                    
                }
                //return;
                
            }
        }
}
function callBack(event){
    
    let r=event.target.getAttribute("row");
    let c=event.target.getAttribute("col");
    //alert(event.target.outerHTML);
    event.target.style.backgroundColor="white";
    //console.log(arr);
    //console.log(arr[r][c])
    if(arr[r][c]==-1){

        let itr=set.entries();
         for(let i of itr){
             let row=i[0][0];
             let col=i[0][1];
             let ele = document.querySelector(`div[row='${row}'][col='${col}']`);
                ele.innerHTML = "";
                ele.style.opacity = "1";
                ele.style.backgroundColor = "white";
               img=document.createElement("img");
                img.src="./bomb.png";
                ele.appendChild(img);
         }

         alert("Game Over");
         return;
         

    }else if(arr[r][c]!=0){
        event.target.innerHTML=arr[r][c];
        event.target.style.opacity="1";
    }else{
        let visited= new Array(grid);
        for(let i=0;i<grid;i++){
            visited[i]= new Array(grid).fill(false);

        }
        
        dfs(arr,r,c,visited);
        //event.target.innerHTML="0";
        
    }
    event.target.removeAttribute("onclick");

    let temp = document.querySelectorAll(`div[style*=green]`);
    if(temp.length <= bombs)
    {
        alert("You won the game!");

    }
    
}

// window.oncontextmenu = (e) => {
//     e.preventDefault()
//     console.log('right clicked')
//   }

function flag(){
    
document.querySelectorAll(".cell").forEach((cell)=>{
    cell.addEventListener("contextmenu",(event)=>{
        event.preventDefault();
        if(event.target.getAttribute("flag")=="false"){
            let img=document.createElement("img");
            img.src="./red-flag.png";
            event.target.style.opacity="1";
            img.style.opacity="1";
            event.target.appendChild(img);
            event.target.style.backgroundColor="white"
            //event.target.setAttribute("flag","true");
        }else{
            event.target.innerHTML='';
            event.target.setAttribute("flag","false");
        }
        return false;
    },false);
})
}
