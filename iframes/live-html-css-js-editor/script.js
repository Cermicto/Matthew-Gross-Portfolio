d = document
d.ce = d.createElement
d.gebi = d.getElementById
d.gebc = d.getElementsByClassName
d.gebt = d.getElementsByTagName

htmlCode = d.gebi('htmlCode')
cssCode = d.gebi('cssCode')
jsCode = d.gebi('jsCode')

targetFrame = d.gebi('targetFrame')

htmlColored = d.gebi('htmlColored')
cssColored = d.gebi('cssColored')
jsColored = d.gebi('jsColored')

htmlLineNumbers = d.gebi('htmlLineNumbers')
cssLineNumbers = d.gebi('cssLineNumbers')
jsLineNumbers = d.gebi('jsLineNumbers')

htmlCode.onscroll = function () {
	htmlColored.scrollTo(htmlCode.scrollLeft,htmlCode.scrollTop)
	htmlLineNumbers.scrollTo(0,htmlCode.scrollTop)
}

cssCode.onscroll = function () {
	cssColored.scrollTo(cssCode.scrollLeft,cssCode.scrollTop)
	cssLineNumbers.scrollTo(0,cssCode.scrollTop)
}

jsCode.onscroll = function () {
	jsColored.scrollTo(jsCode.scrollLeft,jsCode.scrollTop)
	jsLineNumbers.scrollTo(0,jsCode.scrollTop)

}

if (localStorage['html']) {
	htmlCode.value = localStorage['html']
} else {
	htmlCode.value = localStorage['html'] = htmlFormatted
}

if (localStorage['css']) {
	cssCode.value = localStorage['css']
} else {
	cssCode.value = localStorage['css'] = cssFormatted
}

if (localStorage['js']) {
	jsCode.value = localStorage['js']
} else {
	jsCode.value = localStorage['js'] = `d = document`
}

htmlCode.onkeyup = function () {
	localStorage['html'] = htmlCode.value
	var oneRender = renderCode()
	htmlColored.scrollTo(htmlCode.scrollLeft,htmlCode.scrollTop)
	var lineNumber = this.value.substr(0, this.selectionStart).split("\n").length
 	if (d.gebc('html-line-selected')[0]) {
 		d.gebc('html-line-selected')[0].classList.remove('html-line-selected')
 	}
	d.gebi(`html-line-${lineNumber}`).classList.add('html-line-selected')
}

htmlCode.onmouseup = function () {
	var lineNumber = this.value.substr(0, this.selectionStart).split("\n").length
 	if (d.gebc('html-line-selected')[0]) {
 		d.gebc('html-line-selected')[0].classList.remove('html-line-selected')
 	}
	d.gebi(`html-line-${lineNumber}`).classList.add('html-line-selected')
}

cssCode.onkeyup = function () {
	localStorage['css'] = cssCode.value
	var oneRender = renderCode()
	cssColored.scrollTo(cssCode.scrollLeft,cssCode.scrollTop)
	var lineNumber = this.value.substr(0, this.selectionStart).split("\n").length
	if (d.gebc('css-line-selected')[0]) {
 		d.gebc('css-line-selected')[0].classList.remove('css-line-selected')
 	}
	d.gebi(`css-line-${lineNumber}`).classList.add('css-line-selected')
}

cssCode.onmouseup = function () {
	var lineNumber = this.value.substr(0, this.selectionStart).split("\n").length
 	if (d.gebc('css-line-selected')[0]) {
 		d.gebc('css-line-selected')[0].classList.remove('css-line-selected')
 	}
	d.gebi(`css-line-${lineNumber}`).classList.add('css-line-selected')
}

jsCode.onkeyup = function () {
	localStorage['js'] = jsCode.value
	var oneRender = renderCode()
	jsColored.scrollTo(jsCode.scrollLeft,jsCode.scrollTop)
	var lineNumber = this.value.substr(0, this.selectionStart).split("\n").length
	if (d.gebc('js-line-selected')[0]) {
 		d.gebc('js-line-selected')[0].classList.remove('js-line-selected')
 	}
	d.gebi(`js-line-${lineNumber}`).classList.add('js-line-selected')
}

jsCode.onmouseup = function () {
	var lineNumber = this.value.substr(0, this.selectionStart).split("\n").length
 	if (d.gebc('js-line-selected')[0]) {
 		d.gebc('js-line-selected')[0].classList.remove('js-line-selected')
 	}
	d.gebi(`js-line-${lineNumber}`).classList.add('js-line-selected')
}

htmlCode.onkeydown = function (e) {
	if (e.key === "Tab") {     
		e.preventDefault();     
		const TAB_SIZE = 4;     
		document.execCommand('insertText', false, ' '.repeat(TAB_SIZE));
	}
}

cssCode.onkeydown = function (e) {
	if (e.key === "Tab") {     
		e.preventDefault();     
		const TAB_SIZE = 4;     
		document.execCommand('insertText', false, ' '.repeat(TAB_SIZE));
	}
}

jsCode.onkeydown = function (e) {
	if (e.key === "Tab") {     
		e.preventDefault();     
		const TAB_SIZE = 4;     
		document.execCommand('insertText', false, ' '.repeat(TAB_SIZE));
	}
}

function renderCode () {
	var html = htmlCode.value
	var css = cssCode.value
	var js = jsCode.value

	var spa = `<style>
	${css}
</style>

${html}

<script>
	${js}
</script>`

	var oneRun = Run(spa)
	htmlColored.innerHTML = replaceHtml(html)
	cssColored.innerHTML = replaceCss(css)
	jsColored.innerHTML = replaceJs(js)

 return "1"
}

