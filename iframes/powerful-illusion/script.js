d = document
d.ce = d.createElement
d.gebi = d.getElementById
d.gebc = d.getElementsByClassName
d.gebt = d.getElementsByTagName
d.qs = d.querySelector
d.qsa = d.querySelectorAll
w = window

pages = {
    inview: "Main",
    "Main": {
        status: "inview",
        pageName: "main",
        linkName: "pageMainLink",
        animationColor: "#ff0000"
    },
    "Offerings": {
        status: "hidden",
        pageName: "offerings",
        linkName: "pageOfferingsLink",
        animationColor: "#00a1ff"
    },
    "Sessions": {
        status: "hidden",
        pageName: "sessions",
        linkName: "pageSessionsLink",
        animationColor: "#6e00ff"
    },
    "Workshops": {
        status: "hidden",
        pageName: "workshops",
        linkName: "pageWorkshopsLink",
        animationColor: "#ff7600"
    },
    "Development": {
        status: "hidden",
        pageName: "development",
        linkName: "pageDevelopmentLink",
        animationColor: "#6eff00"
    },
    "Demos": {
        status: "hidden",
        pageName: "demos",
        linkName: "pageDemosLink",
        animationColor: "#ffe000"
    },
    "Histories": {
        status: "hidden",
        pageName: "histories",
        linkName: "pageHistoriesLink",
        animationColor: "#ffe000"
    }
}

topLinks = d.gebc('top-menu-link')

for (var i = 0; i < topLinks.length; i++) {
    topLinks[i].onclick = function () {
        scroll()

        d.gebc('active')[0].classList.remove('active')
        this.classList.add('active')

        linkto = this.getAttribute('linkto')
        document.title = `Powerful Illusion | ${linkto}`
        d.gebi(pages.inview.toLowerCase()).classList.add('hidden-top')
        pages[pages.inview].status = 'hidden'
        lastPage = pages.inview
        window.setTimeout(function() {
            if (d.gebi(`${lastPage.toLowerCase()}H2`).classList.contains('h2-in')) {
                d.gebi(`${lastPage.toLowerCase()}H2`).classList.remove('h2-in')
            }
        }, 1000)

        pages[linkto].status = 'inview'
        pages.inview = linkto
        d.gebi(linkto.toLowerCase()).classList.remove('hidden-top')
        d.gebi(`${linkto.toLowerCase()}H2`).classList.remove('h2-in')
        window.setTimeout(function() {
            d.gebi(`${linkto.toLowerCase()}H2`).classList.add('h2-in')
        }, 1000)

        if (d.gebi('bgStyle')) {
            d.gebi('bgStyle').remove()
        }

        bgStyle = d.ce('style')
        bgStyle.id="bgStyle"
        bgStyle.innerHTML = `.ring {
            border: 1px solid ${pages[pages.inview].animationColor};
        }
        .get-background {
            background-color: ${pages[pages.inview].animationColor};
        }.
        .get-border-color {
            border-color: ${pages[pages.inview].animationColor};
        }
        @keyframes trailFade {
          from {
            opacity: 100;
            transform: scale(0.2);
            background-color: ${pages[pages.inview].animationColor};
            border: 1px solid ${pages[pages.inview].animationColor};
          }
          to {
            opacity: 0;
            transform: scale(0.8);
            background-color: transparent;
            border: 1px solid lightslategray;
          }
        }`
        

        document.body.appendChild(bgStyle)
    }
}

function scroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

