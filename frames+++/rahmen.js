let result = {
                    rahmen : "Holzrahmen Antik Gold",
                    ppt:"none"
                }
                let frameObj = {
                    "frames": [
                        {
                            "type": "antik-gold",
                            "price": 24.99,
                            "productionTime": 6,
                            "name": "Holzrahmen Antik Gold",
                            "text": "Bilderrahmen in Gold verströmen stets edles Flair, das in diesem Modell aus unserer vielfältigen Rahmengalerie dennoch unaufdringlich bleibt. Mit 52 Millimetern in der Breite sorgt der Holzrahmen im antiken Stil für eine edle Wirkung an der Wand."
                        },
                        {
                            "type": "antik-silber",
                            "price": 24.99,
                            "productionTime": 6,
                            "name": "Holzrahmen Antik Silber",
                            "text": "In Silber begeistert der stilvolle Bilderrahmen sicherlich auch Sie, wenn er Ihre liebsten Fotos stilvoll umrahmt. Die antiken Bilderrahmen aus unserer Rahmengalerie überzeugen durch hohe Qualität und individuelle Fertigung nach Maß."
                        },
                        {
                            "type": "wurzelholz",
                            "price": 16.99,
                            "productionTime": 4,
                            "name": "Holzrahmen aus Wurzelholz",
                            "text": "Mit 20 Millimetern Breite legt sich der stilvolle Holzrahmen in Wurzelholz-Optik um Ihr gewünschtes Motiv. Der aus dem Biedermeier bekannte Look überzeugt als Kontrast zu modernen Designs ebenso wie als Ergänzung zu antiken Möbeln."
                        },
                        {
                            "type": "gebuerstet-gold",
                            "price": 19.99,
                            "productionTime": 5,
                            "name": "Holzrahmen gebürstet Gold",
                            "text": "Sanfter Schimmer und klare Formen begeistern bei dem Holzrahmen gebürstet Gold in unvergleichlichem Einklang. Schmücken Sie Ihr Lieblingsmotiv mit dem eleganten Rahmen, der auch Ihrem Foto garantiert den letzten Schliff verleiht."
                        },
                        {
                            "type": "gebuerstet-silber",
                            "price": 19.99,
                            "productionTime": 5,
                            "name": "Holzrahmen gebürstet Silber",
                            "text": "Mit kühler Eleganz begeistert der Holzrahmen in gebürstet silbernem Stil in jedem Wohnraumdekor. Ergänzen Sie den stilvollen Bilderrahmen aus Holz zu Ihren schönsten Fotos, um sie in modern gestalteten Wohn- oder Arbeitsräumen aufzuhängen."
                        }
                    ]
                }
                //console.log(frameObj.frames[1].text);

                function getImg(index){
                    return frameObj.frames[index].type;
                }
                function getPrice(index){
                    return frameObj.frames[index].price;
                }
                function getProductionTime(index){
                    return "c.a " + frameObj.frames[index].productionTime + " Werktage";
                }
                function getname(index){
                    return frameObj.frames[index].name;
                }
                function getDescription(index){
                    return frameObj.frames[index].text;
                }
                function setIndexToObject(){
                    for (let i in frameObj.frames){
                        frameObj.frames[i].index = i;
                    }
                }
                function getResult(){
                    console.log(result);
                    return result;
                }
                function addImagesToObject(){
                    for (let i in frameObj.frames){
                        frameObj.frames[i].mainImageSrc="./img/"+frameObj.frames[i].type+".jpg";
                        frameObj.frames[i].smallLandingDetailImageSrc="./img/"+frameObj.frames[i].type+"-small.jpg";
                        frameObj.frames[i].smallfirstDetailImageSrc="./img/"+frameObj.frames[i].type+"-detail-1-small.jpg";
                        frameObj.frames[i].smallsecondDetailImageSrc="./img/"+frameObj.frames[i].type+"-detail-2-small.jpg";
                        frameObj.frames[i].largeLandingDetailImageSrc="./img/"+frameObj.frames[i].type+"-large.jpg";
                        frameObj.frames[i].largefirstDetailImageSrc="./img/"+frameObj.frames[i].type+"-detail-1-large.jpg";
                        frameObj.frames[i].largesecondDetailImageSrc="./img/"+frameObj.frames[i].type+"-detail-2-large.jpg";

                        frameObj.frames[i].cremeSmallDetailPptImageSrc="./img/"+frameObj.frames[i].type+"-ppt-creme-small.jpg";
                        frameObj.frames[i].schwarzSmallDetailPptImageSrc="./img/"+frameObj.frames[i].type+"-ppt-schwarz-small.jpg";
                        frameObj.frames[i].weissSmallDetailPptImageSrc="./img/"+frameObj.frames[i].type+"-ppt-weiss-small.jpg";
                        
                        frameObj.frames[i].cremeLargeDetailPptImageSrc="./img/"+frameObj.frames[i].type+"-ppt-creme-large.jpg";
                        frameObj.frames[i].schwarzLargeDetailPptImageSrc="./img/"+frameObj.frames[i].type+"-ppt-schwarz-large.jpg";
                        frameObj.frames[i].weissLargeDetailPptImageSrc="./img/"+frameObj.frames[i].type+"-ppt-weiss-large.jpg";                    }
                }
                    var MainTitle = document.createElement('center');
                    MainTitle.setAttribute("id","MainTitle");
                    MainTitle.setAttribute("style","margin-bottom:2%");
                    MainTitle.innerHTML="Holzrahmen";
                    var getObject = document.createElement('a');
                    getObject.setAttribute("id","getObject");
                    getObject.innerHTML="jetzt gestalten";
                    getObject.setAttribute("style","display: inline-block; width:auto; float:right;;height: auto; margin: 0; padding: 0.5625em 1.875em; border: 0; outline: 0; cursor: pointer; text-decoration: none; background: #grey; color: white; font-family: inherit; font-size: 1.14286em; font-weight: 700; line-height: 1; text-align: center; vertical-align: middle; border-radius: 4px; -webkit-appearance: none;");
                    var MainContainer = document.createElement('div');
                    MainContainer.setAttribute("id","MainContainer");
                    MainContainer.setAttribute("style","    width: 594px;");
                    var largeImageContainer = document.createElement('div');
                    largeImageContainer.setAttribute("id","largeImageContainer");
                    largeImageContainer.setAttribute("style","width: 594px;height: 398px;");
                     

                    var Description = document.createElement('div');
                    Description.setAttribute("id","Description");
                    var buttons = document.createElement('div');
                    buttons.setAttribute("id","buttons");
                    buttons.setAttribute("style","    max-height: 312px;float: left;margin-bottom: 30px;position: relative; left: 0; top: 0; display: block;height: 215px;");
                    
                    var smallPpts = document.createElement("div");
                    smallPpts.setAttribute("id","smallPpts");
                    smallPpts.setAttribute("style","     max-height: 312px;float: left;position: relative; left: 0; top: 0; display: block;    height: 200px;");
                    var left = document.createElement("div");
                    left.setAttribute("id","left");
                    left.setAttribute("style","width:50%;float:left;");
                    var inLeft = document.createElement("div");
                    inLeft.setAttribute("id","inLeft");
                    
                    inLeft.setAttribute("style","width: 594px; float: left; margin-left: 0; margin-right: -100%; position: relative; min-height: 35.71429em;");
                    // inLeft.setAttribute("style","border-style: ridge;    padding: 10% 10%;");
                    var right = document.createElement("div");
                    right.setAttribute("id","right");
                    
                    right.setAttribute("style","width: 378px; float: left; margin-left: 630px; margin-right: -100%;");
                    // right.setAttribute("style","width:50%;float:right;");
                    var inRight = document.createElement("div");
                    inRight.setAttribute("id","inRight");
                    inRight.setAttribute("style","width: 378px; float: left; margin-left: 630px; margin-right: -100%;");


                    var main = document.getElementById("main");
                    main.setAttribute("style","    min-height: 35.71429em;");
                    inLeft.appendChild(largeImageContainer);
                    inLeft.appendChild(MainContainer);
                    left.appendChild(inLeft);
                    
                    inRight.appendChild(buttons);
                    inRight.appendChild(smallPpts);
                    inRight.appendChild(Description);
                    right.appendChild(inRight);
                    
                    main.appendChild(MainTitle);
                    // main.appendChild(getObject);
                    main.appendChild(inLeft);
                    main.appendChild(inRight);
                function createmain(){
                    
                    var buttons = document.getElementById("buttons");
                    var buttonsTitle = document.createElement('p');
                    buttonsTitle.innerHTML="Rahmen wählen:";
                    buttonsTitle.setAttribute("style", "margin-bottom: 1em;");

                    buttons.appendChild(buttonsTitle);
                    for ( let i in frameObj.frames){
                        var btnImage = document.createElement('img');
                        btnImage.setAttribute("class","btnImage"+i);
                        btnImage.setAttribute("src","./img/"+frameObj.frames[i].type+".jpg");
                        btnImage.setAttribute("style", "  display: inline-block;margin: 1em;");
                        btnImage.setAttribute("onclick","createDivs("+i+")");
                        
                        // var button = document.createElement('a');
                        // button.setAttribute("onclick","createDivs("+i+")");

                        buttons.appendChild(btnImage);
                        // buttons.appendChild(button);
                    }
                }
                function applyPpt(pptColor,id){
                    clearBox("largeImageContainer");
                        var pptNoneImage = document.getElementsByClassName('pptNoneImage'+id)[0];
                        var pptCremeImage = document.getElementsByClassName('pptCremeImage'+id)[0];
                        var pptSchwarzImage = document.getElementsByClassName('pptSchwarzImage'+id)[0];
                        var pptWeissImage = document.getElementsByClassName('pptWeissImage'+id)[0];

                    switch(pptColor) {
                                case 'none':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("style","display: block;margin-left: auto;margin-right: auto");
                                    pptNoneImage.setAttribute("style","margin:1% 2%;border: 1px solid #99c42e;");                              
                                    pptCremeImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptSchwarzImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptWeissImage.setAttribute("style","margin: 1% 2%;");                              
                                    largeImage.setAttribute("src",frameObj.frames[id].largeLandingDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    result.ppt="none";
                                    break;
                                case 'creme':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("style","display: block;margin-left: auto;margin-right: auto");                              
                                    pptNoneImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptCremeImage.setAttribute("style","margin:1% 2%;border: 1px solid #99c42e;");                              
                                    pptSchwarzImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptWeissImage.setAttribute("style","margin: 1% 2%;");                              
                                    largeImage.setAttribute("src",frameObj.frames[id].cremeLargeDetailPptImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    result.ppt="creme";
                                    break;
                                case 'schwarz':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("style","display: block;margin-left: auto;margin-right: auto");                              
                                    pptNoneImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptCremeImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptSchwarzImage.setAttribute("style","margin:1% 2%;border: 1px solid #99c42e;");                              
                                    pptWeissImage.setAttribute("style","margin: 1% 2%;");                              
                                    largeImage.setAttribute("src",frameObj.frames[id].schwarzLargeDetailPptImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    result.ppt="schwarz";
                                    break;
                                case 'weiss':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("style","display: block;margin-left: auto;margin-right: auto");                              
                                    pptNoneImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptCremeImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptSchwarzImage.setAttribute("style","margin: 1% 2%;");                              
                                    pptWeissImage.setAttribute("style","margin:1% 2%;border: 1px solid #99c42e;");                              
                                    largeImage.setAttribute("src",frameObj.frames[id].weissLargeDetailPptImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    result.ppt="weiss";
                                    break;
                            }
                            getObject.setAttribute("href","#?rahmen="+result.rahmen+"&ppt="+result.ppt);
                            getObject.setAttribute("style","display: inline-block; width: auto; float:right; height: auto; margin: 0; padding: 0.5625em 1.875em; border: 0; outline: 0; cursor: pointer; text-decoration: none; background: #99c42e; color: #fff; font-family: inherit; font-size: 1.14286em; font-weight: 700; line-height: 1; text-align: center; vertical-align: middle; border-radius: 4px; -webkit-appearance: none;");

                }
                function createPpts(i){
                    btnImage = document.getElementsByClassName("btnImage"+i)[0];
                    btnImage.setAttribute("style", "  display: inline-block;margin: 1em;border: 1px solid #99c42e;");
                    var newFrames = [0,1,2,3,4];
                    newFrames.splice(i,1);
                    for( let index in newFrames){
                    others = document.getElementsByClassName("btnImage"+newFrames[index])[0];
                    others.setAttribute("style", "  display: inline-block;margin: 1em;");
                    }
                    
                    console.log(i);
                    var ppts = document.getElementById("smallPpts");
                    clearBox("smallPpts")
                        var pptTitle = document.createElement('p');
                        pptTitle.innerHTML="Passepartout wählen:";
                        pptTitle.setAttribute("style", "margin-bottom: 1em;");
                        ppts.appendChild(pptTitle);

                        var pptNoneImage = document.createElement('img');
                        pptNoneImage.setAttribute("class","pptNoneImage"+i);
                        pptNoneImage.setAttribute("src", "./img/ppt-none.jpg");
                        
                        pptNoneImage.setAttribute("style","margin: 1% 2%;");
                        var pptNone = document.createElement('a');
                        pptNoneImage.setAttribute("onclick","applyPpt('none',"+i+")");
            
                        ppts.appendChild(pptNoneImage);
//                        ppts.appendChild(pptNone);

                        var pptCremeImage = document.createElement('img');
                        pptCremeImage.setAttribute("class","pptCremeImage"+i);
                        pptCremeImage.setAttribute("src", "./img/ppt-creme.jpg");
                        pptCremeImage.setAttribute("style","margin: 1% 2%;");
                        var pptCreme = document.createElement('a');
                        pptCremeImage.setAttribute("onclick","applyPpt('creme',"+i+")");
                
                        ppts.appendChild(pptCremeImage);
//                        ppts.appendChild(pptCreme);
                        
                        var pptSchwarzImage = document.createElement('img');
                        pptSchwarzImage.setAttribute("class","pptSchwarzImage"+i);
                        pptSchwarzImage.setAttribute("src", "./img/ppt-schwarz.jpg");
                        pptSchwarzImage.setAttribute("style","margin: 1% 2%;");
                        var pptSchwarz = document.createElement('a');
                        pptSchwarzImage.setAttribute("onclick","applyPpt('schwarz',"+i+")");
                        
                        ppts.appendChild(pptSchwarzImage);
//                        ppts.appendChild(pptSchwarz);
                        
                        var pptWeissImage = document.createElement('img');
                        pptWeissImage.setAttribute("class","pptWeissImage"+i);
                        pptWeissImage.setAttribute("src", "./img/ppt-weiss.jpg");
                        pptWeissImage.setAttribute("style","margin: 1% 2%;");
                        var pptWeiss = document.createElement('a');
                        pptWeissImage.setAttribute("onclick","applyPpt('weiss',"+i+")");
                
                        ppts.appendChild(pptWeissImage);

//                        ppts.appendChild(pptWeiss);
                            

                }
                function clearBox(elementID){
                    if(document.getElementById(elementID))
                    document.getElementById(elementID).innerHTML="";
                }
                function getDescription(id){
                    clearBox("Description");
                    var desc = document.createElement('p');
                    desc.innerHTML=frameObj.frames[id].text;
                    desc.setAttribute("style", "margin-bottom: 1em;");
                    var title = document.createElement('h3');
                    title.setAttribute("style", "color:grey;    margin-bottom: 0.63636em;font-size: 1.57143em;");
                    title.innerHTML=frameObj.frames[id].name;
                    var price = document.createElement('h1');
                    price.setAttribute("style", "color:grey;;margin-top:2%");
                    price.innerHTML="ab  "+frameObj.frames[id].price+" €";
                    var productionTime = document.createElement('h6');
                    productionTime.setAttribute("style", "color:#d9d9d9;");
                    productionTime.innerHTML=" Produktionszeit ca. "+frameObj.frames[id].productionTime+" Werktag";
                    Description.appendChild(getObject);
                    Description.appendChild(price);
                    Description.appendChild(productionTime);
                    Description.appendChild(title);
                    Description.appendChild(desc);
                }
                function showLargeImage(src,id,pptIndex){
                    clearBox("largeImageContainer");
                        imageDiv= document.getElementsByClassName("image"+id)[0];
                        d1imageDiv= document.getElementsByClassName("d1image"+id)[0];
                        d2imageDiv= document.getElementsByClassName("d2image"+id)[0];


                    switch(pptIndex) {
                        case 'none':

                            switch(src) {
                                case 'landing':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largeLandingDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    break;
                                case 'first':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largefirstDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    break;
                                case 'second':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largesecondDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    break;
                            }
                            break;
                        case 'creme':
                            switch(src) {
                                case 'landing':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largeLandingDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    break;
                                case 'first':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largefirstDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    break;
                                case 'second':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largesecondDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    break;
                            }
                            break;
                        case 'schwarz':
                            switch(src) {
                                case 'landing':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largeLandingDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    break;
                                case 'first':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largefirstDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    break;
                                case 'second':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largesecondDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    break;
                            }
                            break;
                        case 'weiss':
                            switch(src) {
                                case 'landing':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largeLandingDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    break;
                                case 'first':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largefirstDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    break;
                                case 'second':
                                    var largeImage = document.createElement('img');
                                    largeImage.setAttribute("class","largeImage");
                                    largeImage.setAttribute("src",frameObj.frames[id].largesecondDetailImageSrc);
                                    largeImageContainer.appendChild(largeImage);
                                    imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                                    d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;border: 1px solid #99c42e;");
                                    break;
                            }
                            break;                    }
                    console.log(src);
                }
                function createDivs(id){
                    setIndexToObject();
                    addImagesToObject();
                    getDescription(id);
                    createPpts(id);
                    clearBox("MainContainer");
                    clearBox("largeImageContainer");
                    result.rahmen=frameObj.frames[id].type;
                    result.ppt="none";
                    getObject.setAttribute("href","#?rahmen="+result.rahmen+"&ppt="+result.ppt);
                    getObject.setAttribute("style","display: inline-block; width: auto; float:right; height: auto; margin: 0; padding: 0.5625em 1.875em; border: 0; outline: 0; cursor: pointer; text-decoration: none; background: #99c42e; color: #fff; font-family: inherit; font-size: 1.14286em; font-weight: 700; line-height: 1; text-align: center; vertical-align: middle; border-radius: 4px; -webkit-appearance: none;");
                    var init = document.createElement('img');
                    init.setAttribute("class","initialLargeImage");
                    init.setAttribute("src",frameObj.frames[id].largeLandingDetailImageSrc);
                    largeImageContainer.appendChild(init);
                    //for ( let i in frameObj.frames){
                        
                        var imagesContainerDiv = document.createElement('div');
                        imagesContainerDiv.setAttribute("style","height:100px;margin-top:2%");

                        var imageDiv = document.createElement('img');
                        imageDiv.setAttribute("class","image"+id);
                        imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                        imageDiv.setAttribute("src",frameObj.frames[id].smallLandingDetailImageSrc);
                        imageDiv.setAttribute("onclick","showLargeImage('landing',"+id+",'none')");
                        // var clickedDiv= document.createElement('div');
                        // clickedDiv.setAttribute("class","clickedDiv");
                        // clickedDiv.appendChild(imageDiv);
                        imagesContainerDiv.appendChild(imageDiv);


                        var d1imageDiv = document.createElement('img');
                        d1imageDiv.setAttribute("class","d1image"+id);
                        d1imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                        d1imageDiv.setAttribute("src",frameObj.frames[id].smallfirstDetailImageSrc);
                        d1imageDiv.setAttribute("onclick","showLargeImage('first',"+id+",'none')");
                        imagesContainerDiv.appendChild(d1imageDiv);
                        // var d1clickedDiv= document.createElement('div');
                        // d1clickedDiv.setAttribute("class","d1clickedDiv");
                        // d1imageDiv.setAttribute("onclick","showLargeImage('first',"+id+",'none')");
                        // d1clickedDiv.appendChild(d1imageDiv);
                        //MainContainer.appendChild(d1clickedDiv);

                        var d2imageDiv = document.createElement('img');
                        d2imageDiv.setAttribute("class","d2image"+id);
                        d2imageDiv.setAttribute("style","float:left;margin: 0px 3%;");
                        d2imageDiv.setAttribute("src",frameObj.frames[id].smallsecondDetailImageSrc);
                        d2imageDiv.setAttribute("onclick","showLargeImage('second',"+id+",'none')");
                        imagesContainerDiv.appendChild(d2imageDiv);
                        // var d2clickedDiv= document.createElement('div');
                        // d2clickedDiv.setAttribute("class","d2clickedDiv");
                        // d2clickedDiv.setAttribute("onclick","showLargeImage('second',"+id+",'none')");
                        // d2clickedDiv.appendChild(d2imageDiv);
                        //MainContainer.appendChild(d2clickedDiv);
                        MainContainer.appendChild(imagesContainerDiv);
                    //}

                    
                }