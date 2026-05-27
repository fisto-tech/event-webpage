const navToggle = document.getElementById('navToggle');
const tocNav = document.getElementById('tocNav');
const navOverlay = document.getElementById('navOverlay');
function openMenu() {
    navToggle.classList.add('open');
    tocNav.classList.add('show');
    navOverlay.classList.add('show');
    navToggle.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
    navToggle.classList.remove('open');
    tocNav.classList.remove('show');
    navOverlay.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
}
navToggle.addEventListener('click', function () {
    if (tocNav.classList.contains('show')) closeMenu();
    else openMenu();
});
navOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.toc-list a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
// Keyboard: ESC to close
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") closeMenu();
});


// SHARE BUTTON LOGIC
// const shareBtn = document.getElementById('shareBtn');
// const shareMenu = document.getElementById('shareMenu');
// const copyLinkBtn = document.getElementById('copyLinkBtn');
// const copiedMsg = document.getElementById('copiedMsg');
// const shareInput = document.getElementById('shareInput');

// shareInput.value = window.location.href;

// shareBtn.addEventListener('click', function (e) {
//     e.stopPropagation();
//     const wasOpen = shareMenu.classList.contains('show');
//     document.querySelectorAll('.share-menu.show').forEach(el => el.classList.remove('show'));
//     if (!wasOpen) {
//         shareMenu.classList.add('show');
//         shareMenu.setAttribute('aria-hidden', 'false');
//         try {
//             shareInput.value = window.top.location.href;
//         } catch (e) {
//             // fallback to current window location if cross-origin blocked
//             shareInput.value = window.location.href;
//         }
//         setTimeout(() => shareInput.select(), 90);
//     } else {
//         shareMenu.classList.remove('show');
//         shareMenu.setAttribute('aria-hidden', 'true');
//     }
// });
// copyLinkBtn.addEventListener('click', function () {
//     navigator.clipboard.writeText(shareInput.value).then(function () {
//         copiedMsg.classList.add('show');
//         setTimeout(() => copiedMsg.classList.remove('show'), 1200);
//     });
//     shareInput.select();
// });

    // hide share menu on body/overlay click or Esc
    // document.addEventListener('click', e => {
    //     if (shareMenu && !shareMenu.contains(e.target) && !shareBtn.contains(e.target))
    //         shareMenu.classList.remove('show');
    // });
    // document.addEventListener('keydown', e => {
    //     if (e.key === "Escape" && shareMenu) shareMenu.classList.remove('show');
    // });


// window.addEventListener('load', function () {
//     const bgmAudio = document.getElementById('bgmAudio');
//     bgmAudio.volume = 0.15;
//     const bgmButton = document.getElementById('bgmButton');
//     let musicOn = true;

//     function toggleMusic() {
//         if (musicOn) {
//             bgmAudio.pause();
//             bgmButton.textContent = '🎵 OFF';
//             bgmButton.classList.add('off');
//             musicOn = false;
//         } else {
//             bgmAudio.play().then(function () {
//                 bgmButton.textContent = '🎵 ON';
//                 bgmButton.classList.remove('off');
//                 musicOn = true;
//             }).catch(function (error) {
//                 console.log('Could not play music:', error);
//             });
//         }
//     }

//     bgmButton.onclick = toggleMusic;

//     setTimeout(function () {
//         bgmAudio.play().catch(function (error) {
//             musicOn = false;
//             bgmButton.textContent = '🎵 OFF';
//             bgmButton.classList.add('off');
//         });
//     }, 500);

//     const goToPage1 = document.getElementById("goToPage1");

//     goToPage1.addEventListener("click", function () {
//         if ($("#flipbook").turn) {
//             $("#flipbook").turn("page", 1);
//         }

//         const audioPath = goToPage1.dataset.audioPath;
//         if (audioPath) {
//             const audio = new Audio(audioPath);
//             audio.play();
//         }
//     });

//     //  document.getElementById("whatsappShareBtn").addEventListener("click", function () {
//     //   const pageUrl = document.getElementById("shareInput").value || window.location.href;
//     //   const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(pageUrl);
//     //   window.open(whatsappUrl, "_blank");
//     // });
// });








function updateActiveThumbnail(currentPage) {
    const allLinks = document.querySelectorAll('.tb-link');
    
    // Collect all data-page values and sort descending
    const pageValues = [];
    allLinks.forEach(item => {
        const p = parseInt(item.dataset.page);
        if (!isNaN(p)) pageValues.push(p);
    });
    
    // Sort descending to find the closest page <= currentPage
    const sorted = [...new Set(pageValues)].sort((a, b) => b - a);
    const matchPage = sorted.find(p => p <= currentPage) || sorted[sorted.length - 1];

    allLinks.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.page) === matchPage) {
            item.classList.add('active');
        }
    });
}

// When clicking a thumbnail
document.querySelectorAll('.tb-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const pageNumber = parseInt(this.dataset.page);
        const audioPath = this.dataset.audioPath;

        // Navigate to flipbook page
        if ($('#flipbook').turn) {
            $('#flipbook').turn('page', pageNumber);
        }

        // Update active thumbnail
        updateActiveThumbnail(pageNumber);

        // Play audio if available
        if (audioPath) {
            const audio = new Audio(audioPath);
            audio.play().catch(err => console.log('Audio play failed:', err));
        }

        closeMenu();
    });
});

// Detect page change automatically in flipbook
$('#flipbook').bind("turned", function(event, page) {
    updateActiveThumbnail(page);
});

