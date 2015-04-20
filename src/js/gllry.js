(function(){
    var DEFAULT_TEXT = 'Close';

    function Gllry(id, options){
        var self = this;

        this.touchstart = 'ontouchstart' in window ? 'touchstart' : 'click';
        this.touchend = 'ontouchend' in window ? 'touchend' : 'click';
        this.current = 0;
        this.next = 1;
        this.max = void 0;
        this.options = options;
        this.gllry = document.getElementById(id);
        this.gllry.classList.add('gllry');
        this.breadcrumbs = void 0;

        this.items = this.gllry.querySelectorAll('li');
        this.images = this.gllry.querySelectorAll('img');
        this.gllry.querySelector('ul').classList.add('size');

        this.max = this.items.length;

        if(options.fullscreen){
            this.gllry.classList.add('fullscreen');
        }

        if(options.breadcrumbs){
            this.setBreadcrumbs();
        }

        if(options.headings){
            this.setHeading();
        }

        this.setCurrent();

        if(options.autoPlay){
            this.autoPlay();
        }

        if(options.action){
            this.setAction();
        }

        var touchstartPos = null;
        this.gllry.addEventListener(this.touchstart, function(e){
            touchstartPos = e.touches[0].clientX;
        });

        this.gllry.addEventListener(this.touchend, function(e){
            if(e.changedTouches[0].clientX <= touchstartPos){
                self.goNext();
            }
            else{
                self.goPrev();
            }
        });
    }

    Gllry.prototype.go = function(current){
        var dir = -1;
        current = parseInt(current);

        if(current > this.current){
            dir = +1;
        }

        this.current = current;
        if(this.current === this.max){
            this.current = 0;
        }

        if(this.current < 0){
            this.current = this.max-1;
        }

        this.next = this.current + 1;
        if(this.next === this.max){
            this.next = 0;
        }

        this.setCurrent();
    }

    Gllry.prototype.goNext = function(){
        this.current++;
        if(this.current === this.max){
            this.current = 0;
        }

        this.next = this.current;
        if(this.next === this.max){
            this.next = 0;
        }

        if(this.gllry.querySelector('.next')){ this.gllry.querySelector('.next').classList.remove('next');}
        if(this.items[this.next]){
            this.items[this.next].classList.add('next');
        }

        if(this.options.animate){
            this.animate();
        }
        else{
            this.setCurrent();
        }
    };

    Gllry.prototype.goPrev = function(){
        this.current--;
        if(this.current < 0){
            this.current = this.max-1;
        }

        this.next = this.current;
        if(this.next < 0){
            this.next = this.max-1;
        }

        if(this.gllry.querySelector('.next')){ this.gllry.querySelector('.next').classList.remove('next');}
        if(this.items[this.next]){
            this.items[this.next].classList.add('next');
        }

        if(this.options.animate){
            this.animate();
        }
        else{
            this.setCurrent();
        }
    };

    Gllry.prototype.setBreadcrumbs = function(){
        var self = this;

        this.breadcrumbs = document.createElement('ul');
        this.breadcrumbs.classList.add('breadcrumbs');
        this.breadcrumbs.classList.add(this.options.breadcrumbs.position);
        for(var i=0; i<this.images.length; i++){
            var li = document.createElement('li');
            li.setAttribute('data-index', i);
            this.breadcrumbs.appendChild(li);
        }

        this.gllry.appendChild(this.breadcrumbs);

        this.breadcrumbs.addEventListener('click', function(e){
            var index = e.target.getAttribute('data-index');

            if(index !== void 0 && index !== null){
                //self.go(index);
            }
        });
    };

    Gllry.prototype.setHeading = function(){
        this.heading = document.createElement('span');
        this.heading.classList.add('heading');

        this.gllry.appendChild(this.heading);
    };

    Gllry.prototype.animate = function(){
        var self = this;
        var currentItem = this.gllry.querySelector('.current');
        if(currentItem){
            currentItem.addEventListener('webkittransitionend', function fn(){
                self.setCurrent();
                currentItem.classList.remove('fade');
                currentItem.removeEventListener('webkittransitionend', fn);
            });

            currentItem.addEventListener('transitionend', function fn(){
                self.setCurrent();
                currentItem.classList.remove('fade');
                currentItem.removeEventListener('transitionend', fn);
            });
            currentItem.classList.add('fade');
        }
    };

    Gllry.prototype.setCurrent = function(){
        var self = this;

        if(this.gllry.querySelector('.current')){ this.gllry.querySelector('.current').classList.remove('current');}
        if(this.gllry.querySelector('.next')){ this.gllry.querySelector('.next').classList.remove('next');}
        if(this.breadcrumbs.querySelector('.current')) this.breadcrumbs.querySelector('.current').classList.remove('current');
        if(this.actionButton) this.actionButton.classList.remove('show');

        if(this.items[this.current]){
            this.items[this.current].classList.add('current');
        }

        if(this.items[this.next]){
            this.items[this.next].classList.add('next');
        }

        this.breadcrumbs.children[this.current].classList.add('current');

        if(this.heading){
            this.heading.innerHTML = this.items[this.current].querySelector('img').getAttribute('alt');
        }

        if(this.options.action){
            setTimeout(function(){
                self.actionButton.classList.add('show');
            }, this.options.action.timeout || 0);
        }

        if(this.options.autoPlay){
            this.autoPlay();
        }
    };

    Gllry.prototype.setAction = function(){
        this.actionButton = document.createElement('button');

        this.actionButton.innerHTML = this.options.action.text || DEFAULT_TEXT;
        this.actionButton.addEventListener('click', this.options.action.callback);
        this.actionButton.classList.add('action');

        if(this.options.action.position){
            this.actionButton.classList.add(this.options.action.position);
        }

        this.gllry.appendChild(this.actionButton);
    };

    Gllry.prototype.autoPlay = function(){
        var self = this;
        clearTimeout(this.interval);
        this.interval = null;

        this.interval = setTimeout(function(){
            self.goNext();
        }, this.options.autoPlay);
    };

    Gllry.prototype.hide = function(){
        this.gllry.classList.add('hidden');
    };

    Gllry.prototype.show = function(){
        this.gllry.classList.remove('hidden');
    };

    window.Gllry = Gllry;
}());