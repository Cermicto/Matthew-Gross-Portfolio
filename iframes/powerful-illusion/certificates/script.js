d = document
d.gebi = d.getElementById
d.gebc = d.getElementsByClassName
d.gebt = d.getElementsByTagName
d.ce = d.createElement

w = window
w.st = w.setTimeout
w.si = w.setInterval

certThumbs = d.gebc('cert-thumb')
certDisplayCloseBtn = null

for (var i = 0; i < certThumbs.length; i++) {
    certThumbs[i].onclick = function() {
        console.log(this)
        embededCertSrc = this.getAttribute('pdflink')
        certDisplay = getCertDisplay(embededCertSrc)
        d.body.appendChild(certDisplay)

        d.gebi('certDisplay').classList.add('cert-in')
        
        certDisplayCloseBtn = d.gebi('certDisplayClose')
        certDisplayCloseBtn.onclick = function () {                
            d.gebi('certDisplay').classList.remove('cert-in')
            d.gebi('certDisplay').classList.add('cert-out')

            w.setTimeout(function() {
                d.gebi('certDisplay').remove()
            }, 1001)
        }
    }
}

function getCertDisplay (certSrc) {
    certDisplay = d.ce('div')
    certDisplay.id = 'certDisplay'
    certDisplay.className = 'cert-display'
    certDisplay.innerHTML = `<span id="certDisplayClose" class="cert-display-close">x</span>
                <embed
                    src="${certSrc}"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                />`

    return certDisplay
}

siteTitle = d.gebi('siteTitle')
titleIsAnimating =  false

siteTitle.onmouseover = function () {

    if (!titleIsAnimating) {
        titleIsAnimating = true
        
        d.gebi('titleLeft').classList.remove('title-left-in')
        d.gebi('titleRight').classList.remove('title-right-in')
        d.gebi('rect1').classList.remove('rect-1')
        d.gebi('rect2').classList.remove('rect-2')
        d.gebi('rect3').classList.remove('rect-3')

        w.setTimeout(function() {
            d.gebi('titleLeft').classList.add('title-left-in')
            d.gebi('titleRight').classList.add('title-right-in')
            d.gebi('rect1').classList.add('rect-1')
            d.gebi('rect2').classList.add('rect-2')
            d.gebi('rect3').classList.add('rect-3')

        }, 500)

        w.setTimeout(function() {
            titleIsAnimating = false
        }, 5000)
    }
}

certificateContainers = d.gebc('certificate-container')

for (var i = 0; i < certificateContainers.length; i++) {
    certificateContainers[i].style.animationDelay = (i * 0.25) + 1 + 's'
}

lettersCloseIns = d.gebc('letters-close-in')

for (var i = 0; i < lettersCloseIns.length; i++) {
    lettersCloseIns[i].style.animationDelay = (i * 1.5) + 1 + 's'
}