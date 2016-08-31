/////// Slider Gallery 

    var pageId = $('.page').attr('page-id');
    

    if (pageId !== undefined) {

        $(document).ready(function() {

            images = [ 
                ['/images/g-st/ST-1.jpg','/images/g-st/ST-1a.jpg', '/images/g-st/ST-1b.jpg',
                '/images/g-st/ST-2.jpg', '/images/g-st/ST-3.jpg', '/images/g-st/ST-4.jpg', ],

                ['/images/g-crm/CRM-2.jpg', '/images/g-crm/CRM-2n.jpg', '/images/g-crm/CRM-3.jpg',
                '/images/g-crm/CRM-3a.jpg', '/images/g-crm/CRM-3b.jpg', '/images/g-crm/CRM-3c.jpg'],

                ['/images/g-chat/Chat-1.jpg', '/images/g-chat/Chat-2.jpg', '/images/g-chat/Chat-3.jpg', 
                '/images/g-chat/Chat-4.jpg'],

                ['/images/g-getcall/GC-0.jpg', '/images/g-getcall/GC-1.jpg', '/images/g-getcall/GC-2.jpg', '/images/g-getcall/GC-3.jpg'],

                ['/images/chrome-bg-0.png', '/images/chrome-bg-1.png', '/images/chrome-bg-2.png', '/images/chrome-bg-3.png', '/images/chrome-bg-4.png']
            ];

            var pageId = $('.page').attr('page-id');
            var currentGallery = images[pageId]
            var currentGalleryId = pageId
            var timeout;

            loadImages();

            function loadImages() {
                //alert(images[0][0]);

                console.log(pageId + ' asdfg');

                var newImage = [];
                var imagesToLoad = 0;

                clearInterval(Timer);
                clearTimeout(timeout);
  
                $('.img-wrapper').empty();   
                
                $('.preloader').addClass('active');

                $.each(currentGallery, function(i, val) {
                   
                    //console.log(currentGalleryId + ' this is currentGalleryId');

                    $('.img-wrapper').append($('<img>', {
                        src:          val,
                        class:        'interface ', //'interface '+currentGalleryId+'',
                        'image-id':   i,
                        'gallery-id': currentGalleryId
                    }));

                    var imgOne = new Image();
                    imgOne.src = currentGallery[0];
                    //console.log(currentGallery[0]); 

                    imgOne.onload = function() {
                        addFirstActive();
                        $('.preloader').removeClass('active');
                    };
                });

                icount = 1;
                bcount = 1;
                ccount = 1; 

                timeout = setTimeout(function() {
                     console.log('!!! timeout called')
                     Timer = setInterval(Cycle, 9 * 1000);
                }, 8 * 1000);
            }

            addFirstActive = function() {
                var interfaceImgs = $('.interface:nth-child(1)');  
                interfaceImgs.addClass('active');
            }

            function createButtons() { 
                $.each(currentGallery, function(i) {
                    $('.slidernav').append($('<li>', {
                        //src: currentGallery[i],
                        class: 'button-g',
                        'image-id': i
                    }));
                });
            }
            
            createButtons();

            $('.button-g:first-child').addClass('active');
            
            function fireActiveGallery() {
                $('.service-kind').removeClass('active');

                $('.service-kind[gallery-id= "'+currentGalleryId+'" ').addClass('active');
            }

            fireActiveGallery();

            icount = 0;
            bcount = 0;
            ccount = 0;  

            //var Timer;
            //Cycle();

            var Timer = setInterval(Cycle, 9 * 1000);

            function Cycle() {  
                console.log('function called again');

                $('.button-g').one('click', function() {
                    currentImg = $(this).attr('image-id');
                    i = parseInt(currentImg, 10);
                    icount = i + 1;
                    bcount = i + 1;
                    ccount = i + 1;
                }); 

                if (icount === currentGallery.length) { icount = 0; }  
                if (bcount === currentGallery.length) { bcount = 0; }
                if (ccount === currentGallery.length) { ccount = 0; }
                    
                var interfaceImgs = $('.interface[gallery-id="'+currentGalleryId+'"]');  
                interfaceImgs.removeClass('active').eq(ccount++).addClass('active');
                                
                var buttons = $('.button-g');
                buttons.removeClass('active').eq(bcount++).addClass('active');

            }

            $(document).on('click', '.service-kind', function(e) {
                e.preventDefault();

                currentGalleryId = $(this).attr('gallery-id');
                currentGallery = images[currentGalleryId];

                fireActiveGallery();

                $('.slidernav').empty();
                
                createButtons();
                
                $('.button-g:first-child').addClass('active');

                currentImg = 0;
                icount = 0;
                bcount = 0;
                ccount = 0;

                clearInterval(Timer);
                clearTimeout(timeout);
                
                loadImages();
            });
            
            $(document).on('click', '.button-g', function(e){
                e.preventDefault();
                            
                currentImg = $(this).attr('image-id');
                //currentImg = $(this).eq(i);
                              
                changeImages();

            }); 

            $(document).on('click', '.navigate', function(t) {
                t.preventDefault();

                currentImg = $('.interface.active').attr('image-id');
                
                console.log($(this).attr('class'));
                
                // function getImage(arg) {
                //     console.log(arg + ' hi Image');
                //     return arg;
                // } 

                if ( $(this).attr('class') == 'navigate next' ) { 
                    for ( var i = 0; i < currentGallery.length; i++ ) {
                        nextImage = parseInt(currentImg, 10) + 1;
                        //getImage(nextImage);
                    }
                }

                else {                    
                    function backFunc() { 
                        currentImgIfBack = parseInt(currentImg, 10);
                        //console.log(currentImgIfBack + ' back func called');    
                        
                        if (currentImgIfBack >= 1) {
                            x = parseInt(currentImg, 10)
                            nextImage = x - 1;  
                            
                            return nextImage;
                            //getImage(nextImage);
                        }
                        else if (currentImgIfBack < 1) {
                            x = currentGallery.length; 
                            nextImage = x - 1;
                            
                            //getImage(nextImage);
                            return nextImage;
                        }
                    }
                    backFunc();  
                }
                
                currentImg = nextImage;
                console.log(currentImg + ' here we are');

                icount = currentImg + 1;
                bcount = currentImg + 1;
                ccount = currentImg + 1;
                
                changeImages();

            });

            function changeImages() {
                if ( currentImg === currentGallery.length ) {
                    currentImg = 0;
                }

                $(".interface").css('z-index', '1');
                $('.interface[image-id="'+currentImg+'"]').addClass('active').css('z-index', '10');
                $('.interface[image-id!="'+currentImg+'"]').removeClass('active');

                $('.button-g').removeClass('active');
                $('.button-g[image-id="'+currentImg+'"]').addClass('active');//.fadeTo(400,1);

                clearInterval(Timer);
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                     console.log('!!! timeout called')
                     Timer = setInterval(Cycle, 9 * 1000);
                }, 8 * 1000);
            }

        });
    }


    // var imgNum = $('li.button-g').map(function() {
    //     return $(this).attr('data-n');
    // }).get();

    // for ( var i = 0; i < imgNum.length; i++) {
    //     imgSrc.push(fileNames + i + '.png');
    // }  

    // $('.button').each(function (e) {
    //     $(this).attr('whatever', e);
    // });    


    // -------------
