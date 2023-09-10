class Controls{
    constructor(){
        this.forward= false;
        this.reverse= false;
        this.left = false;
        this.right = false;
// "#" is used because the method is private
        this.#addKeyboardListeners();
    }
    #addKeyboardListeners(){
        // used the arrow function instead of function(event){}
        // since "this" keyword had to point to the constructor
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            // view the controls in the console
            //console.table(this);
        }  

        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            //console.table(this);    
        }  
    }
}