// Run once on page load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const firstPage = $('#flipbook').turn('page') || 1;
        updateActiveThumbnail(firstPage);
    }, 300); // Wait for flipbook to initialize
});





// ************************bottom thumnail code start ------------------------------------- -->
const navToggle1 = document.getElementById('navToggle1');
const tocNav1 = document.getElementById('tocNav1');
const navOverlay1 = document.getElementById('navOverlay1');
function openMenu1() {
    navToggle1.classList.add('open');
    tocNav1.classList.add('show');
    navOverlay1.classList.add('show');
    navToggle1.setAttribute('aria-expanded', 'true');
}1
function closeMenu1() {
    navToggle1.classList.remove('open');
    tocNav1.classList.remove('show');
    navOverlay1.classList.remove('show');
    navToggle1.setAttribute('aria-expanded', 'false');
}
navToggle1.addEventListener('click', function () {
    if (tocNav1.classList.contains('show')) closeMenu1();
    else openMenu1();
});
navOverlay1.addEventListener('click', closeMenu1);
document.querySelectorAll('.toc-list1 a').forEach(link => {
    link.addEventListener('click', closeMenu1);
});
// Keyboard: ESC to close
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") closeMenu1();
});




// // Set your current page number (dynamic)
// let currentPage = 4; // example: you are on page 4-5

// document.addEventListener("DOMContentLoaded", () => {

//     // Apply active based on current page
//     document.querySelectorAll(".tb-link").forEach(item => {
//         if (item.getAttribute("data-page") == currentPage) {
//             item.classList.add("active");
//         }
//     });

//     // On click update active thumbnail
//     document.querySelectorAll('.tb-link').forEach(item => {
//         item.addEventListener('click', function () {

//             // Remove previous active
//             document.querySelectorAll('.tb-link')
//                 .forEach(el => el.classList.remove('active'));

//             // Add active to clicked item
//             this.classList.add('active');

//             // Update currentPage variable
//             currentPage = this.getAttribute("data-page");
//         });
//     });
// });



// ************************bottom thumnail code end  ------------------------------------- -->





// ****************************share button navbar functionality start************************** 



 const shareBtn = document.getElementById('shareBtn');
        const shareModal = document.getElementById('shareModal');
        const shareOverlay = document.getElementById('shareOverlay');
        const closeBtn = document.getElementById('closeBtn');
        const shareInput = document.getElementById('shareInput');
        const copyBtn = document.getElementById('copyBtn');
        const copiedMsg = document.getElementById('copiedMsg');

        // Set link
        shareInput.value = window.top.location.href;

        // Open modal
        shareBtn.addEventListener('click', () => {
            shareModal.classList.remove('hidden');
            shareOverlay.classList.remove('hidden');
            shareInput.select();
        });

        // Close modal
        const closeModal = () => {
            shareModal.classList.add('hidden');
            shareOverlay.classList.add('hidden');
        };

        closeBtn.addEventListener('click', closeModal);
        shareOverlay.addEventListener('click', closeModal);

        // Copy link
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(shareInput.value).then(() => {
                copiedMsg.classList.remove('hidden');
                setTimeout(() => copiedMsg.classList.add('hidden'), 1500);
            });
        });

        // Social share functions
        document.getElementById('whatsappBtn').addEventListener('click', () => {
            const url = encodeURIComponent(shareInput.value);
            window.open(`https://wa.me/?text=${url}`, '_blank');
        });

        document.getElementById('twitterBtn').addEventListener('click', () => {
            const url = encodeURIComponent(shareInput.value);
            window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
        });

        document.getElementById('facebookBtn').addEventListener('click', () => {
            const url = encodeURIComponent(shareInput.value);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        });

        // LinkedIn Share
document.getElementById('linkedInBtn').addEventListener('click', () => {
    const url = encodeURIComponent(shareInput.value);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
});

        // document.getElementById('gmailBtn').addEventListener('click', () => {
        //     const url = encodeURIComponent(shareInput.value);
        //     window.open(`mailto:?subject=Check this out&body=${url}`, '_blank');
        // });

        // document.getElementById('linkedinBtn').addEventListener('click', () => {
        //     const url = encodeURIComponent(shareInput.value);
        //     window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        // });

        // document.getElementById('instagramBtn').addEventListener('click', () => {
        //     alert('Instagram sharing requires the app. Copy the link and share it manually.');
        // });

//         document.getElementById('instagramBtn').addEventListener('click', () => {
//     const url = encodeURIComponent(shareInput.value);
//     window.location.href = `intent://share?text=${url}#Intent;scheme=instagram;package=com.instagram.android;end`;
// });

// document.getElementById('instagramBtn').addEventListener('click', () => {
//     const liveURL = encodeURIComponent(shareInput.value); // your LIVE URL here
//     window.open(`https://www.instagram.com/?url=${liveURL}`, "_blank");
// });

// document.getElementById('instagramBtn').addEventListener('click', () => {

//     const link = shareInput.value;

//     // Copy the link automatically
//     navigator.clipboard.writeText(link).then(() => {

//         // Try opening Instagram app
//         window.location.href = "instagram://app";

//         // Notify user
//         alert("Link copied! Open Instagram and paste it into your post or story.");
//     });
// });


        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });





        // ****************************share button navbar functionality end************************** 
