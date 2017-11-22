;(function () {

    function InitException(message) {
        this.message = message;
        this.name = "Initial Exception";
    }

    var serverUrl = 'http://udct-pam-gallery.bitstorage.ru/test';
    var randomVersion = Math.random().toString().slice(5,10);
    var cssUrl = 'http://udct-pam-gallery.bitstorage.ru/assets/widget/css/widget.css?v='+ randomVersion;


    // App will check that Users App is valid and load form inside
    var App = (function () {


        var messages = {
            errorNoCanvas: 'please ensure you have table with id attr equals "pixel_canvas"',
            errorCells: 'Grid table is clean!',
            errorToLarge: 'Grid table is to large, max is 100 pixel side! sorry :('
        };

        var quizes = [
            function () {
                if (document.querySelector('table#pixel_canvas') !== null) {
                    return true;
                }
                throw new InitException(messages.errorNoCanvas);
            }
        ];

        var checkApplication = function () {
            return quizes.every(function (fn) {
                return fn();
            });
        };

        var init = function () {
            try {
                checkApplication();
                loadCss();
                window['Widget'] = Widget;
                Widget.init();
            } catch (e) {
                console.log(e.message);
            }
        };

        var send = function(data, fn) {
            var xhr = new XMLHttpRequest();

            xhr.open("POST", serverUrl);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));

            xhr.onreadystatechange = function() { // (3)
                if (xhr.readyState != 4) return;
                fn(xhr.responseText);
            }
        };

        var parse = function () {
            try {
                var imageData = getRGBAarray();
                send(imageData, function(response){
                    Widget.show(JSON.parse(response));
                });

            } catch (e) {
                console.log(e.message);
            }

        };

        var getRGBAarray = function () {
            var grid = document.querySelector('#pixel_canvas');
            if (grid.childNodes.length === 0) {
                throw new InitException(messages.errorNoCanvas);
            }
            var gridHeight = grid.childNodes.length;
            var gridWidth = grid.childNodes[0].childNodes.length;

            if( gridHeight > 100 || gridWidth > 100 )
                throw new InitException(messages.errorToLarge);

            var output = [];
            for (var r = 0; r < gridHeight; r++) {
                var row = [];
                for (var c = 0; c < gridWidth; c++) {
                    var cell = grid.childNodes[r].childNodes[c];
                    row.push(extractColors(cell.style.backgroundColor || 'rgb(255, 255, 255)'));
                }
                output.push(row);
            }
            return output;
        };

        var extractColors = function (string) {

            var arr = string.replace(/[^\d,.]/g, '').split(',');
            if (arr.length === 3 ) {
                result = arr.map((n)=> parseInt(n));
                result.push(255);
            } else {
                result =  arr.map((n)=> parseInt(n) || parseFloat(n) * 100)
            }
            return result;
        };

        var loadCss = function() {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', cssUrl);
            document.getElementsByTagName('body')[0].appendChild(link);
        };
        return {
            init: () => init(),
            parse: () => parse()
        };


    })();


    var Widget = {
        init: function () {
            var wrapper = document.createElement('div');
            this.iframe = document.createElement('iframe');
            this.modal = wrapper.cloneNode();
            var dialog = wrapper.cloneNode();
            this.modal.className = "modal";
            wrapper.className = 'wrapper';
            dialog.className = 'dialog';
            this.modal.appendChild(dialog);
            wrapper.appendChild(this.iframe);
            this.iframe.setAttribute('frameborder', 0);
            this.iframe.setAttribute('src', 'http://udct-pam-gallery.bitstorage.ru/widget');
            var rootNode =  document.getElementsByTagName('body')[0];
            rootNode.appendChild(this.modal);
            rootNode.appendChild(wrapper);
            this.iframe.onload = this.render;
        },

        render: function () {
            console.log(this);
        },
        popup: {
            show: () =>{
                Widget.modal.classList.add('in');
            },
            hide: () =>  {
                Widget.modal.classList.remove('in');
            }
        },
        send: function () {
            App.parse();
        },
        show: function(data) {
            var image = new Image();
            self = this;
            image.className = 'image';
            image.src = data.url;
            this.modal.childNodes[0].appendChild(image);
            image.onload = function(){
                Widget.popup.show();
            };
        }
    };


    var ready = function (fn) {
        if (document.readyState === 'complete') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn, false);
        }
    };

    ready(function () {
        App.init();
    });

})
();