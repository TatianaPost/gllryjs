(function(){
    function Gllry(id, options){
        var self = this;

        this.current = 0;
        this.next = 1;
        this.max = void 0;
        this.options = options;
        this.gllry = document.getElementById(id);
        this.gllry.classList.add('gllry');
        this.breadcrumbs = void 0;

        this.items = this.gllry.querySelectorAll('li');
        this.images = this.gllry.querySelectorAll('img');
        this.max = this.items.length;

        if(options.breadcrumbs){
            this.breadcrumbs = document.createElement('ul');
            this.breadcrumbs.classList.add('breadcrumbs');
            for(var i=0; i<this.images.length; i++){
                var li = document.createElement('li');
                li.setAttribute('data-index', i);
                this.breadcrumbs.appendChild(li);
            }

            this.gllry.appendChild(this.breadcrumbs);

            this.breadcrumbs.addEventListener('click', function(e){
                var index = e.target.getAttribute('data-index');

                if(index !== void 0 && index !== null){
                    self.go(index);
                }
            });
        }

        this.setCurrent();

        if(options.autoPlay){
            this.autoPlay();
        }
    }

    Gllry.prototype.go = function(current){
        var dir = -1;
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

        this.next = this.current + dir;
        if(this.next === this.max){
            this.next = 0;
        }

        if(this.next < 0){
            this.next = this.max - 1;
        }

        this.setCurrent();
    }

    Gllry.prototype.goNext = function(){
        this.current++;
        if(this.current === this.max){
            this.current = 0;
        }

        this.next++;
        if(this.next === this.max){
            this.next = 0;
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

        this.next--;
        if(this.next < 0){
            this.next = this.max-1;
        }

        if(this.options.animate){
            this.animate();
        }
        else{
            this.setCurrent();
        }
    };

    Gllry.prototype.setCurrent = function(){
        if(this.gllry.querySelector('.current')){ this.gllry.querySelector('.current').classList.remove('current');}
        if(this.gllry.querySelector('.next')){ this.gllry.querySelector('.next').classList.remove('next');}
        if(this.breadcrumbs.querySelector('.current')) this.breadcrumbs.querySelector('.current').classList.remove('current');

        if(this.items[this.current]){
            this.items[this.current].classList.add('current');
        }

        if(this.items[this.next]){
            this.items[this.next].classList.add('next');
        }

        this.breadcrumbs.children[this.current].classList.add('current');
    }

    Gllry.prototype.autoPlay = function(){
        var self = this;
        setInterval(function(){

        }, this.options.autoPlay);
    };

    window.Gllry = Gllry;
}());