window.addEventListener('load', function () {
    const bgmAudio = document.getElementById('bgmAudio');
    bgmAudio.volume = 0.15;
    bgmAudio.muted = true; // ✅ Start muted to bypass autoplay restrictions

    const bgmButton = document.getElementById('bgmButton');
    const musicOnImg = document.getElementById('musicOnImg');
    const musicOffImg = document.getElementById('musicOffImg');

    let musicOn = true;
    let hasUnmuted = false; // Track if we've unmuted yet

    function updateIcons() {
        if (musicOn) {
            musicOnImg.classList.remove("hidden");
            musicOffImg.classList.add("hidden");
        } else {
            musicOnImg.classList.add("hidden");
            musicOffImg.classList.remove("hidden");
        }
    }

    function toggleMusic() {
        // ✅ Unmute on first interaction
        if (!hasUnmuted) {
            bgmAudio.muted = false;
            hasUnmuted = true;
        }

        if (musicOn) {
            bgmAudio.pause();
            musicOn = false;
        } else {
            bgmAudio.play().catch(function (error) {
                console.log('Could not play music:', error);
            });
            musicOn = true;
        }

        updateIcons();
    }

    bgmButton.onclick = toggleMusic;

    // ✅ Auto-unmute on ANY click on the page
    document.addEventListener('click', function unmute() {
        if (!hasUnmuted) {
            bgmAudio.muted = false;
            hasUnmuted = true;
            console.log('Audio unmuted');
        }
    }, { once: true }); // Only fires once

    // ✅ Start playing muted immediately
    bgmAudio.play().then(() => {
        console.log('Audio playing (muted initially)');
        updateIcons();
    }).catch(function (error) {
        console.log('Autoplay failed:', error);
        musicOn = false;
        updateIcons();
    });
});




// *********************home button start**************
    const goToPage1 = document.getElementById("goToPage1");

    goToPage1.addEventListener("click", function () {
        if ($("#flipbook").turn) {
            $("#flipbook").turn("page", 1);
        }

        const audioPath = goToPage1.dataset.audioPath;
        if (audioPath) {
            const audio = new Audio(audioPath);
            audio.play();
        }
    });


    // *********************home button end**************




// $('#flipbook').bind('turned', function (event, page, view) {

//   // ✅ UPDATE PAGE COUNTER WITH LAST PAGE FIX
//   const totalPages = $('#flipbook').turn('pages');
//   const pageNoElement = document.getElementById('page-no');
  
//   if (pageNoElement) {
//       if (page === 1) {
//           // First page (cover)
//           pageNoElement.textContent = `1 / ${totalPages}`;
//       } else if (page === totalPages) {
//           // Last page (back cover) - show single number
//           pageNoElement.textContent = `${totalPages} / ${totalPages}`;
//       } else if (page % 2 === 0) {
//           // Even page - show as spread
//           pageNoElement.textContent = `${page}-${page + 1} / ${totalPages}`;
//       } else {
//           // Odd page - show as spread
//           pageNoElement.textContent = `${page - 1}-${page} / ${totalPages}`;
//       }
//   }
  
//   // Update active thumbnail (your existing code)
//   updateActiveThumbnail(page);
// });






// *****************************search icon code*******************************

// ==================== SEARCH MODAL FUNCTIONALITY ====================

// ✅ SEARCH MODAL - CLICK OUTSIDE TO CLOSE
const searchIcon = document.querySelector('img[alt="search-icon"]');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const closeSearchModal = document.getElementById('closeSearchModal');

// Define your pages with search keywords
const pages = [
    { page: 1, title: "Cover Page", keywords: ["cover", "front", "home", "title", "1"] },
    { page: 2, title: "Introduction", keywords: [ "about us", "table of content"] },
    { page: 4, title: "Chapter 1", keywords: [ "taper bush pulley"] },
    
    { page: 10, title: "Conclusion", keywords: [ "timing pulley"] },
    { page: 13, title: "Cover Page", keywords: [ "poly v pulley"] },
    { page: 17, title: "Introduction", keywords: [ "sprocket"] },
    
    { page: 24, title: "Chapter 2", keywords: ["couplings","tyre coupling"] },
    
    { page: 32, title: "Introduction", keywords: [ "gear coupling"] },
    
    { page: 37, title: "Chapter 2", keywords: [ "pin bush coupling"] },
    
    { page: 41, title: "Conclusion", keywords: [ "roller chain flexible coupling"] },

    { page: 47, title: "Chapter 1", keywords: [ "curved jaw coupling"] },

    { page: 52, title: "Conclusion", keywords: [ "stright jaw coupling"] },
    
    { page: 56, title: "Introduction", keywords: [ "diverter wheels"] },
    { page: 60, title: "Introduction", keywords: [ "contact us"] },
    
];

// ✅ CLOSE SEARCH FUNCTION
const closeSearch = () => {
    searchModal.classList.add('hidden');
    searchInput.value = '';
};

// ✅ OPEN SEARCH MODAL
if (searchIcon) {
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchModal.classList.remove('hidden');
        searchInput.focus();
        searchInput.value = '';
        searchResults.innerHTML = '<p class="text-gray-500 text-center">Type to search pages...</p>';
    });
}

// ✅ CLOSE BUTTON CLICK
if (closeSearchModal) {
    closeSearchModal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeSearch();
    });
}

// ✅ CLICK ANYWHERE OUTSIDE MODAL TO CLOSE - THIS IS THE KEY!
document.addEventListener('click', (e) => {
    // Check if click is outside the search modal AND the search icon
    const isClickInsideModal = searchModal.contains(e.target);
    const isClickOnIcon = searchIcon && searchIcon.contains(e.target);
    
    // If click is outside modal and not on the search icon, close it
    if (!isClickInsideModal && !isClickOnIcon && !searchModal.classList.contains('hidden')) {
        closeSearch();
    }
});

