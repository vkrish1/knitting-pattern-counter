function returnCount() {
	console.log("wokrs??");
	var text = document.getElementById("inputField").value;

	// Get rid of any Row: prefix...
	text = text.replace(/^Row [0-9]+:\s/, '')
	
	count = calculate(text)
	
	if (count == "0"){
		count = ""
	} //don't display anyhing if 0
	
	if (count.length > 0){
		count = "Count: " + count
	}

	document.getElementById("count").innerHTML = count
}


function interpolate(text){
	/// interpolate the 3mo in the parentheses if it has it
	if (text.includes("(")){
		realCount = text.substring(text.indexOf("(")+1)
		// replace everything except the prefix with realcount
		text = text.replace(/[0-9]+\s\(.*$/, realCount)
	}
	return text
}

function calculate(text) {
	var steps = text.toLowerCase().split(/\s*,\s*/)
	var count = 0
	for (var i=0; i<steps.length; i++){

		step = interpolate(steps[i])
		var repeats = ""

		if (step.startsWith("k") || step.startsWith("p")){
			repeats = step.substring(1)	
			//console.log(step + " kniting " + repeats)
		}
		else if (step.startsWith("m1")){
			repeats = 2
			//console.log(step + " making " + repeats)
		}
		else if (step.startsWith("sl")) {
			repeats = "-" + step.substring(2)
			//console.log(step + " slipping " + repeats.substring(1))
		}
		else if (step.startsWith("k2tog")) {
			repeats = "-1"
			//console.log(step + " knit 2 together")
		}
		//console.log(step)
		if (Number.isInteger(parseInt(repeats))){
			count += parseInt(repeats)
			//console.log(count)
		}

	}
	return count.toString()
}

document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById("inputField").addEventListener("keyup", returnCount)
})
