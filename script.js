let boxes=document.querySelectorAll(".boxes");
let start=document.querySelector("#start");
let num=document.querySelector("#num");
let track=document.querySelector("#track");
let pause=document.querySelector("#pause");
let restart=document.querySelector("#restart");


let arr=[];
let pse=false;
let rest=false;

for(let i=1;i<=90;i++)
{
    arr.push(i);
}

pause.addEventListener(("click"),()=>
{
    if(pse===false)
    {
        pse=true;
        pause.innerText="RESUME";
    }
    else
    {
        pse=false;
        pause.innerText="PAUSE";
        Housie();
    }
})

restart.addEventListener(("click"),()=>
{
    rest=true;
    track.innerText="Numbers completed so far : ";
    num.innerText="";
    for(let i=0;i<91;i++)
    {
        arr.push(i);
        boxes[i].style.backgroundColor="transparent";
    }
})


function fun()
{
    if(arr.length>0)
    {
        return new Promise((resolve,reject)=>
        {
            setTimeout(()=>
            {
                if( pse===false && rest===false)
                {
                let ind=Math.floor(Math.random()*arr.length);
                let ele=arr[ind];
                arr.splice(ind,1);
                console.log(boxes[ele]);
                num.innerText=ele;
                track.innerText=" "+track.innerText+ele+" , ";
                boxes[ele-1].style.backgroundColor='blue';
                const speech = new SpeechSynthesisUtterance(ele);
                speech.lang='en-IN';
                speech.rate=1;
                speech.pitch=1;
                window.speechSynthesis.speak(speech);
                resolve();
                }

                },3000)
            })
    }
}

start.addEventListener(("click"),()=>
{
    rest=false;
    Housie();
})

async function Housie()
{
    for(let i=0;i<91;i++)
    {
        if(pse===true || restart==true)
        {
            break;
        }
        else
        {
            await fun();
        }
        
    }
}