// ✅ SEARCH INPUT - TYPE TO FILTER
// ✅ SEARCH INPUT - TYPE TO FILTER
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (!query) {
            searchResults.innerHTML = '<p class="text-gray-500 text-center">Type to search pages...</p>';
            return;
        }

        // ✅ Check if query is a number
        const queryAsNumber = parseInt(query);
        const isNumericQuery = !isNaN(queryAsNumber);

        const filtered = pages.filter(page => {
            // Match by page number if query is numeric
            if (isNumericQuery && page.page === queryAsNumber) {
                return true;
            }
            
            // Match by title or keywords
            return page.title.toLowerCase().includes(query) ||
                   page.keywords.some(kw => kw.toString().toLowerCase().includes(query));
        });

        if (filtered.length === 0) {
            searchResults.innerHTML = '<p class="text-gray-500 text-center">No results found</p>';
            return;
        }

        searchResults.innerHTML = filtered.map(page => `
            <div class="search-result-item p-3 hover:bg-gray-700 cursor-pointer border-b" data-page="${page.page}">
                <div class="text-white font-semibold">${page.title}</div>
                <div class="text-gray-400 text-sm">Page ${page.page}</div>
            </div>
        `).join('');

        // Click on result to go to page
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const pageNum = parseInt(item.dataset.page);
                if ($('#flipbook').turn) {
                    $('#flipbook').turn('page', pageNum);
                }
                closeSearch();
            });
        });
    });

    // Enter key to search or go directly to page if number
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            const pageNum = parseInt(query);
            
            // If it's a valid number, go directly to that page
            if (!isNaN(pageNum) && pageNum > 0) {
                if ($('#flipbook').turn) {
                    $('#flipbook').turn('page', pageNum);
                }
                closeSearch();
                return;
            }
            
            // Otherwise, click first result
            const firstResult = document.querySelector('.search-result-item');
            if (firstResult) firstResult.click();
        }
    });
}


// ✅ ESC KEY TO CLOSE
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
        closeSearch();
    }
});

// ✅ PREVENT CLICK INSIDE MODAL FROM CLOSING IT
searchModal.addEventListener('click', (e) => {
    e.stopPropagation();
});
// *****************************search icon code end*******************************



// *********************************zoom in zoom out button start ********************************** */
// ==================== FIXED ZOOM + SCROLL SYSTEM ====================
// ISSUE: When zoomed, clicks/scrolls were triggering page flips
// ==================== COMPLETE ZOOM SYSTEM FIX ====================
// PLACE THIS CODE AT THE END OF YOUR script.js (after all other code)
// This replaces your zoom section completely

const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomSlider = document.getElementById('zoomSlider');
const zoomPercentage = document.getElementById('zoomPercentage');
const flipbookContainer = document.getElementById('flipbook');
const wrapper = document.querySelector('.flipbook-scroll-wrapper');

let currentZoom = 100;
let isZoomed = false; // ✅ MAIN STATE: Track if zoomed
let isAnimating = false; // ✅ Prevent multiple flips during animation

// ==================== STEP 1: APPLY ZOOM ====================
function applyZoom(zoomLevel) {
    currentZoom = zoomLevel;
    const scale = zoomLevel / 100;
    
    // ✅ STEP 1A: Update zoom state
    isZoomed = scale > 1;

  
    
    if (flipbookContainer) {
        flipbookContainer.style.transform = `scale(${scale})`;
        flipbookContainer.style.transformOrigin = 'top center';
        
        // ✅ STEP 1B: When zoomed, disable all clicks on flipbook
        if (isZoomed) {
            flipbookContainer.style.pointerEvents = 'none'; // ⚠️ CRITICAL
            wrapper.classList.add('zoomed');
            wrapper.style.pointerEvents = 'auto';
            wrapper.style.overflowY = 'auto';
            wrapper.scrollTop = 0; // Reset scroll
        } else {
            flipbookContainer.style.pointerEvents = 'auto';
            wrapper.classList.remove('zoomed');
            wrapper.style.pointerEvents = 'auto';
            wrapper.style.overflowY = 'hidden';
            if (wrapper) wrapper.scrollTop = 0;
        }
    }
    
    zoomPercentage.textContent = `${zoomLevel}%`;
    zoomSlider.value = zoomLevel;
    


    // ================= DISABLE / ENABLE ZOOM BUTTONS =================
if (zoomOutBtn) {
    if (zoomLevel <= 100) {
        zoomOutBtn.style.pointerEvents = "none";
        zoomOutBtn.style.opacity = "0.4";
        zoomOutBtn.style.cursor = "not-allowed";
    } else {
        zoomOutBtn.style.pointerEvents = "auto";
        zoomOutBtn.style.opacity = "1";
        zoomOutBtn.style.cursor = "pointer";
    }
}

if (zoomInBtn) {
    if (zoomLevel >= 130) {
        zoomInBtn.style.pointerEvents = "none";
        zoomInBtn.style.opacity = "0.4";
        zoomInBtn.style.cursor = "not-allowed";
    } else {
        zoomInBtn.style.pointerEvents = "auto";
        zoomInBtn.style.opacity = "1";
        zoomInBtn.style.cursor = "pointer";
    }
}



    // showZoomFeedback(zoomLevel);
}

// ==================== STEP 2: PREVENT FLIP WHEN ZOOMED ====================
function blockFlipWhenZoomed(e) {
    if (isZoomed) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
}

