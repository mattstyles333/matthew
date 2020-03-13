$(document).ready(function() {
    // MODAL
    var modalText = {
        mf: {
            title: 'Moitif',
            tag: 'Home Furniture Webstore.',
            detail: 'A home furniture webstore built with Xcart that specializes in modern designs and styles.',
            link: 'https://moitif.ie/'
        },
        sot: {
            title: 'Radius Office Sales Order Tracker',
            tag: 'Internal order processing system',
            detail: 'The SOT consolidates all of our ecommerce sales orders and purchase orders.',
            link: 'https://sot.radiusoffice.com/'
        },
        ro: {
            title: 'Radius Office',
            tag: 'Office Supply Webstore.',
            detail: 'Radius Office is an ecommerce store that specializes in office supplies, and it\'s built/runs on Evolution X.',
            link: 'https://radiusoffice.ie'
        },
        rof: {
            title: 'Radius Office Furniture',
            tag: 'Office Furniture Webstore.',
            detail: 'Radius Office Furniture is an ecommerce store that specializes in office furniture, and it\'s built/runs on Evolution X (it used to run on Wordpress).',
            link: 'https://radiusofficefurniture.ie'
        },
        ofsted: {
            title: 'Ofsted Childminder Registration',
            tag: 'Official Childminder & Nanny registration system for the UK',
            detail: 'An end to end, django webapp that lets you register to become a childminder, and manages the application review process.',
            link: 'https://www.gov.uk/become-childminder-nanny/register-childminder'
        },
        s4l: {
            title: 'Spex4Less',
            tag: 'One of the largerst independent online glasses retailers',
            detail: 'A big Magento ecommerce store that specializes in selling glasses at low prices with exceptional customer service.',
            link: 'https://www.spex4less.com'
        }
    };

    $('#gallery .button').on('click', function() {
        fillModal(this.id);
        $('.modal-wrap').addClass('visible');
    });

    $('.close').on('click', function() {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    $('.mask').on('click', function() {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    var carousel = $('#carousel'),
        slideWidth = 700,
        threshold = slideWidth / 3,
        dragStart,
        dragEnd;

    setDimensions();

    $('#next').click(function() {
        shiftSlide(-1);
    });
    $('#prev').click(function() {
        shiftSlide(1);
    });

    carousel.on('mousedown', function() {
        if (carousel.hasClass('transition')) return;
        dragStart = event.pageX;
        $(this).on('mousemove', function() {
            dragEnd = event.pageX;
            $(this).css('transform', 'translateX(' + dragPos() + 'px)');
        });
        $(document).on('mouseup', function() {
            if (dragPos() > threshold) {
                return shiftSlide(1);
            }
            if (dragPos() < -threshold) {
                return shiftSlide(-1);
            }
            shiftSlide(0);
        });
    });

    function setDimensions() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            slideWidth = $(window).innerWidth();
        }
        $('.carousel-wrap, .slide').css('width', slideWidth);
        $('.modal').css('max-width', slideWidth);
        $('#carousel').css('left', slideWidth * -1);
    }

    function dragPos() {
        return dragEnd - dragStart;
    }

    function shiftSlide(direction) {
        if (carousel.hasClass('transition')) return;
        dragEnd = dragStart;
        $(document).off('mouseup');
        carousel
            .off('mousemove')
            .addClass('transition')
            .css('transform', 'translateX(' + direction * slideWidth + 'px)');
        setTimeout(function() {
            if (direction === 1) {
                $('.slide:first').before($('.slide:last'));
            } else if (direction === -1) {
                $('.slide:last').after($('.slide:first'));
            }
            carousel.removeClass('transition');
            carousel.css('transform', 'translateX(0px)');
        }, 700);
    }

    function fillModal(id) {
        $('#modal .title').text(modalText[id].title);
        $('#modal .detail').text(modalText[id].detail);
        $('#modal .tag').text(modalText[id].tag);
        if (modalText[id].link)
            $('#modal .button')
            .addClass('visible')
            .parent()
            .attr('href', modalText[id].link);

        $.each($('#modal li'), function(index, value) {
            $(this).text(modalText[id].bullets[index]);
        });
        $.each($('#modal .slide'), function(index, value) {
            $(this).css({
                background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
                backgroundSize: 'cover'
            });
        });
    }
});