// const model = await tf.loadLayersModel("./Models/Model 3/model.json")
const encodings = {"\n": 0, " ": 1, "!": 2, "\"": 3, "#": 4, "$": 5, "%": 6, "&": 7, "'": 8, "(": 9, ")": 10, "*": 11, "+": 12, ",": 13, "-": 14, ".": 15, "/": 16, "0": 17, "1": 18, "2": 19, "3": 20, "4": 21, "5": 22, "6": 23, "7": 24, "8": 25, "9": 26, ":": 27, ";": 28, "<": 29, "=": 30, ">": 31, "?": 32, "@": 33, "A": 34, "B": 35, "C": 36, "D": 37, "E": 38, "F": 39, "G": 40, "H": 41, "I": 42, "J": 43, "K": 44, "L": 45, "M": 46, "N": 47, "O": 48, "P": 49, "Q": 50, "R": 51, "S": 52, "T": 53, "U": 54, "V": 55, "W": 56, "X": 57, "Y": 58, "Z": 59, "[": 60, "]": 61, "^": 62, "_": 63, "`": 64, "a": 65, "b": 66, "c": 67, "d": 68, "e": 69, "f": 70, "g": 71, "h": 72, "i": 73, "j": 74, "k": 75, "l": 76, "m": 77, "n": 78, "o": 79, "p": 80, "q": 81, "r": 82, "s": 83, "t": 84, "u": 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90, "{": 91, "|": 92, "}": 93}
const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key] === value);
var model;
$("#generate").hide();
$("#display_output").hide();
$("#outputLoading").hide();


const stopLoading = ()=>{
    $("#loadingButton").hide()
    $("#generate").show()
}
const stopSpinner = () =>{
    $("#outputLoading").hide();
}

$("#generate").on("click",function(e){
    e.preventDefault();
    let input = $("#input").val()
    let num_gen = Number($("#num_gen").val())
    if(input === ""){
        alert("Enter some starting characters")
    }
    else{
        $("#generate").prop("disabled", true)
        $("#outputLoading").show();
        predictText(input,num_gen)
    }
})


const loadModel = async ()=>{
    console.log("Loading Model")
    model = await tf.loadLayersModel("https://raw.githubusercontent.com/uragirii/Friends-Generator/master/Website/Models/Model%203/model.json")
    console.log("Model Loaded")
    stopLoading()
} 

const updateText = (text)=>{

    document.getElementById("output").textContent=text
}

$("#generateMore").on("click", function(e){
  e.preventDefault();
  let text = $("#output").text()
  let num_gen = Number($("#num_gen").val())
  predictText(text, num_gen,false)
})

const encodeText = (text)=>{
    let encoded = []
    for(let i=0;i<text.length;++i){
        encoded.push(encodings[text[i]])
    }
    return encoded
}

const decodeText = (encodedText)=>{
    decodedText = ""
    for(let i=0;i<encodedText.length;++i){
        decodedText+=getKeyByValue(encodings, encodedText[i])
    }
    return decodedText
}

const predictText = (text, num_generate,reset=true)=>{
    input_eval = encodeText(text)
    input_eval = tf.expandDims(input_eval, 0)
    text_generated = ""
    if(reset){
      model.resetStates()    
    }
    for(let i=0;i<num_generate;++i){
        let predictions = model.predict(input_eval)
        predictions = tf.squeeze(predictions,0)

        predicted_id = tf.multinomial(predictions,1).arraySync().pop().pop()
        
        input_eval = tf.expandDims([predicted_id],0)
        text_generated+=getKeyByValue(encodings, predicted_id)
    }
    updateText(text+text_generated)
    $("#display_output").show();
    return text_generated
}

loadModel()

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