// ==================== STEP 3: ZOOM BUTTON HANDLERS ====================
zoomInBtn.addEventListener('click', function() {
    if (currentZoom < 130) {
        currentZoom += 5;
        applyZoom(currentZoom);
    }
});

zoomOutBtn.addEventListener('click', function() {
    if (currentZoom > 100) {
        currentZoom -= 5;
        applyZoom(currentZoom);
    }
});

zoomSlider.addEventListener('input', function() {
    applyZoom(parseInt(this.value));
});

// ==================== STEP 4: MOUSE WHEEL ZOOM ====================
let wheelTimeout;
document.addEventListener('wheel', function(e) {
    // ✅ Only zoom if Ctrl/Cmd is pressed
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        
        clearTimeout(wheelTimeout);
        
        const delta = e.deltaY > 0 ? -5 : 5;
        let newZoom = currentZoom + delta;
        newZoom = Math.max(100, Math.min(130, newZoom));
        
        wheelTimeout = setTimeout(() => {
            applyZoom(newZoom);
        }, 10);
    }
}, { passive: false });

// ==================== STEP 5: KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Plus
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        if (currentZoom < 130) {
            currentZoom += 5;
            applyZoom(currentZoom);
        }
    }
    
    // Ctrl/Cmd + Minus
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        if (currentZoom > 100) {
            currentZoom -= 5;
            applyZoom(currentZoom);
        }
    }
    
    // Ctrl/Cmd + 0 to reset
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        applyZoom(100);
    }
});

// ==================== STEP 6: BLOCK ALL FLIPS WHEN ZOOMED ====================

// Block arrow controls
document.querySelectorAll('.ui-arrow-control').forEach(arrow => {
    arrow.addEventListener('click', blockFlipWhenZoomed, true); // ✅ use capture phase
});

// Block direct flipbook clicks
flipbookContainer.addEventListener('click', blockFlipWhenZoomed, true);

// Block page clicking
flipbookContainer.addEventListener('mousedown', blockFlipWhenZoomed, true);
flipbookContainer.addEventListener('touchstart', blockFlipWhenZoomed, true);

// ==================== STEP 7: PREVENT PAGE TURN.JS EVENTS ====================
$('#flipbook').bind('turning', function(e) {
    // ✅ If zoomed, prevent the turn event
    if (isZoomed) {
        e.preventDefault();
        return false;
    }
});

// ==================== STEP 8: SCROLL FUNCTIONALITY ====================
wrapper.addEventListener('scroll', function(e) {
    if (!isZoomed) {
        e.preventDefault();
        wrapper.scrollTop = 0;
    }
});

// ==================== STEP 9: HIDE SCROLLBAR DURING NORMAL FLIPS ====================
$('#flipbook').bind('turning', function() {
    if (wrapper && !isZoomed) {
        wrapper.classList.add('no-scrollbar');
    }
});

$('#flipbook').bind('turned', function() {
    if (wrapper && !isZoomed) {
        setTimeout(() => {
            wrapper.classList.remove('no-scrollbar');
        }, 300);
    }
});

