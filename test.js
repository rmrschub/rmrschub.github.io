





var classNames = [];
var model;

/*
load the class names 
*/
//async function loadDict() {
//  
//    loc = 'model2/class_names.txt'
//    console.log(loc)
//    await $.ajax({
//        url: loc,
//        dataType: 'text',
//    }).done(success);
//}

/*
load the class names
*/
function success(data) {
    const lst = data.split(/\n/)
    for (var i = 0; i < lst.length - 1; i++) {
        let symbol = lst[i]
        classNames[i] = symbol
    console.log(classNames)	    
    }
}
/*
get the the class names 
*/
function getClassNames(indices) {
    var outp = []
    for (var i = 0; i < indices.length; i++)
        outp[i] = classNames[indices[i]]
    console.log(outp)	
    return outp
}
/*
find predictions
*/
function findTopValues(inp, count) {
    var outp = [];
    let indices = findIndicesOfMax(inp, count)
    // show  scores
    for (var i = 0; i < indices.length; i++)
        outp[i] = inp[indices[i]]
    return outp
}
/*
get indices of the top probs
*/
function findIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function(a, b) {
                return inp[b] - inp[a];
            }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}
function preprocess(img)
{

    //convert the image data to a tensor 
    let tensor = tf.fromPixels(img, 1)
    const batched = tensor.expandDims(0)
    return batched

}
/*
get the prediction 
*/
function predict(imgData) {

        var pred = model.predict(preprocess(imgData)).dataSync()
        console.log(pred)            
        document.getElementById("Probability").innerHTML = pred
}

async function start(){
    
    if (!model) {
        model = await tf.loadModel('https://rmrschub.github.io/elpv_resnet50/model.json', strict=true)
        var status = document.getElementById('status')
        status.innerHTML = 'Model Loaded'
    }
    
    img = document.getElementById('elpv_image')
    predict(img)         
}