offerings = {
    "ecommerce": `<h3>E-Commerce</h3><p>Have a site that needs the ability to take customer orders? I can help connect simple payment systems like PayPal or even help integrate credit card transaction processing system APIs (Application Programming Interfaces). Basically, connect for you the blocks to enable processing payments. If you have a shopping cart system already in mind I can help with setup of that as well.</p>`,
    "emailCampaigns": `<h3>Email Campaigns</h3><p>If keeping in touch with your lists of customers is on your mind I can help with several systems out there like MailChimp or Constant Contact. From site integration to managing campaigns through provided web interfaces, I've got you covered.<p>`,
    "salesMarketing": `<h3>Sales and Marketing</h3><p>From SalesForce to marketing ideas geared toward your customer base; I have experience with all of that over several industries.</p>`,
    "automation": `<h3>Automation</h3><p>On the front-end I can help automation of customer orders including email notifications to you and them and directing them to the next step(s).</p><p>On the back-end I can help integrate methods to get your site backed up and stored or packaged and shipped to the host.</p>`,
    "bugFixes": `<h3>Bug Fixes</h3><p>Sites get bugs from time to time. If something stops working or is just bugging you I can straighten it out exactly how you want.</p>`,
    "installations": `<h3>Installations</h3><p>Certain office and other systems require certain configurations according to the manufacturers of the software. I can ensure your software gets installed and working to specification.</p>`,
    "consulting": `<h3>Consulting</h3><p>Have expansion or replacement considerations? I've consulted across many industries from small business to enterprise levels on software and web capabilities to get the job done. I can also provide cost estimates for any direction you would like to go.</p>`,
    "entireWebsites": `<h3>Entire Websites</h3><p>I can build entire websites for you from scratch or integrate with content management systems you would like to use. </p>`,
    "websitesOnAPlatform": `<h3>Websites on a Platform</h3><p>Just need your site configured on a platform such as WordPress or Shopify? I can help get the right themes and plugins installed and everything operating just how you want.</p>`,
    "socialMediaCampaigns": `<h3>Social Media Campaigns</h3><p>I have experience with small business and personal social media campaigning and can help you manage your followings on the like along with other social media platforms.</p>`,
    "onlineReputationManagement": `<h3>Online Reputation Management</h3><p>Are unflattering or just wrong search results coming up for your name or business? I can help manage web content to get the right stuff back on top.</p>`,
    "siteBackupAndRestore": `<h3>Site Backup and Restore</h3><p>I can create automatic backups of your site and be on hand if they go down for some reason to get the last working copy back to your customers.</p>`,
    "deviceCompatibility": `<h3>Device Compatibility</h3><p>Of course we all need our sites to function well across devices, from phones to tablets to desktop and laptop screens. I can help your website cater to all options.</p>`,
    "searchEngineOptimization": `<h3>Search Engine Optimization</h3><p>Getting your site to occur for certain keywords in your companies domain is a specialty of mine; from Google AdWords campaigns to on-page site optimizations.</p>`,
    "siteSpeed": `<h3>Site Speed</h3><p>If your site is loading slow there are many things to help on all sides of the system, from your host to your website code itself. There are also external resources to help deliver your site at greater speeds.</p>`,
    "emailBlacklistingRecovery": `<h3>Email Blacklisting Recovery</h3><p>If your campaigns cause your site domain email server to become blacklisted I can help get it back to sparkling new.</p>`,
    "interactivity": `<h3>Interactivity</h3><p>Sometimes all you need are more user-friendly slight animations to liven things up and keep users knowing what they are interacting with. </p>`,
    "userEngagement": `<h3>User Engagement</h3><p>I can help provide direct messaging to your users live or even IP phone calls routed directly to someone you have on call.</p>`,
    "apiIntegration": `<h3>API Integration</h3><p>Application Programming Interfaces are available from tons of websites out there, from integrating live feeds from Facebook to back-end user processing systems.</p>`,
    "trafficMonetization": `<h3>Traffic Monetization</h3><p>Want relevant ads to work for you on your site. I can help set it up to drive users from your content to direct sales relevant to them; giving you commission for every sale.</p>`,
    "siteSecurity": `<h3>Site Security</h3><p>Worried about getting hacked? It's not such a big issue as it used to be but I can help ensure you that your website will be kept safe from attack.</p>`,
    "customAnimation": `<h3>Custom Animation</h3><p>Just like here on this site I can code animated parts to your site and give it a more enjoyable experience.</p>`,
    "hostingAndDomainNameManagement": `<h3>Hosting and Domain Name Management</h3><p>From choosing the right host(s) to keeping your domain names easy to manage. I can help set up or facilitate wherever your sites currently are.</p>`,
    "socialSharingIntegrations": `<h3>Social Sharing Integrations</h3><p>Want to set up easy social media sharing of your pages or posts? I can help on all social media platforms.</p>`
}

offCats = d.gebc('offering-category')
currentCat = 'ecommerce'

for (var i = 0; i < offCats.length; i++) {
    offCats[i].onclick = function () {

        d.gebi(currentCat).classList.remove('current-ob-cat')

        this.classList.add('current-ob-cat')
        currentCat = this.id

        offeringBlock = d.ce('div')
        offeringBlock.id = "currentOB"
        offeringBlock.innerHTML = offerings[currentCat]

        d.gebi('currentOffering').innerHTML = ''
        d.gebi('currentOffering').appendChild(offeringBlock)
    }
}

certificationsLink = d.gebi('certificationsLink')

certificationsLink.onclick = function () {
    certsWindow = d.ce('div')
    certsWindow.id = 'certsWindow'
    certsWindow.className = 'certs-in'
    certsWindow.innerHTML = `<span id="closeCertsWindowBtn">x</span>
<iframe class="certs-iframe" src="certificates/index.html"></iframe>`

    d.body.appendChild(certsWindow)

    closeCertsWindowBtn = d.gebi('closeCertsWindowBtn')

    closeCertsWindowBtn.onclick = function() {
        certsWindow = d.gebi('certsWindow')
        certsWindow.classList.add('certs-out')
        window.setTimeout(function() {
            certsWindow.remove()
        }, 1001)
    }
}

d.addEventListener('mousemove', (e) => {
    const trail = d.createElement('div')

    trail.className = 'trail'

    trail.style.left = `${e.clientX - 5}px`
    trail.style.top = `${e.clientY - 5}px`

    d.body.appendChild(trail)

    setTimeout(function() {
        trail.remove()
    }, 2000)
})

d.addEventListener('touchmove', (e) => {
    const trail = d.createElement('div')

    trail.className = 'trail'

    trail.style.left = `${e.targetTouches[0].clientX - 5}px`
    trail.style.top = `${e.targetTouches[0].clientY - 5}px`

    d.body.appendChild(trail)

    setTimeout(function() {
        trail.remove()
    }, 2000)
})

avatarImages = d.qsa('.avatar-image')

for (let index in avatarImages) {
    avatarImages[index].src = avatarSrc
}