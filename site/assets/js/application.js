// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

/*!
 * JavaScript for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Copyright 2011-2022 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 * For details, see https://creativecommons.org/licenses/by/3.0/.
 */

/* global ClipboardJS: false, bootstrap: false */

(function () {
  'use strict'

  // Scroll the active sidebar link into view
  var sidenav = document.querySelector('.bd-sidebar')
  if (sidenav) {
    var sidenavHeight = sidenav.clientHeight
    var sidenavActiveLink = document.querySelector('.bd-links-nav .active')
    var sidenavActiveLinkTop = sidenavActiveLink.offsetTop
    var sidenavActiveLinkHeight = sidenavActiveLink.clientHeight
    var viewportTop = sidenavActiveLinkTop
    var viewportBottom = viewportTop - sidenavHeight + sidenavActiveLinkHeight

    if (sidenav.scrollTop > viewportTop || sidenav.scrollTop < viewportBottom) {
      sidenav.scrollTop = viewportTop - (sidenavHeight / 2) + (sidenavActiveLinkHeight / 2)
    }
  }

  // Tooltip and popover demos
  document.querySelectorAll('.tooltip-demo, .bd-navbar')
    .forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip, {
        selector: '[data-bs-toggle="tooltip"]'
      })
    })

  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(function (popover) {
      new bootstrap.Popover(popover)
    })

  var toastPlacement = document.getElementById('toastPlacement')
  if (toastPlacement) {
    document.getElementById('selectToastPlacement').addEventListener('change', function () {
      if (!toastPlacement.dataset.originalClass) {
        toastPlacement.dataset.originalClass = toastPlacement.className
      }

      toastPlacement.className = toastPlacement.dataset.originalClass + ' ' + this.value
    })
  }

  document.querySelectorAll('.bd-example .toast')
    .forEach(function (toastNode) {
      var toast = new bootstrap.Toast(toastNode, {
        autohide: false
      })

      toast.show()
    })

  var toastTrigger = document.getElementById('liveToastBtn')
  var toastLiveExample = document.getElementById('liveToast')
  if (toastTrigger) {
    toastTrigger.addEventListener('click', function () {
      var toast = new bootstrap.Toast(toastLiveExample)

      toast.show()
    })
  }

  var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  var alertTrigger = document.getElementById('liveAlertBtn')

  function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
  }

  if (alertTrigger) {
    alertTrigger.addEventListener('click', function () {
      alert('Nice, you triggered this alert message!', 'success')
    })
  }

  // Demos within modals
  document.querySelectorAll('.tooltip-test')
    .forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip)
    })

  document.querySelectorAll('.popover-test')
    .forEach(function (popover) {
      new bootstrap.Popover(popover)
    })

  // Indeterminate checkbox example
  document.querySelectorAll('.bd-example-indeterminate [type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.indeterminate = true
    })

  // Disable empty links in docs examples
  document.querySelectorAll('.bd-content [href="#"]')
    .forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault()
      })
    })

  // Modal relatedTarget demo
  var exampleModal = document.getElementById('exampleModal')
  if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', function (event) {
      // Button that triggered the modal
      var button = event.relatedTarget
      // Extract info from data-bs-* attributes
      var recipient = button.getAttribute('data-bs-whatever')

      // Update the modal's content.
      var modalTitle = exampleModal.querySelector('.modal-title')
      var modalBodyInput = exampleModal.querySelector('.modal-body input')

      modalTitle.textContent = 'New message to ' + recipient
      modalBodyInput.value = recipient
    })
  }

  // Toggle color modes

  var root = document.documentElement
  var activeTheme = localStorage.getItem('theme')
  var activeThemeIcon = document.querySelector('.theme-icon-active use')

  var checkSystemTheme = function () {
    // if OS dark mode is set, and there's no stored theme, set the theme to dark (but don't store it)
    if (window.matchMedia('(prefers-color-scheme: dark)').matches && !activeTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      // otherwise, set the theme to the default (light)
      document.documentElement.removeAttribute('data-theme')
    }
  }

  var setTheme = function (theme) {
    document.querySelectorAll('[data-theme-value]').forEach(function (el) {
      el.classList.remove('active')
    })

    var btnToActive = document.querySelector('[data-theme-value="' + theme + '"]')
    var svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    btnToActive.classList.add('active')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
  }

  document.querySelectorAll('[data-theme-value]')
    .forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var theme = this.getAttribute('data-theme-value')

        setTheme(theme)

        if (theme === 'auto') {
          root.removeAttribute('data-theme')
          localStorage.removeItem('theme')
          checkSystemTheme()
        } else {
          root.setAttribute('data-theme', theme)
          localStorage.setItem('theme', theme)
        }
      })
    })

  if (activeTheme) {
    root.setAttribute('data-theme', activeTheme)
    setTheme(activeTheme)
  } else {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      checkSystemTheme()
    })
    checkSystemTheme()
  }

  // Insert copy to clipboard button before .highlight
  var btnTitle = 'Copy to clipboard'
  var btnHtml = '<div class="bd-clipboard"><button type="button" class="btn-clipboard"><svg class="bi" width="1em" height="1em" fill="currentColor" role="img" aria-label="Copy"><use xlink:href="#clipboard"/></svg></button></div>'

  document.querySelectorAll('div.highlight')
    .forEach(function (element) {
      element.insertAdjacentHTML('beforebegin', btnHtml)
    })

  document.querySelectorAll('.btn-clipboard')
    .forEach(function (btn) {
      var tooltipBtn = new bootstrap.Tooltip(btn, { title: btnTitle })

      btn.addEventListener('mouseleave', function () {
        // Explicitly hide tooltip, since after clicking it remains
        // focused (as it's a button), so tooltip would otherwise
        // remain visible until focus is moved away
        tooltipBtn.hide()
      })
    })

  var clipboard = new ClipboardJS('.btn-clipboard', {
    target: function (trigger) {
      return trigger.parentNode.nextElementSibling
    }
  })

  clipboard.on('success', function (event) {
    var iconFirstChild = event.trigger.querySelector('.bi').firstChild
    var tooltipBtn = bootstrap.Tooltip.getInstance(event.trigger)
    var namespace = 'http://www.w3.org/1999/xlink'
    var originalXhref = iconFirstChild.getAttributeNS(namespace, 'href')
    var originalTitle = event.trigger.title

    tooltipBtn.setContent({ '.tooltip-inner': 'Copied!' })
    event.trigger.addEventListener('hidden.bs.tooltip', function () {
      tooltipBtn.setContent({ '.tooltip-inner': btnTitle })
    }, { once: true })
    event.clearSelection()
    iconFirstChild.setAttributeNS(namespace, 'href', originalXhref.replace('clipboard', 'check2'))

    setTimeout(function () {
      iconFirstChild.setAttributeNS(namespace, 'href', originalXhref)
      event.trigger.title = originalTitle
    }, 2000)
  })

  clipboard.on('error', function (event) {
    var modifierKey = /mac/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl-'
    var fallbackMsg = 'Press ' + modifierKey + 'C to copy'
    var tooltipBtn = bootstrap.Tooltip.getInstance(event.trigger)

    tooltipBtn.setContent({ '.tooltip-inner': fallbackMsg })
    event.trigger.addEventListener('hidden.bs.tooltip', function () {
      tooltipBtn.setContent({ '.tooltip-inner': btnTitle })
    }, { once: true })
  })
})()
