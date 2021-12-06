let 
    begW = new Map([["to play","грати"],["to think","думати"],["air","повітря"],["large","великий"],["tall","високий"],["picture",["зображення", "картина", "картинка"]],["earth","земля"],["place","місце"],["every","кожен"],["to use","використовувати"],["number",["число", "номер"]],["to plant","саджати"],["between","між"],["book",["книга", "книжка"]],["room","кімната"],["car","автомобіль"],["game","гра"],["mouse",["миша","мишка"]],["phone","телефон"],["pen","ручка"]]),
    interW = new Map([["to crouch","присісти"],["remote",["дистанційний", "віддалений"]],["mandarin (language)","китайська"],["giant","гігант"],["sure",["звичайно", "звісно"]],["calling",["дзвонить", "крик", "вигук"]],["to device","винаходити"],["to imagine",["уявити", "уявляти"]],["rough","грубий"],["awkward","незручно"],["sale",["продаж","розпродаж"]],["to drop",["впустити", "кинути"]],["savage","дикун"],["advanced","просунутий"],["vocabulary",["словник", "лексика"]],["strange",["дивно", "дивний"]],["beautiful",["гарний", "гарно"]],["grace","благодать"],["to separate","розділяти"],["to reply","відповісти"]]),
    advW = new Map([["motion","рух"],["neck","шия"],["skill","вміння"],["(he is) afraid","наляканий"],["experience","досвід"],["valley","долина"],["opposite","протилежний"],["to arrange","організовувати"],["camp","табір"],["cotton","хлопок"],["quarter","чверть"],["to stretch",["розтягнути", "розтягати"]],["to shine",["світити", "сяяти"]],["broad","широкий"],["thin","тонкий"],["insect","комаха"],["supply",["постачання", "поставка", "запас"]],["consonant","приголосний"],["to flow","текти"],["yard",["двір", "город"]]]),
    keyGhost = [
        {transform: "translate(0, 20vw)", opacity: 0},
        {transform: "translate(0, 10vw)", opacity: 1},
        {transform: "translate(0, 0vw)", opacity: 0}
    ],
    startCheck = false, selectedLVL = "";

$(Start());

function Start() {
    $(".diff").css({
        boxShadow: "0vw 0vw 2vw 2vw white"
    });
    $(".lvl").attr("style","none");
    selectedLVL = '';
    startCheck = false;
};

$(".dbeg").click(()=>{checkLvl(".dbeg")});
$(".dint").click(()=>{checkLvl(".dint")});
$(".dadv").click(()=>{checkLvl(".dadv")});

function checkLvl(lvl){
    if (lvl == selectedLVL)return;
    if(startCheck){
        let answer = confirm("Change level? All answers in this level will be lost!");
        if (answer){
            select(lvl);
        }
    }
    else{
        startCheck=true;
        $(".diff").css({
            boxShadow: "0vw 0vw 0.5vw 0.5vw white"
        });
        select(lvl);
    }
}

function select(lvl){
    GlobalReset();
    selectedLVL = lvl;
    $(lvl).css("transform","translateX(4vw)");
    switch (lvl){
        case '.dbeg':
            $(lvl).css('color', "rgb(0, 255, 21)");
            break;
        case '.dint':
            $(lvl).css('color', "rgb(242, 247, 0)");
            break;
        case '.dadv':
            $(lvl).css('color', "rgb(255, 139, 45)");
            break;
    } 
    QuestPrepare(lvl);
}

let
    Wcount = 0, engW = new Array(), ukrW = new Array(), ans, correct, greenval, redval, koeff = 1, score = 0;
const size = 10;
let lvls = ["Beginner", "Elementary", "Intermediate", "Upper Intermediate", "Advanced", "Proficiency - Fluent knowledge"];

function GlobalReset(){
    score = 0;
    koeff = 1;
    greenval = 0;
    redval = 0;
    Wcount = 0;
    ans = 0;
    engW = new Array();
    ukrW = new Array();
    $(".lvl").attr("style","none");
    $(".field").removeAttr("disabled");
    $(".field *").removeAttr("disabled");
    $(".pos").text(Wcount+1+"/10");
    $(".answer").trigger('reset');
    $("#corrnum").text("0");
    $("#uncorrnum").text("0");
}

function QuestPrepare(lvl){
    koeff = ((lvl=='.dbeg')? 1 : (lvl=='.dint')? 2 : 3);
    currExporter = new Map((lvl=='.dbeg')? begW : (lvl=='.dint')? interW : advW);
    let keys = new Array();
    for (let element of currExporter.keys()){
        keys.push(element);
    };
    for (let i = 0; i < size; i++){
        let needed = keys.splice(Math.random() * (keys.length - 0) + 0, 1);
        engW.push(needed[0]);
        ukrW.push(currExporter.get(needed[0]));
    }
    $(".word").text(engW.at(Wcount));
    engW.push('word');
}

$('form').submit(function(e) {
    e.preventDefault();
    CheckAnswer();
    return;
});
$(".card").click(CheckAnswer);

function CheckAnswer(){
    if ($(".card").attr("disabled")=='disabled'){
        return;
    }
    ans = $("#ans").val().toLowerCase();
    while(ans.length>0){
        if (ans.at(0) == ' '){
            ans.splice(0,1);
        }
        else break;
    }
    if ((ans.length<1)){
        alert("The answer wasn`t entered!");
        return;
    }
    $(".card").attr("disabled", "disabled");
    correct = false;
    if(typeof ukrW.at(Wcount) == "object"){
        ukrW.at(Wcount).forEach(element => {
            if (element==ans) {
                correct=true;
                return;
            }
        });
    }
    else if (ukrW.at(Wcount)==ans){
        correct=true;
    }
    if (correct){
        score+=koeff;
        $("#ans").css({
            boxShadow: "0vw 0vw 1vw 1.5vw green"
        })
        $("#corrghost").animate(
            {opacity: 1}, 1000, ()=>{
                $("#corrghost").animate(
                    {opacity: 0}, 1000, ()=>{
                        $("#corrnum").text(++greenval);
                        nextCard();
                    }
                )
            }
        );
    }
    else{
        $("#ans").css({
            boxShadow: "0vw 0vw 1vw 1.5vw red"
        })
        $("#uncorrghost").animate(
            {opacity: 1}, 1000, ()=>{
                $("#uncorrghost").animate(
                    {opacity: 0}, 1000, ()=>{
                        $("#uncorrnum").text(++redval);
                        nextCard();
                    }
                )
            }
        );
    }
}

function nextCard(){
    $("#ans").css("boxShadow", "none");
    $(".answer").trigger('reset');
    $(".card").animate({opacity: 0}, 1000, ()=>{
        setTimeout(()=>{
            $(".word").text(engW.at(++Wcount));
            $(".card").animate({opacity: 1}, 1000,
                ()=>{
                    $(".card").removeAttr("disabled");
                    if (Wcount > size-1){
                        FinishTest();
                        return;
                    }
                    $(".pos").text(Wcount +1 + "/10");
                });
        }, 1000);
    })
}

function FinishTest() {
    $(".field").attr('disabled', 'disabled');
    $("#ans").attr('disabled', 'disabled');
    for (var i = 0; score > 5;i++){
        score-=5;
    }
    alert("You finished the test! Your level of English knowledge is '"+lvls.at(i) + "'");
    Start();
}