// ==================== STEP 10: ZOOM FEEDBACK ====================
function showZoomFeedback(level) {
    let feedback = document.getElementById('zoom-feedback');
    
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'zoom-feedback';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            font-size: 24px;
            font-weight: bold;
            z-index: 99999999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
        `;
        document.body.appendChild(feedback);
    }
    
    feedback.textContent = `${level}%`;
    feedback.style.opacity = '1';
    
    clearTimeout(feedback.hideTimer);
    feedback.hideTimer = setTimeout(() => {
        feedback.style.opacity = '0';
    }, 800);
}

// ==================== STEP 11: ENSURE ALL UI WORKS ====================
// ✅ Search doesn't trigger flip (already works - search closes modal)
// ✅ Navbar doesn't trigger flip (already works - sets pointerEvents none)
// ✅ Thumbnail click doesn't flip when zoomed (search/navbar closes first)
// ✅ Autoplay doesn't trigger flip (already works - uses turn() method)
// ✅ Arrows blocked when zoomed (handled above)

// Initialize
applyZoom(100);
// ==================== ZOOM ALERT SYSTEM - COMPLETE FIX ====================
// ADD THIS CODE AFTER: applyZoom(100); in your script.js

console.log('✅ Loading Zoom Alert System...');

// ✅ STEP 1: CREATE ALERT BOX FUNCTION
function showZoomAlert(message) {
    let alertBox = document.getElementById('zoom-alert-box');

    // ================= CREATE OVERLAY =================
let alertOverlay = document.getElementById('zoom-alert-overlay');

if (!alertOverlay) {
    alertOverlay = document.createElement('div');
    alertOverlay.id = 'zoom-alert-overlay';
    alertOverlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 999999999999998;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    document.body.appendChild(alertOverlay);
}

    
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'zoom-alert-box';
        alertBox.style.cssText = `
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #0D407D;
            color: white;
            padding: 25px 50px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: 200;
            z-index: 999999999999999;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            opacity: 0;
            transition: opacity 0.3s ease;
            text-align: center;
            // border: 3px solid #ffffffff;
            pointer-events: all;
        `;
        document.body.appendChild(alertBox);
    }
    
    alertBox.textContent = message;
    alertBox.style.opacity = '1';
    alertBox.style.pointerEvents = 'all';
    alertOverlay.style.opacity = '1';
alertOverlay.style.pointerEvents = 'auto';

    
    clearTimeout(alertBox.hideTimer);
    alertBox.hideTimer = setTimeout(() => {
        alertBox.style.opacity = '0';
    }, 2500);

    alertBox.hideTimer = setTimeout(() => {
    alertBox.style.opacity = '0';
    alertOverlay.style.opacity = '0';
    alertOverlay.style.pointerEvents = 'none';
}, 2500);

}

// ✅ STEP 2: FIX SEARCH ICON ALERT
const searchIconElement = document.querySelector('img[alt="search-icon"]');
if (searchIconElement) {
    searchIconElement.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert(' Cannot search while zoomed, Please zoom out first');
            // alert('Cannot search while zoomed, Please zoom out first');
            return false;
        }
    }, true);
    // console.log('✅ Search alert added');
}

// ✅ STEP 3: FIX TOP NAVBAR ALERT
const navToggleElement = document.getElementById('navToggle');
if (navToggleElement) {
    navToggleElement.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert('Cannot open menu while zoomed, Please zoom out first');
            // alert('Cannot open menu while zoomed, Please zoom out first');
            return false;
        }
    }, true);
    // console.log('✅ Top navbar alert added');
}

// ✅ STEP 4: FIX BOTTOM NAVBAR/THUMBNAIL ALERT
const navToggleElement1 = document.getElementById('navToggle1');
if (navToggleElement1) {
    navToggleElement1.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert(' Cannot open thumbnails while zoomed, Please zoom out first');
            // alert('Cannot open thumbnails while zoomed, Please zoom out first');
            return false;
        }
    }, true);
    // console.log('✅ Bottom navbar alert added');
}

// ✅ STEP 5: FIX THUMBNAIL LINK CLICKS
document.querySelectorAll('.tb-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert(' Cannot select page while zoomed, Please zoom out first');
            // alert('Cannot select page while zoomed, Please zoom out first');
            return false;
        }
    }, true);
});
// console.log('✅ Thumbnail alerts added');


// ✅ STEP 9: FIX AUTOPLAY BUTTON - BLOCK AND DISABLE
const autoPlayBtnElement = document.getElementById('autoPlayBtn');
if (autoPlayBtnElement) {
    autoPlayBtnElement.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert(' Cannot use autoplay while zoomed, Please zoom out first');
            // alert('Cannot use autoplay while zoomed, Please zoom out first');
            return false;
        }
    }, true);
    
    // Also disable autoplay progress bar interaction when zoomed
    const autoPlayProgressFillElement = document.getElementById('autoPlayProgressFill');
    const progressContainerElement = document.querySelector('.autoplay-progress-container');
    
    if (progressContainerElement) {
        progressContainerElement.addEventListener('click', function(e) {
            if (isZoomed) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                showZoomAlert(' Cannot seek while zoomed, Please zoom out first');
                return false;
            }
        }, true);
    }
    // console.log('✅ Autoplay button and progress bar alerts added');
}



// ✅ STEP 11: FIX HOME BUTTON ALERT
const goToPage1Element = document.getElementById('goToPage1');
if (goToPage1Element) {
    goToPage1Element.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert(' Cannot navigate while zoomed, Please zoom out first');
            
            return false;
        }
    }, true);
    // console.log('✅ Home button alert added');
}

// ✅ STEP 12: FIX ARROW BUTTONS ALERT
const leftArrowElement = document.getElementById('leftArrow');
const rightArrowElement = document.getElementById('rightArrow');

if (leftArrowElement) {
    leftArrowElement.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert('Cannot flip while zoomed, Please zoom out first');
            return false;
        }
    }, true);
}

if (rightArrowElement) {
    rightArrowElement.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert('Cannot flip while zoomed, Please zoom out first');
            return false;
        }
    }, true);
}
// console.log('✅ Arrow buttons alerts added');

// ✅ STEP 13: BLOCK AUTOPLAY WHEN ZOOMING IN
const originalApplyZoom = window.applyZoom;
window.applyZoom = function(zoomLevel) {
    const wasZoomed = isZoomed;
    const scale = zoomLevel / 100;
    const willBeZoomed = scale > 1;
    
    // If zooming in and autoplay is running, stop it
    if (!wasZoomed && willBeZoomed && isAutoPlaying) {
        stopAutoPlay();
        // showZoomAlert(' Autoplay stopped, Zoom activated');
    }
    
    // If zooming out, show success
    if (wasZoomed && !willBeZoomed) {
        // showZoomAlert(' Zoom disabled, Navigate normally now');
    }
    
    // Call original function
    originalApplyZoom.call(this, zoomLevel);
};

// ✅ STEP 14: PREVENT DIRECT FLIPBOOK CLICKS WHEN ZOOMED
if (flipbookContainer) {
    flipbookContainer.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }, true);
    // console.log(' Flipbook click protection added');
}

// ✅ STEP 15: PREVENT UI-ARROW CONTROLS WHEN ZOOMED
document.querySelectorAll('.ui-arrow-control').forEach(arrow => {
    arrow.addEventListener('click', function(e) {
        if (isZoomed) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showZoomAlert(' Page flip blocked, Zoom out to navigate');
            return false;
        }
    }, true);
});
// console.log('✅ UI arrow controls protection added');

// ✅ STEP 16: DISABLE MOUSE/TOUCHPAD SCROLL WHEN ZOOMED
document.addEventListener('mousewheel', function(e) {
    // Allow zoom with Ctrl
    if (e.ctrlKey || e.metaKey) {
        return; // Zoom is allowed
    }
    // Block normal scroll when zoomed
    if (isZoomed && !e.ctrlKey && !e.metaKey) {
        // Allow scrollbar scroll but block normal page scroll
    }
}, { passive: false });


// *************************************Zoom in zoom out code end************************************ */



// *************************************autoplay flipbook code start************************************ */

// ==================== AUTO PLAY WITH CONTINUOUS SMOOTH TIMELINE ====================
const autoPlayBtn = document.getElementById('autoPlayBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const autoPlayProgressFill = document.getElementById('autoPlayProgressFill');
const autoPlayThumb = document.getElementById('autoPlayThumb');
const progressContainer = document.querySelector('.autoplay-progress-container');

let isAutoPlaying = false;
let animationFrameId = null;
let currentProgress = 0;
const pageWaitTime = 2000;
let totalPages = 0;
let startTime = 0;
let elapsedTime = 0;
let pausedTime = 0;
let isDragging = false;

// Initialize
$(document).ready(function() {
    totalPages = $('#flipbook').turn ? $('#flipbook').turn('pages') : 12;
    const currentPage = $('#flipbook').turn('page') || 1;
    currentProgress = getProgressFromPage(currentPage);
    updateProgressBar(currentProgress);
    pausedTime = (currentProgress / 100) * getDuration();
    elapsedTime = pausedTime;
});

function getDuration() {
    const effectivePages = totalPages > 1 ? totalPages - 1 : 1;
    return effectivePages * pageWaitTime;
}

function getProgressFromPage(page) {
    if (totalPages <= 1) return 100;
    return ((page - 1) / (totalPages - 1)) * 100;
}

function updateProgressBar(percentage) {
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
    autoPlayProgressFill.style.width = `${clampedPercentage}%`;
    autoPlayThumb.style.left = `${clampedPercentage}%`;
}

// ✅ FIXED: Recursive requestAnimationFrame
function animateProgress() {
    if (!isAutoPlaying) return; // Stop if not playing
    
    const currentTime = Date.now();
    elapsedTime = pausedTime + (currentTime - startTime);
    const totalDuration = getDuration();

    currentProgress = (elapsedTime / totalDuration) * 100;
    if (currentProgress > 100) currentProgress = 100;

    updateProgressBar(currentProgress);
    
    const targetPage = Math.min(Math.floor(elapsedTime / pageWaitTime) + 1, totalPages);
    const currentPage = $('#flipbook').turn('page');
    
    if (targetPage !== currentPage && targetPage <= totalPages) {
        $('#flipbook').turn('page', targetPage);
    }
    
    if (currentProgress >= 100) {
        if ($('#flipbook').turn('page') !== totalPages) {
             $('#flipbook').turn('page', totalPages);
        }
        stopAutoPlay();
        updateProgressBar(100);
        return; // Exit loop
    }
    
    // ✅ Continue animation - this is the key recursive call
    animationFrameId = requestAnimationFrame(animateProgress);
}

function startAutoPlay() {
    if (currentProgress >= 100) {
        $('#flipbook').turn('page', 1);
        currentProgress = 0;
        elapsedTime = 0;
        pausedTime = 0;
    }

    isAutoPlaying = true;
    autoPlayBtn.classList.add('playing');
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    
    startTime = Date.now();
    
    // ✅ Start the animation loop
    animationFrameId = requestAnimationFrame(animateProgress);
}

function stopAutoPlay() {
    isAutoPlaying = false;
    autoPlayBtn.classList.remove('playing');
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
        
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    pausedTime = elapsedTime;
}

// Toggle auto play
autoPlayBtn.addEventListener('click', function() {
    if (isAutoPlaying) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
});

// ✅ DRAGGABLE THUMB FUNCTIONALITY
let startDragX = 0;

autoPlayThumb.addEventListener('mousedown', function(e) {
    isDragging = true;
    startDragX = e.clientX;
    if (isAutoPlaying) stopAutoPlay();
    e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    const containerRect = progressContainer.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left;
    const percentage = (offsetX / containerRect.width) * 100;
    
    currentProgress = Math.min(Math.max(percentage, 0), 100);
    updateProgressBar(currentProgress);
    
    const targetPage = Math.max(1, Math.min(Math.ceil((currentProgress / 100) * totalPages), totalPages));
    
    if ($('#flipbook').turn && $('#flipbook').turn('page') !== targetPage) {
        $('#flipbook').turn('page', targetPage);
    }
});

document.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        pausedTime = (currentProgress / 100) * getDuration();
        elapsedTime = pausedTime;
    }
});

// Click on progress bar to jump
progressContainer.addEventListener('click', function(e) {
    if (isDragging) return;
    
    const rect = this.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    
    currentProgress = Math.min(Math.max(percentage, 0), 100);
    updateProgressBar(currentProgress);
    
    const targetPage = Math.max(1, Math.min(Math.ceil((currentProgress / 100) * totalPages), totalPages));
    if ($('#flipbook').turn) {
        $('#flipbook').turn('page', targetPage);
    }
    
    pausedTime = (currentProgress / 100) * getDuration();
    elapsedTime = pausedTime;
    
    if (isAutoPlaying) {
        stopAutoPlay();
    }
});

// Update on page turn
$('#flipbook').bind('turned', function(event, page) {
    const totalPagesCount = $('#flipbook').turn('pages');
    const pageNoElement = document.getElementById('page-no');
    
    if (pageNoElement) {
        if (page === 1) {
            pageNoElement.textContent = `1 / ${totalPagesCount}`;
        } else if (page === totalPagesCount) {
            pageNoElement.textContent = `${totalPagesCount} / ${totalPagesCount}`;
        } else if (page % 2 === 0) {
            pageNoElement.textContent = `${page}-${page + 1} / ${totalPagesCount}`;
        } else {
            pageNoElement.textContent = `${page - 1}-${page} / ${totalPagesCount}`;
        }
    }
    
    if(typeof updateActiveThumbnail === 'function') {
        updateActiveThumbnail(page);
    }
    
    if (!isAutoPlaying && !isDragging) {
        const idealPageProgress = getProgressFromPage(page);
        const diff = Math.abs(currentProgress - idealPageProgress);
        
        if (diff > (100 / totalPages) / 2) {
            currentProgress = idealPageProgress;
            updateProgressBar(currentProgress);
            pausedTime = (currentProgress / 100) * getDuration();
            elapsedTime = pausedTime;
        }
    }
});

// */*************************************autoplay flipbook code end************************************ */


// ***********************************download code start******************************************

const downloadBtn = document.getElementById("download-btn");
const downloadPopup = document.getElementById("downloadPopup");

downloadBtn.addEventListener("click", () => {

    // 1. Show notification popup
    downloadPopup.classList.remove("hidden");
    setTimeout(() => {
        downloadPopup.classList.add("opacity-100");
    }, 10);

    // 2. Auto-hide popup after 2 seconds
    setTimeout(() => {
        downloadPopup.classList.remove("opacity-100");
        setTimeout(() => downloadPopup.classList.add("hidden"), 300);
    }, 2000);

    // 3. Trigger PDF download
    const link = document.createElement("a");
    link.href = "../global-assets/Airlock-IDC.pdf";   // <<-- put your PDF file path
    link.download = "Airlock-IDC.pdf";                 // <<-- filename user will download
    document.body.appendChild(link);
    link.click();
    link.remove();
})
// ***********************************download code end******************************************


const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

// ---- Arrow Click Navigation (Front / Last) ----
leftArrow.addEventListener("click", () => {
    $("#flipbook").turn("page", 1);       // ⬅ Jump to FIRST PAGE
});

rightArrow.addEventListener("click", () => {
    const totalPages = $("#flipbook").turn("pages");
    $("#flipbook").turn("page", totalPages);   // ⬅ Jump to LAST PAGE
});


// ---- Show / Hide Arrows Based on Page ----
function updateArrows(page) {

    // ❌ If autoplay is running → always hide arrows
    if (isAutoPlaying) {
        leftArrow.classList.add("hidden");
        rightArrow.classList.add("hidden");
        return; 
    }else{
         leftArrow.classList.remove("hidden");
        rightArrow.classList.remove("hidden");
    }

    // ✅ Autoplay OFF → normal behavior
    const totalPages = $("#flipbook").turn("pages");

    if (page === 1) {
        leftArrow.classList.add("hidden");
        rightArrow.classList.remove("hidden");
    }
    else if (page === totalPages) {
        leftArrow.classList.remove("hidden");
        rightArrow.classList.add("hidden");
    }
    else {
        leftArrow.classList.remove("hidden");
        rightArrow.classList.remove("hidden");
    }
}

$('#flipbook').bind('turned', function (event, page, view) {

    // ---- Page counter ----
    const totalPagesCount = $('#flipbook').turn('pages');
    const pageNoElement = document.getElementById('page-no');
    const mobPageNo = document.getElementById('mob-page-no');

    if (pageNoElement) {
        if (page === 1) {
            pageNoElement.textContent = `1 / ${totalPagesCount}`;
        } else if (page === totalPagesCount) {
            pageNoElement.textContent = `${totalPagesCount} / ${totalPagesCount}`;
        } else if (page % 2 === 0) {
            pageNoElement.textContent = `${page}-${page + 1} / ${totalPagesCount}`;
        } else {
            pageNoElement.textContent = `${page - 1}-${page} / ${totalPagesCount}`;
        }
    }

    // ---- Mobile page number ----
    if (mobPageNo) mobPageNo.textContent = page;

    // ---- Thumbnail active state ----
    updateActiveThumbnail(page);

    // ---- Mobile TOC active highlight ----
    document.querySelectorAll('.mob-tb-link').forEach(function (li) {
        li.classList.toggle('mob-active', parseInt(li.dataset.page) === page);
    });

    // ---- Arrows ----
    updateArrows(page);

    // ---- Autoplay progress sync ----
    if (!isAutoPlaying && !isDragging) {
        const idealPageProgress = getProgressFromPage(page);
        const diff = Math.abs(currentProgress - idealPageProgress);
        if (diff > (100 / totalPagesCount) / 2) {
            currentProgress = idealPageProgress;
            updateProgressBar(currentProgress);
            pausedTime = (currentProgress / 100) * getDuration();
            elapsedTime = pausedTime;
        }
    }
});



function refreshArrows() {
    if (isAutoPlaying) {
        leftArrow.classList.add("hidden");
        rightArrow.classList.add("hidden");
        return;
    }

    const page = $('#flipbook').turn('page');
    const totalPages = $('#flipbook').turn('pages');

    // Normal arrow rules when NOT autoplaying
    if (page === 1) {
        leftArrow.classList.add("hidden");
        rightArrow.classList.remove("hidden");
    } 
    else if (page === totalPages) {
        leftArrow.classList.remove("hidden");
        rightArrow.classList.add("hidden");
    } 
    else {
        leftArrow.classList.remove("hidden");
        rightArrow.classList.remove("hidden");
    }
}