function Run(spa){
   var frame = targetFrame;
   var frame = (frame.contentWindow || frame.contentDocument);
   if (frame.document) frame = frame.document;

   frame.open();
   frame.write(spa);
   frame.close();

   return "1"
}

function replaceHtml (html) {
	newHtmlString = ''

	for (var i = 0; i < html.length; i++) {
		if (html[i] + html[i+1] + html[i+2] === `div`) {
			newHtmlString += `<span class="keyword-div">div</span>`
			i += 2
		} else if (html[i] + html[i+1] + html[i+2] + html[i+3] + html[i+4] === `style`) {
			newHtmlString += `<span class="keyword-style">style</span>`
			i += 4
		} else if (html[i] + html[i+1] + html[i+2] + html[i+3] + html[i+4] + html[i+5] === `class=`) {
			newHtmlString += `<span class="keyword-class">class</span>`
			i += 4
		} else if (html[i] + html[i+1] + html[i+2] === `id=`) {
			newHtmlString += `<span class="keyword-id">id</span>`
			i += 1
		} else if (html[i-1] + html[i] === `="`) {
			newHtmlString += `<span class="quote">"</span><span class="inner-quote">`
		} else if (html[i] + html[i+1] === `">` || html[i] + html[i+1] === `" `) {
			newHtmlString += `</span><span class="quote">"</span>`
		}else if (html[i-1] + html[i] + html[i+1] === `<p>`
			|| html[i-1] + html[i] + html[i+1] === `/p>`) {
			newHtmlString += `<span class="keyword-p">p</span>`
		} else if (html[i] === `<`) {
			newHtmlString += `<span class="arrow">&lt;</span><span class="inner-arrow">`
		} else if (html[i] === `>`) {
			newHtmlString += `</span><span class="arrow">&gt;</span>`
		} else if (html[i] === `{`) {
			newHtmlString += `<span class="curly">{</span>`
		} else if (html[i] === `}`) {
			newHtmlString += `<span class="curly">}</span>`
		} else if (html[i] === `=`) {
			newHtmlString += `<span class="equal">=</span>`
		} else if (html[i] === `;`) {
			newHtmlString += `<span class="semi">;</span>`
		} else if (html[i] === `:`) {
			newHtmlString += `<span class="colon">:</span>`
		} else if (html[i] === `"`) {
			newHtmlString += `<span class="quote">"</span>`
		} else if (html[i] === `'`) {
			newHtmlString += `<span class="quote">'</span>`
		} else if (html[i] === `/`) {
			newHtmlString += `<span class="forward">/</span>`
		} else if (html[i] === `\n`) {
			newHtmlString += `<br>`
		} else if (html[i] === `\t`) {
			newHtmlString += `&nbsp;&nbsp;&nbsp;&nbsp;`
		} else if (html[i] === ` `) {
			newHtmlString += `&nbsp;`
		} else if (html[i] === `#`) {
			newHtmlString += `<span class="pound">#</span>`
		} else if (html[i] === `.`) {
			newHtmlString += `<span class="period">.</span>`
		} else {			
			newHtmlString += html[i]
		}
	}

	return newHtmlString
}




function replaceCss (css) {
	newCssString = ''

	for (var i = 0; i < css.length; i++) {
		if (css[i] === `\n`) {
			newCssString += `<br>`
		} else if (css[i] === `\t`) {
			newCssString += `&nbsp;&nbsp;&nbsp;&nbsp;`
		} else if (css[i] === ` `) {
			newCssString += `&nbsp;`
		} else if (css[i] === `{`) {
			newCssString += `<span class="curly">{</span>`
		} else if (css[i] === `}`) {
			newCssString += `<span class="curly">}</span>`
		} else if (css[i] === `#`) {
			newCssString += `<span class="pound">#</span>`
		} else if (css[i] === `.`) {
			newCssString += `<span class="period">.</span>`
		} else if (css[i] === `:`) {
			newCssString += `<span class="colon">:</span>`
		} else if (css[i] === `;`) {
			newCssString += `<span class="semi-colon">;</span>`
		} else {
			newCssString += css[i]
		}
	}

	return newCssString
}

function replaceJs (js) {
	newJsString = ''

	for (var i = 0; i < js.length; i++) {
		if (js[i] === `\n`) {
			newJsString += `<br>`
		} else if (js[i] === `\t`) {
			newJsString += `&nbsp;&nbsp;&nbsp;&nbsp;`
		} else if (js[i] === ` `) {
			newJsString += `&nbsp;`
		} else if (js[i] === `=`) {
			newJsString += `<span class="equal">=</span>`
		} else {
			newJsString += js[i]
		}
	}

	return newJsString
}

fillLineNumbers('htmlLineNumbers')
fillLineNumbers('cssLineNumbers')
fillLineNumbers('jsLineNumbers')

function fillLineNumbers (targetId) {
	idExtension = ''
	if (targetId === 'htmlLineNumbers') { idExtension = 'html' }
	if (targetId === 'cssLineNumbers') { idExtension = 'css' }
	if (targetId === 'jsLineNumbers') { idExtension = 'js' }

	for (var i = 0; i < 9999; i++) {
		line = d.ce('span')
		line.id = `${idExtension}-line-${i + 1}`
		line.classList.add('line-number')
		line.innerText = `${i + 1}`
		d.gebi(targetId).appendChild(line)
	}
}

function getCaret(el) {
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (document.selection) {
    el.focus();

    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }

    var re = el.createTextRange(),
        rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return rc.text.length;
  } 
  return 0;
}

renderCode()