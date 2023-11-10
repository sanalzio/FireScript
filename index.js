const fsels = document.getElementsByTagName("firescript");
let globaldefinitions = {};
for (let ein = 0; ein < fsels.length; ein++) {
	const thisScriptElement = fsels[ein];
	const thisElement = thisScriptElement.parentNode;
	let filecon = thisScriptElement.innerHTML;
	let lines = filecon.split("\n");

	let definitions = {};
	let points = {};
	let lastgoto = 0;
	let lastcondition = false;
	let incon = false;
	let injsblock = false;
	let incssblock = false;
	let ineventblock = false;
	let infseventblock = false;
	let lastblockevent = "click";
	let lastblockfsevent = "click";
	let eventblock = "";
	let fseventblock = "";
	let jsblock = "";
	let cssblock = "";

	function sleep(ms) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if (new Date().getTime() - start > ms) {
				break;
			}
		}
	}

	function remtab(text) {
		let lines = text.split("\n");
		let stripped_lines = lines.map((line) => {
			return line.trimLeft();
		});
		return stripped_lines.join("\n");
	}
	function main(tlines) {
		for (let index = 0; index < tlines.length; index++) {
			let line = remtab(tlines[index].replace("\r", ""));
			if (line == "end" || line == "###") {
				incon = false;
				continue;
			}
			if (line.startsWith("'''")) {
				if (ineventblock) {
					eval(
						'thisElement.addEventListener("' +
							lastblockevent +
							'", () => {' +
							eventblock +
							"});"
					);
				} else {
					if (line.split(" ").length === 1) {
						lastblockevent = "click";
					} else {
						lastblockevent = line.split(" ")[1];
					}
				}
				ineventblock = !ineventblock;
				continue;
			}
			if (line.startsWith("$$$")) {
				if (infseventblock) {
					eval(
						'thisElement.addEventListener("' +
							lastblockfsevent +
							'", () => {main(' +
							JSON.stringify(fseventblock.split("\n")) +
							");});"
					);
				} else {
					if (line.split(" ").length === 1) {
						lastblockfsevent = "click";
					} else {
						lastblockfsevent = line.split(" ")[1];
					}
				}
				infseventblock = !infseventblock;
				continue;
			}
			if (line == '"""') {
				if (injsblock) {
					eval(jsblock);
				}
				injsblock = !injsblock;
				continue;
			}
			if (line == "```") {
				if (incssblock) {
					thisElement.style = cssblock;
				}
				incssblock = !incssblock;
				continue;
			}
			for (let key in definitions) {
				if (definitions.hasOwnProperty(key)) {
					line = line.replaceAll("${" + key + "}", definitions[key]);
				}
			}
			for (let key in globaldefinitions) {
				if (globaldefinitions.hasOwnProperty(key)) {
					line = line.replaceAll("${" + key + "}", globaldefinitions[key]);
				}
			}
			if (line.startsWith("//")) {
				continue;
			}
			if (injsblock) {
				jsblock += line + "\n";
				continue;
			}
			if (incssblock) {
				cssblock += line + "\n";
				continue;
			}
			if (ineventblock) {
				eventblock += line + "\n";
				continue;
			}
			if (infseventblock) {
				fseventblock += line + "\n";
				continue;
			}
			let arg = line.split(" ");
			let cmd = arg[0];
			function editLine(linecontent) {
				line = remtab(linecontent);
				arg = remtab(linecontent).split(" ");
				cmd = arg[0];
			}
			if (incon == true && !lastcondition) {
				continue;
			}
			if (line.includes("$lower{")) {
				for (let ind = 0; ind < arg.length; ind++) {
					if (!arg[ind].includes("$lower{")) {
						continue;
					}
					const th = arg.slice(ind).join(" ");
					if (th.includes("$lower{")) {
						if (definitions[th.slice(7, th.length - 1)]) {
							editLine(line.replace(th, definitions[th.slice(7, th.length - 1)].toLowerCase()));
						} else if (globaldefinitions[th.slice(7, th.length - 1)]) {
							editLine(line.replace(th, globaldefinitions[th.slice(7, th.length - 1)].toLowerCase()));
						}
					}
				}
			}
			if (line.includes("$upper{")) {
				for (let ind = 0; ind < arg.length; ind++) {
					if (!arg[ind].includes("$upper{")) {
						continue;
					}
					const th = arg.slice(ind).join(" ");
					if (th.includes("$upper{")) {
						if (definitions[th.slice(7, th.length - 1)]) {
							editLine(line.replace(th, definitions[th.slice(7, th.length - 1)].toUpperCase()));
						} else if (globaldefinitions[th.slice(7, th.length - 1)]) {
							editLine(line.replace(th, globaldefinitions[th.slice(7, th.length - 1)].toUpperCase()));
						}
					}
				}
			}
			if (line.includes("$js{")) {
				for (let ind = 0; ind < arg.length; ind++) {
					if (!arg[ind].includes("$js{")) {
						continue;
					}
					const th = arg.slice(ind).join(" ");
					if (th.includes("$js{")) {
						editLine(line.replace(th, eval(th.slice(4, th.length - 1))));
					}
				}
			}
			if (line.includes("$date{")) {
				for (let ind = 0; ind < arg.length; ind++) {
					const th = arg[ind];
					if (th.includes("$date{")) {
						if (th=="$date{}") {
							editLine(
								line.replace(
									arg[ind],
									Date().toString()
								)
							);
						} else {
							editLine(
								line.replace(
									arg[ind],
									eval(
										"new Date().get" +
											th
												.slice(6, th.length - 1)
												.charAt(0)
												.toUpperCase() +
											th.slice(6, th.length - 1).slice(1) +
											"()"
									).toString()
								)
							);
						}
					}
				}
			}
			if (line.includes("$[")) {
				for (let ind = 0; ind < arg.length; ind++) {
					const th = arg[ind];
					if (th.includes("$[")) {
						editLine(
							line.replace(arg[ind], eval(th.slice(2, th.length - 1)).toString())
						);
					}
				}
			}
			switch (cmd) {
				case "import":
					fetch(window.location.href.split("/").slice(0, window.location.href.split("/").length-1).join("/")+"/"+arg.slice(1).join(" ")+".fs")
						.then((response) => response.text())
						.then((content) => {
							main(content.split("\n"));
						});
					break;
				case "if":
					if (eval(arg.slice(1).join(" "))) {
						lastcondition = true;
						incon = true;
					} else {
						lastcondition = false;
						incon = true;
					}
					break;
				case "else":
					lastcondition = !lastcondition;
					incon = true;
					break;
				case "definejs":
					definitions[arg[1]] = eval(arg.slice(2).join(" "));
					break;
				case "define":
					definitions[arg[1]] = arg.slice(2).join(" ");
					break;
				case "confirm":
					if (confirm(arg.slice(1).join(" "))) {
						lastcondition = true;
					}
					break;
				case "randint":
					definitions[arg[1]] = (
						Math.floor(Math.random() * Number(arg[3])) + Number(arg[2])
					).toString();
					break;
				case "getinp":
					definitions[arg[1]] = prompt(arg.length < 3 ? "" : arg.slice(2).join(" "));
					break;
				case "gdefinejs":
					definitions[arg[1]] = eval(arg.slice(2).join(" ")).toString();
					break;
				case "gdefine":
					globaldefinitions[arg[1]] = arg.slice(2).join(" ");
					break;
				case "grandint":
					globaldefinitions[arg[1]] = (
						Math.floor(Math.random() * Number(arg[3])) + Number(arg[2])
					).toString();
					break;
				case "ggetinp":
					globaldefinitions[arg[1]] = prompt(
						arg.length < 3 ? "" : arg.slice(2).join(" ")
					);
					break;
				case "point":
					points[arg[1]] = index;
					break;
				case "break":
					index = lastgoto;
					break;
				default:
					break;
			}
			switch (cmd) {
				case "jseval":
					eval(arg.slice(1).join(" "));
					break;
				case "write":
					document.write(arg.slice(1).join(" "));
					break;
				case "writeln":
					document.writeln(arg.slice(1).join(" "));
					break;
				case "goto":
					lastgoto = index;
					index = points[arg[1]];
					break;
				case "log":
					console.log(arg.slice(1).join(" "));
					break;
				case "delay":
					sleep(Number(arg[1]));
					break;
				case "alert":
					alert(arg.slice(1).join(" "));
					break;
				case "groupval":
					console.log(
						arg.slice(1).join(" ").split(",")[0],
						arg.slice(1).join(" ").split(",").slice(1).join(",")
					);
					break;
				case "group":
					console.group(arg.slice(1).join(" "));
					break;
				case "groupcollapsed":
					console.groupCollapsed(arg.slice(1).join(" "));
					break;
				case "groupend":
					console.groupEnd();
					break;
				case "log2":
					console.log(
						JSON.parse(arg.slice(1).join(" "))[0],
						JSON.parse(arg.slice(1).join(" "))[1]
					);
					break;
				case "assert":
					console.assert(
						eval(arg.slice(1).join(" ").split(",")[0]),
						arg.slice(1).join(" ").split(",").slice(1).join(",")
					);
					break;
				case "style":
					thisElement.style = arg[1] + ":" + arg.slice(2).join(" ") + ";";
					break;
				default:
					break;
			}
		}
	}
	if (thisScriptElement.getAttribute("src")) {
		fetch(window.location.href.split("/").slice(0, window.location.href.split("/").length-1).join("/")+"/"+thisScriptElement.getAttribute("src").toString())
			.then((response) => response.text())
			.then((content) => {
				main(content.split("\n"));
			});
	} else {main(lines);}
}
