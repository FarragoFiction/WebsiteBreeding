const testCSS = `

@font-face {
    font-family: gamer;
    src: url("Plotter.ttf");
  }
  
  
  @font-face {
    font-family: inspiration;
    src: url("Inspiration-Regular.ttf");
  }
  
  
  body {
    background-color: #131313;
    font-family: gamer;
    color: white;
    font-size: 12px;
  }
`;


const httpGetAsync = async (theUrl) => {
    return new Promise(function (resolve, reject) {
  
      let xhr = new XMLHttpRequest();
      try {
        xhr.open("get", theUrl);
  
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
          } else {
            //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function () {
          //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send();
      } catch (e) {
        console.error(e);
        //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
        return `[]`;
      }
    });
}


const test= async()=>{
    const ele = document.createElement('style');
    const naga = "http://farragofiction.com/NagaGirlfriend/index.css"
    const security = "http://farragofiction.com/ATranscript/index.css";
    const css = await httpGetAsync(security);
    ele.innerHTML =(css);
    document.getElementsByTagName("head")[0].appendChild(ele);

}

//get their base files. get their css files
//combine
const breed = async(site1, site2)=>{
    try{
    const css = await httpGetAsync(site1+"index.css");
    const ele = document.createElement('style');
    ele.innerHTML =(css);
    document.getElementsByTagName("head")[0].appendChild(ele);

    }catch(e){
        console.error("error fetching site 1 css, trying site 2")
        try{
            const css = await httpGetAsync(site2+"index.css");
            const ele = document.createElement('style');
            ele.innerHTML =(css);
            document.getElementsByTagName("head")[0].appendChild(ele);
        
            }catch(e){
                console.error("error fetching site 1 css, trying site 2")
            }
    }
    const dom1Source = await httpGetAsync(site1);
    const dom2Source = await httpGetAsync(site2);
    const parser=new DOMParser();
    const parsedDom1 = parser.parseFromString(dom1Source,"text/html");
    const parsedDom2 = parser.parseFromString(dom2Source,"text/html");

    const cradle = document.querySelector("#cradle");
    cradle.innerHTML = "";
    let dom1_index = 0;
    let dom2_index = 0;
    const dom1Body = parsedDom1.querySelector("body");
    const dom2Body = parsedDom2.querySelector("body");


    console.log("JR NOTE: dom1Body.children",dom1Body.children)
    let looping = true;
    let number_loops = 0;
    while(looping && number_loops < 100){
        number_loops ++;
        if(dom1_index +1> dom1Body.children.length && dom2_index +1 >= dom2Body.children.length){
            looping = false;
        } 
        const first = dom1Body.children[dom1_index];
        const second = dom2Body.children[dom2_index];
        console.log("JR NOTE: first is", first, "second is", second)
        if(first){
            cradle.append(first);
        }

        if(second){
            cradle.append(second);
        }

        dom1_index ++;
        dom2_index ++;
    }

}